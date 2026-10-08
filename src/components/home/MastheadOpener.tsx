import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { ProductEntry } from "@/components/product/ProductEntry/ProductEntry";
import { LinkButton } from "./LinkButton";
import type { HomeCategory, HomeProduct } from "./types";

function Underline() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 200 10"
      preserveAspectRatio="none"
      className="pointer-events-none absolute -bottom-[0.06em] left-0 h-[0.18em] w-full text-brand-2"
    >
      <path
        data-stroke=""
        pathLength="1"
        d="M1 6.4C34 3.2 70 2.1 108 3.2c30 .9 59 2.6 91 4.4"
        fill="none"
        stroke="currentColor"
        strokeWidth="4.5"
        strokeLinecap="square"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export async function MastheadOpener({
  lead,
  categories,
  totalProducts,
}: {
  lead: HomeProduct | null;
  categories: HomeCategory[];
  totalProducts: number;
}) {
  const t = await getTranslations("home.masthead");
  const biggest = categories[0];
  const words = t("title").split(" ");
  const accented = words.length > 1 ? words[words.length - 1] : null;
  const head = accented ? words.slice(0, -1).join(" ") : t("title");

  return (
    <section aria-labelledby="masthead-title" className="px-gutter pb-14 pt-6 lg:pb-20 lg:pt-10">
      <div className="mx-auto grid max-w-container gap-x-10 gap-y-12 lg:grid-cols-12 lg:items-stretch">
        <div data-draw="" data-reveal="" className="flex min-w-0 flex-col lg:col-span-7">
          <p data-reveal-item="" className="eyebrow m-0 tabular text-brand-2">
            {t("eyebrow", { count: totalProducts })}
          </p>
          <h1
            id="masthead-title"
            data-reveal-item=""
            style={{ "--i": 1 } as React.CSSProperties}
            className="m-0 mt-5 text-step-6 leading-[1.04] text-ink"
          >
            {head}
            {accented ? (
              <>
                {" "}
                <span className="relative inline-block whitespace-nowrap">
                  {accented}
                  <Underline />
                </span>
              </>
            ) : null}
          </h1>
          <p data-reveal-item="" style={{ "--i": 2 } as React.CSSProperties} className="standfirst m-0 mt-6">
            {t("lead")}
          </p>
          <div data-reveal-item="" style={{ "--i": 3 } as React.CSSProperties} className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
            <LinkButton href="/catalog" size="lg">
              {t("shopAll")}
            </LinkButton>
            {biggest ? (
              <Link
                href={`/catalog/${biggest.slug}`}
                className="group inline-flex items-center gap-2 text-ui-md font-semibold text-ink underline decoration-1 underline-offset-[6px] transition-[text-decoration-thickness] duration-[200ms] hover-device:hover:decoration-2 hover-device:hover:decoration-brand-2"
              >
                {t("biggest", { name: biggest.name })}
                <ArrowRight size={16} aria-hidden="true" className="transition-transform duration-[200ms] group-hover:translate-x-1" />
              </Link>
            ) : null}
          </div>

          {categories.length > 0 ? (
            <div className="mt-14 lg:mt-auto lg:pt-20">
              <span aria-hidden="true" className="rule" />
              <ul className="m-0 flex list-none flex-wrap items-baseline gap-x-8 gap-y-3 p-0 pt-4">
                {categories.map((c, i) => (
                  <li key={c.slug} data-reveal-item="" style={{ "--i": i + 4 } as React.CSSProperties}>
                    <Link
                      href={`/catalog/${c.slug}`}
                      className="group inline-flex items-baseline gap-2 text-ui-md text-ink underline decoration-transparent decoration-1 underline-offset-[5px] transition-[text-decoration-color] duration-[200ms] hover-device:hover:decoration-brand-2"
                    >
                      {c.name}
                      <span className="meta text-ink-subtle group-hover:text-brand-2">{c.count}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        {lead ? (
          <div data-reveal="" className="min-w-0 lg:col-span-5 lg:pt-3">
            <div data-reveal-item="" style={{ "--i": 2 } as React.CSSProperties} className="mx-auto w-full max-w-[460px] lg:mx-0 lg:max-w-none">
              <ProductEntry product={lead} density="lead" headingLevel={2} priority sizes="(min-width: 1024px) 480px, 100vw" />
            </div>
          </div>
        ) : null}
      </div>

    </section>
  );
}
