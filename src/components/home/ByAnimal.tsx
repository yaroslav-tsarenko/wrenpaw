import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Stage } from "@/components/product/ProductEntry/ProductEntry";
import { SectionOpener } from "./SectionOpener";
import type { AnimalBlock } from "./types";

function Block({ block, large, limit }: { block: AnimalBlock; large: boolean; limit: number }) {
  return (
    <div className="flex min-w-0 flex-col">
      <span aria-hidden="true" className="rule" />
      <h3 className={large ? "m-0 mt-5 text-step-3 leading-[1.1]" : "m-0 mt-4 text-step-2 leading-[1.15]"}>
        <Link
          href={`/catalog/${block.slug}`}
          className="text-ink underline decoration-transparent decoration-1 underline-offset-[7px] transition-[text-decoration-color] duration-[200ms] hover-device:hover:decoration-brand-2"
        >
          {block.name}
        </Link>
      </h3>
      <p className="meta mt-2 text-ink-subtle">{block.count}</p>
      {block.product ? (
        <Link href={`/product/${block.product.slug}`} aria-label={block.product.name} className="group mt-5 block outline-offset-2">
          <Stage
            src={block.product.images?.[0]?.url}
            hoverSrc={block.product.images?.[1]?.url}
            alt=""
            size={large ? "wide" : "entry"}
            hover="lift"
            sizes={large ? "(min-width: 1024px) 560px, 100vw" : "(min-width: 1024px) 260px, 50vw"}
          />
        </Link>
      ) : null}
      {large && block.description ? <p className="m-0 mt-6 max-w-[48ch] text-step-1 leading-[1.5] text-ink-muted">{block.description}</p> : null}
      {block.subcategories.length > 0 ? (
        <ul className="m-0 mt-5 flex list-none flex-col gap-0 p-0">
          {block.subcategories.slice(0, limit).map((s) => (
            <li key={s.slug} className="border-t border-line">
              <Link
                href={`/catalog/${s.slug}`}
                className="block py-2.5 text-ui-sm text-ink-muted transition-colors duration-[200ms] hover-device:hover:text-ink"
              >
                {s.name}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export async function ByAnimal({ index, blocks }: { index: string; blocks: AnimalBlock[] }) {
  const t = await getTranslations("home.animals");
  if (blocks.length === 0) return null;
  const [first, ...rest] = blocks;

  return (
    <section aria-labelledby="animals-title" className="px-gutter py-14 lg:py-20">
      <div className="mx-auto max-w-container">
        <SectionOpener index={index} label={t("label")} title={t("title")} titleId="animals-title" standfirst={t("lead")} />
        <div data-reveal="" className="mt-10 grid gap-x-10 gap-y-12 lg:mt-14 lg:grid-cols-12">
          <div data-reveal-item="" className="min-w-0 lg:col-span-6">
            <Block block={first} large limit={6} />
          </div>
          {rest.map((block, i) => (
            <div key={block.slug} data-reveal-item="" style={{ "--i": i + 1 } as React.CSSProperties} className="min-w-0 lg:col-span-3">
              <Block block={block} large={false} limit={3} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
