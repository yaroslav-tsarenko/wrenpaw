import type { HomepageProduct } from "@/lib/homepage-products";

export type HomeProduct = HomepageProduct;

export interface HomeCategory {
  name: string;
  slug: string;
  count: number;
  description?: string | null;
}

export interface IndexEntry extends HomeCategory {
  products: HomeProduct[];
  subcategories: { name: string; slug: string }[];
}

export interface AnimalBlock extends HomeCategory {
  product: HomeProduct | null;
  subcategories: { name: string; slug: string }[];
}

export interface HomeData {
  totalProducts: number;
  masthead: { lead: HomeProduct | null; categories: HomeCategory[] };
  index: { major: IndexEntry[]; minor: IndexEntry[] };
  feature: { ranked: boolean; lead: HomeProduct | null; runnersUp: HomeProduct[] };
  reduced: HomeProduct[];
  animals: AnimalBlock[];
  newest: HomeProduct[];
}
