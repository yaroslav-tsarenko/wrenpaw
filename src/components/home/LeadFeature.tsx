import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ProductEntry, Stage } from "@/components/product/ProductEntry/ProductEntry";
import { productDisplay, productStandfirst } from "@/lib/product-name";
import type { HomeProduct } from "./types";

function specsFor(product: HomeProduct, labels: { category: string; availability: string; size: string; inStock: string; lowStock: string }) {
  const rows: { label: string; value: string }[] = [];
  const category = product.categories?.[0]?.category?.name;
  if (category) rows.push({ label: labels.category, value: category });
  if (product.quantity !== undefined) {
    rows.push({ label: labels.availability, value: product.quantity > 5 ? labels.inStock : labels.lowStock });
  }
  const { size } = productDisplay(product.name);
  if (size) rows.push({ label: labels.size, value: size });
  return rows;
}

export async function LeadFeature({ index, lead, runnersUp, ranked }: { index: string; lead: HomeProduct | null; runnersUp: HomeProduct[]; ranked: boolean }) {
  const t = await getTranslations("home.feature");
  if (!lead) return null;

  const specs = specsFor(lead, {
    category: t("specCategory"),
    availability: t("specAvailability"),
    size: t("specSize"),
    inStock: t("inStock"),
    lowStock: t("lowStock"),
  });

  return (
    <section aria-labelledby="feature-title" className="px-gutter pb-24 pt-16 lg:pb-24 lg:pt-28">
      <div className="mx-auto max-w-container">
        <p data-reveal="" className="ruled-label m-0 text-ink-subtle">
          <span data-reveal-item="" className="index-numeral text-[1.75rem] leading-none">
            {index}
          </span>
          <span data-reveal-item="" className="eyebrow">
            {ranked ? t("labelRanked") : t("label")}
          </span>
        </p>
      </div>

      <div data-reveal="" className="mx-auto mt-10 grid max-w-container items-start gap-x-12 gap-y-10 lg:mt-12 lg:grid-cols-12">
        <div data-reveal-item="" className="min-w-0 lg:col-span-6 lg:col-start-1">
          <div className="lg:ml-[calc(-1*max(var(--gutter),(100vw-var(--max-width))/2))]">
            <Stage
              src={lead.images?.[0]?.url}
              hoverSrc={lead.images?.[1]?.url}
              alt={lead.images?.[0]?.alt || lead.name}
              size="wide"
              sizes="(min-width: 1024px) 56vw, 100vw"
              hover="lift"
            />
          </div>
        </div>
        <div data-reveal-item="" style={{ "--i": 1 } as React.CSSProperties} className="min-w-0 lg:col-span-5 lg:col-start-8">
          <h2 id="feature-title" className="sr-only">
            {ranked ? t("titleRanked") : t("title")}
          </h2>
          <ProductEntry
            product={lead}
            density="lead"
            headingLevel={3}
            specLine={productStandfirst(lead.shortDescription) ?? undefined}
            specRows={specs}
            showPlate={false}
          />
        </div>
      </div>

      {runnersUp.length > 0 ? (
        <div className="mx-auto mt-16 max-w-container lg:mt-20">
          <div data-reveal="">
            <p data-reveal-item="" className="eyebrow m-0 text-ink-subtle">
              {t("alsoLabel")}
            </p>
            <ul className="m-0 mt-4 grid list-none gap-x-10 p-0 sm:grid-cols-2">
              {runnersUp.map((p, i) => (
                <li key={p.id} data-reveal-item="" style={{ "--i": i + 1 } as React.CSSProperties} className="border-t border-rule">
                  <ProductEntry product={p} density="row" headingLevel={3} />
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-8">
            <Link
              href="/catalog?sort=popular"
              className="text-ui-md font-semibold text-ink underline decoration-1 underline-offset-[6px] transition-[text-decoration-thickness] duration-[200ms] hover-device:hover:decoration-2 hover-device:hover:decoration-brand-2"
            >
              {t("all")}
            </Link>
          </p>
        </div>
      ) : null}
    </section>
  );
}
