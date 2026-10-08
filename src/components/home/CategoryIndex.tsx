import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Stage } from "@/components/product/ProductEntry/ProductEntry";
import { SectionOpener } from "./SectionOpener";
import type { IndexEntry } from "./types";

function MajorRow({ entry, index }: { entry: IndexEntry; index: string }) {
  return (
    <li data-reveal-item="" className="group border-t border-rule">
      <div className="grid items-start gap-x-10 gap-y-6 py-8 lg:grid-cols-12 lg:py-10">
        <div className="min-w-0 lg:col-span-5">
          <div className="flex items-baseline gap-4">
            <span aria-hidden="true" className="index-numeral shrink-0 text-[2.5rem]">
              {index}
            </span>
            <h3 className="m-0 text-step-3 leading-[1.1]">
              <Link
                href={`/catalog/${entry.slug}`}
                className="text-ink underline decoration-transparent decoration-1 underline-offset-[7px] transition-[text-decoration-color] duration-[200ms] hover-device:hover:decoration-brand-2"
              >
                {entry.name}
              </Link>
            </h3>
          </div>
          <p className="meta mt-3 text-ink-subtle">{entry.count}</p>
          {entry.description ? <p className="m-0 mt-4 max-w-[44ch] text-ui-md leading-[1.6] text-ink-muted">{entry.description}</p> : null}
          {entry.subcategories.length > 0 ? (
            <ul className="m-0 mt-5 flex list-none flex-wrap gap-x-5 gap-y-2 p-0">
              {entry.subcategories.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/catalog/${s.slug}`}
                    className="text-ui-sm text-ink-muted underline decoration-line-hover decoration-1 underline-offset-4 transition-colors duration-[200ms] hover-device:hover:text-ink hover-device:hover:decoration-brand-2"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        {entry.products.length > 0 ? (
          <div className="grid min-w-0 grid-cols-3 gap-4 lg:col-span-6 lg:col-start-7 lg:gap-6">
            {entry.products.map((p) => (
              <Link key={p.id} href={`/product/${p.slug}`} aria-label={p.name} className="block outline-offset-2">
                <Stage src={p.images?.[0]?.url} alt="" size="entry" sizes="(min-width: 1024px) 180px, 30vw" />
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </li>
  );
}

function MinorRow({ entry, index }: { entry: IndexEntry; index: string }) {
  return (
    <li data-reveal-item="" className="border-t border-line">
      <Link
        href={`/catalog/${entry.slug}`}
        className="group flex items-baseline gap-4 py-4 transition-colors duration-[200ms] hover-device:hover:bg-brand-soft sm:gap-6"
      >
        <span aria-hidden="true" className="index-numeral w-9 shrink-0 text-[1.5rem]">
          {index}
        </span>
        <h3 className="m-0 min-w-0 flex-1 font-sans text-step-1 font-medium leading-[1.3] tracking-normal text-ink">{entry.name}</h3>
        <span className="meta shrink-0 text-ink-subtle">{entry.count}</span>
        <ArrowRight size={18} aria-hidden="true" className="shrink-0 text-ink-subtle transition-transform duration-[200ms] group-hover:translate-x-1 group-hover:text-brand-2" />
      </Link>
    </li>
  );
}

export async function CategoryIndex({ index, major, minor, totalProducts }: { index: string; major: IndexEntry[]; minor: IndexEntry[]; totalProducts: number }) {
  const t = await getTranslations("home.index");
  if (major.length === 0 && minor.length === 0) return null;
  const all = [...major, ...minor];

  return (
    <section aria-labelledby="index-title" className="bg-surface-1 px-gutter py-14 lg:py-24">
      <div className="mx-auto max-w-container">
        <SectionOpener
          index={index}
          label={t("label")}
          title={t("title")}
          titleId="index-title"
          standfirst={t("lead", { products: totalProducts, categories: all.length })}
        />
        <ol data-reveal="" className="m-0 mt-10 list-none p-0 lg:mt-14">
          {major.map((entry, i) => (
            <MajorRow key={entry.slug} entry={entry} index={String(i + 1).padStart(2, "0")} />
          ))}
          {minor.map((entry, i) => (
            <MinorRow key={entry.slug} entry={entry} index={String(major.length + i + 1).padStart(2, "0")} />
          ))}
        </ol>
        <span aria-hidden="true" className="block h-px w-full bg-line" />
      </div>
    </section>
  );
}
