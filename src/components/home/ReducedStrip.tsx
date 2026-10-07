import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Stage } from "@/components/product/ProductEntry/ProductEntry";
import { PriceDisplay, discountPercent } from "@/components/shared/PriceDisplay/PriceDisplay";
import { productDisplay } from "@/lib/product-name";
import type { HomeProduct } from "./types";

export async function ReducedStrip({ products }: { products: HomeProduct[] }) {
  const t = await getTranslations("home.reduced");
  if (products.length === 0) return null;

  return (
    <section aria-labelledby="reduced-title" className="on-paint bg-paint px-gutter py-12 text-on-paint lg:py-16">
      <div className="mx-auto max-w-container">
        <div data-reveal="" className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
          <div data-reveal-item="" className="min-w-0">
            <p className="ruled-label m-0 text-on-paint-muted [&::after]:bg-[var(--color-on-paint)]">
              <span className="index-numeral text-[1.75rem] leading-none">04</span>
              <span className="eyebrow">{t("label")}</span>
            </p>
            <h2 id="reduced-title" className="m-0 mt-5 text-step-4 leading-[1.08] text-on-paint">
              {t("title")}
            </h2>
          </div>
          <Link
            data-reveal-item=""
            style={{ "--i": 1 } as React.CSSProperties}
            href="/catalog?onSale=1"
            className="group inline-flex items-center gap-2 text-ui-md font-semibold text-on-paint underline decoration-1 underline-offset-[6px] transition-[text-decoration-thickness] duration-[200ms] hover-device:hover:decoration-2 hover-device:hover:decoration-[var(--color-accent-on-paint)]"
          >
            {t("all")}
            <ArrowRight size={16} aria-hidden="true" className="transition-transform duration-[200ms] group-hover:translate-x-1" />
          </Link>
        </div>

        <ul data-reveal="" className="m-0 mt-10 grid list-none gap-x-8 p-0 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4">
          {products.map((p, i) => {
            const pct = discountPercent(Number(p.price), p.comparePrice ? Number(p.comparePrice) : null);
            const { title } = productDisplay(p.name);
            return (
              <li
                key={p.id}
                data-reveal-item=""
                style={{ "--i": i } as React.CSSProperties}
                className="group relative flex items-start gap-5 border-t border-on-paint-line py-6"
              >
                <span aria-hidden="true" className="tabular shrink-0 text-step-4 leading-none text-brand-on-paint">
                  −{pct}%
                </span>
                <div className="flex min-w-0 flex-1 flex-col gap-3">
                  <Stage src={p.images?.[0]?.url} alt="" size="entry" sizes="140px" className="w-full max-w-[120px]" />
                  <h3 className="m-0 font-sans text-ui-md font-medium leading-[1.35] tracking-normal">
                    <Link href={`/product/${p.slug}`} className="line-clamp-2 text-on-paint after:absolute after:inset-0 hover-device:hover:underline hover-device:hover:decoration-1 hover-device:hover:underline-offset-4">
                      {title}
                    </Link>
                  </h3>
                  <PriceDisplay price={Number(p.price)} comparePrice={p.comparePrice ? Number(p.comparePrice) : null} size="sm" tone="on-paint" />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
