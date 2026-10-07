import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { Trail } from "@/components/layout/BrandMark";
import { NAV_CATEGORIES } from "@/config/navigation";

export default async function NotFound() {
  const t = await getTranslations("errors");
  const nav = await getTranslations("nav");

  return (
    <div className="mx-auto max-w-container px-gutter pb-24 pt-12 lg:pt-20">
      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-x-6">
        <figure className="m-0 lg:col-span-5 lg:pt-2">
          <p aria-hidden="true" className="index-numeral m-0 text-display-xl">
            404
          </p>
          <span aria-hidden="true" className="mt-2 block h-px w-full bg-rule" />
          <figcaption className="mt-5 flex items-center gap-4">
            <Trail aria-hidden="true" className="block text-brand-2" style={{ width: 26, height: 26 }} />
            <span className="eyebrow text-ink-subtle">{t("notFoundLabel")}</span>
          </figcaption>
        </figure>

        <div className="lg:col-span-6 lg:col-start-7">
          <h1 className="m-0 font-display text-step-4 leading-[1.08] tracking-[-0.01em] text-ink">{t("notFound")}</h1>
          <p className="measure mt-4 text-step-1 leading-[1.5] text-ink-muted">{t("notFoundSubtitle")}</p>

          <form action="/search" method="get" role="search" className="mt-8 flex max-w-[34rem] items-end gap-3">
            <Input
              name="q"
              type="search"
              label={t("searchLabel")}
              placeholder={t("searchPlaceholder")}
              wrapperClassName="flex-1"
              autoComplete="off"
            />
            <Button type="submit" variant="outline" className="h-12 shrink-0" startContent={<Search aria-hidden="true" />}>
              {t("searchSubmit")}
            </Button>
          </form>

          <nav aria-labelledby="nf-categories" className="mt-12 border-t border-line pt-6">
            <h2 id="nf-categories" className="eyebrow m-0 text-ink-muted">
              {t("categoriesTitle")}
            </h2>
            <ul className="m-0 mt-4 grid list-none grid-cols-2 gap-x-6 gap-y-1 p-0">
              {NAV_CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/catalog/${cat.slug}`}
                    className="inline-flex min-h-11 items-center text-step-0 text-ink underline-offset-4 decoration-1 hover-device:hover:underline"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-10">
            <Link
              href="/"
              className="inline-flex min-h-11 items-center text-ui-md font-semibold text-ink underline decoration-1 underline-offset-4 hover-device:hover:decoration-2"
            >
              {t("backHome")}
            </Link>
            <span className="mx-4 text-ink-subtle" aria-hidden="true">
              /
            </span>
            <Link
              href="/catalog"
              className="inline-flex min-h-11 items-center text-ui-md font-semibold text-ink underline decoration-1 underline-offset-4 hover-device:hover:decoration-2"
            >
              {nav("allCategories")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
