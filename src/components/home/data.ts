import { prisma } from "@/lib/prisma";
import { isNewArrival, newArrivalCutoff } from "@/lib/new-arrivals";
import { FURNITURE_ZONES } from "@/config/navigation";
import {
  ORDER_RANKING_WINDOW_DAYS,
  featuredFirst,
  getFeaturedProducts,
  getNewProducts,
  getProductsByCategory,
  getSaleProducts,
  hasImage,
  isInStock,
  preferSubcategories,
  rankByOrders,
  subtreeSlugs,
  type HomepageCategory,
  type HomepageProduct,
} from "@/lib/homepage-products";
import type { AnimalBlock, HomeCategory, HomeData, HomeProduct, IndexEntry } from "./types";

const PREFER: Record<string, string[]> = {
  dogs: ["dog-beds", "dog-toys", "dog-bowls", "dog-clothing"],
  "dog-walking": ["harnesses", "leads", "collars", "id-tags"],
  cats: ["cat-trees", "cat-beds", "cat-toys", "cat-bowls"],
  "small-animals": ["small-cages", "small-habitat", "small-beds", "small-toys"],
  birds: ["bird-cages", "bird-feeders", "bird-food"],
  aquarium: ["aqua-equipment", "aqua-decor"],
  reptiles: ["rept-terrarium", "rept-climate"],
  travel: ["dog-carriers", "cat-carriers", "small-carriers"],
};

const MAJOR_SLOTS = 2;

const productSelect = {
  id: true,
  name: true,
  slug: true,
  sku: true,
  price: true,
  comparePrice: true,
  quantity: true,
  isFeatured: true,
  shortDescription: true,
  createdAt: true,
  images: { orderBy: { sortOrder: "asc" as const }, take: 2, select: { url: true, alt: true } },
  categories: { select: { category: { select: { name: true, slug: true } } } },
};

const EMPTY: HomeData = {
  totalProducts: 0,
  masthead: { lead: null, categories: [] },
  index: { major: [], minor: [] },
  feature: { ranked: false, lead: null, runnersUp: [] },
  reduced: [],
  animals: [],
  newest: [],
};

function serialize<T>(data: T): T {
  return JSON.parse(JSON.stringify(data));
}

async function unitsSoldRecently(): Promise<Map<string, number>> {
  const since = new Date(Date.now() - ORDER_RANKING_WINDOW_DAYS * 24 * 60 * 60 * 1000);
  const rows = await prisma.orderItem.groupBy({
    by: ["productId"],
    where: { order: { paymentStatus: "PAID", paidAt: { gte: since } } },
    _sum: { quantity: true },
  });
  return new Map(rows.map((r) => [r.productId, r._sum.quantity ?? 0]));
}

export async function getHomeData(): Promise<HomeData> {
  try {
    const [rawProducts, rawCategories, unitsSold, newSince] = await Promise.all([
      prisma.product.findMany({
        where: { status: "ACTIVE" },
        select: productSelect,
        orderBy: { createdAt: "desc" },
        take: 600,
      }),
      prisma.category.findMany({
        where: { isActive: true, parentId: null },
        orderBy: { sortOrder: "asc" },
        select: {
          id: true,
          name: true,
          slug: true,
          description: true,
          children: { where: { isActive: true }, orderBy: { sortOrder: "asc" }, select: { name: true, slug: true } },
        },
      }),
      unitsSoldRecently(),
      newArrivalCutoff(),
    ]);

    const counts = await Promise.all(
      rawCategories.map((c) =>
        prisma.product.count({
          where: { status: "ACTIVE", categories: { some: { category: { slug: { in: subtreeSlugs(c) } } } } },
        }),
      ),
    );
    const totalProducts = await prisma.product.count({ where: { status: "ACTIVE" } });

    const products = (serialize(rawProducts) as unknown as HomepageProduct[]).map((p) => ({ ...p, isNew: isNewArrival(p.createdAt, newSince) }));
    const categories = rawCategories.map((c, i) => ({ ...c, count: counts[i] }));
    const bySlug = new Map(categories.map((c) => [c.slug, c]));
    const toHomeCategory = (c: (typeof categories)[number]): HomeCategory => ({
      name: c.name,
      slug: c.slug,
      count: c.count,
      description: c.description,
    });

    const ready = featuredFirst(products.filter((p) => isInStock(p) && hasImage(p)));
    const claimed = new Set<string>();
    const unclaimed = () => ready.filter((p) => !claimed.has(p.id));
    const claim = <T extends HomeProduct>(picked: T[]) => {
      picked.forEach((p) => claimed.add(p.id));
      return picked;
    };
    const fromCategory = (slug: string, limit: number) => {
      const category = bySlug.get(slug);
      if (!category) return [];
      return claim(preferSubcategories(getProductsByCategory(unclaimed(), category as HomepageCategory), PREFER[slug] ?? []).slice(0, limit));
    };

    const mastheadLead = claim(fromCategory(FURNITURE_ZONES.lead[0], 1))[0] ?? claim(unclaimed().slice(0, 1))[0] ?? null;
    const mastheadCategories = FURNITURE_ZONES.index
      .map((slug) => bySlug.get(slug))
      .filter((c): c is (typeof categories)[number] => Boolean(c && c.count > 0))
      .map(toHomeCategory);

    const stocked = categories.filter((c) => c.count > 0).sort((a, b) => b.count - a.count);
    const toEntry = (c: (typeof categories)[number], plates: number): IndexEntry => ({
      ...toHomeCategory(c),
      products: plates > 0 ? fromCategory(c.slug, plates) : [],
      subcategories: c.children.slice(0, 4),
    });
    const major = stocked.slice(0, MAJOR_SLOTS).map((c) => toEntry(c, 3));
    const minor = stocked.slice(MAJOR_SLOTS).map((c) => toEntry(c, 0));

    const ranked = rankByOrders(unclaimed(), unitsSold, 3);
    const featured = getFeaturedProducts(unclaimed(), 3);
    const pool = ranked.length > 0 ? ranked : featured.length > 0 ? featured : unclaimed().slice(0, 3);
    const featureRow = claim(pool.slice(0, 3));
    const feature = {
      ranked: ranked.length > 0,
      lead: featureRow[0] ?? null,
      runnersUp: featureRow.slice(1),
    };

    const reduced = claim(getSaleProducts(unclaimed(), 4));

    const animals: AnimalBlock[] = FURNITURE_ZONES.animals
      .map((slug) => bySlug.get(slug))
      .filter((c): c is (typeof categories)[number] => Boolean(c && c.count > 0))
      .map((c) => ({
        ...toHomeCategory(c),
        product: fromCategory(c.slug, 1)[0] ?? null,
        subcategories: c.children.slice(0, 6),
      }));

    const newPool = getNewProducts(
      unclaimed().filter((p) => p.isNew),
      6,
    );
    const newest = claim(newPool.length >= 4 ? newPool : []);

    return {
      totalProducts,
      masthead: { lead: mastheadLead, categories: mastheadCategories },
      index: { major, minor },
      feature,
      reduced,
      animals,
      newest,
    };
  } catch (error) {
    console.error("Homepage data fetch error:", error);
    return EMPTY;
  }
}
