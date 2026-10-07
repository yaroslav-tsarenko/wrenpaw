import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ProductEntry } from "@/components/product/ProductEntry/ProductEntry";
import type { HomeProduct } from "./types";

export async function NewIn({ products }: { products: HomeProduct[] }) {
  const t = await getTranslations("home.newest");
  if (products.length < 4) return null;

  return (
    <section aria-labelledby="newest-title" className="bg-surface-1 px-gutter py-10 lg:py-14">
      <div className="mx-auto max-w-container">
        <div data-reveal="" className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
          <h2 id="newest-title" data-reveal-item="" className="ruled-label m-0 flex-1 font-sans text-ui-md font-semibold tracking-normal text-ink">
            <span className="index-numeral text-[1.5rem] leading-none">06</span>
            <span className="eyebrow">{t("label")}</span>
          </h2>
          <Link
            data-reveal-item=""
            style={{ "--i": 1 } as React.CSSProperties}
            href="/catalog?sort=newest"
            className="shrink-0 text-ui-sm font-semibold text-ink underline decoration-1 underline-offset-[5px] transition-[text-decoration-thickness] duration-[200ms] hover-device:hover:decoration-2 hover-device:hover:decoration-brand-2"
          >
            {t("link")}
          </Link>
        </div>
        <ul data-reveal="" className="m-0 mt-6 grid list-none gap-x-10 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {products.slice(0, 6).map((p, i) => (
            <li key={p.id} data-reveal-item="" style={{ "--i": i } as React.CSSProperties} className="border-t border-line">
              <ProductEntry product={p} density="row" headingLevel={3} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
