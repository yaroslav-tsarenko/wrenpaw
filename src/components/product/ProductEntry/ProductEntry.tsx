"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBasket, Bookmark } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { useCart } from "@/providers/CartProvider";
import { useWishlist } from "@/providers/WishlistProvider";
import { PriceDisplay, discountPercent } from "@/components/shared/PriceDisplay/PriceDisplay";
import { Button } from "@/components/ui/Button";
import { SkeletonBar } from "@/components/ui/TrailLoader";
import { Trail } from "@/components/layout/BrandMark";
import { productDisplay } from "@/lib/product-name";
import { itemQuantityCap } from "@/lib/pricing";

export interface EntryProduct {
  id: string;
  name: string;
  slug: string;
  sku?: string;
  price: number | string;
  comparePrice?: number | string | null;
  quantity?: number;
  images?: { url: string; alt?: string | null }[];
  imageUrl?: string | null;
  categories?: { category: { name: string; slug?: string } }[];
  category?: string | null;
  createdAt?: string | Date | null;
  isNew?: boolean;
}

type StageSize = "lead" | "entry" | "row" | "mini" | "wide";

const STAGE_ASPECT: Record<StageSize, string> = {
  // Catalogue photography is square (1200×1200), so a taller plate only adds dead bands.
  lead: "aspect-square",
  entry: "aspect-square",
  wide: "aspect-[3/2]",
  row: "aspect-square",
  mini: "aspect-square",
};

export interface StageProps {
  src?: string | null;
  alt: string;
  size?: StageSize;
  sizes?: string;
  priority?: boolean;
  hover?: "none" | "lift";
  hoverSrc?: string | null;
  settleKey?: number;
  className?: string;
  stageClassName?: string;
  children?: ReactNode;
}

export function Stage({
  src,
  alt,
  size = "entry",
  sizes,
  priority,
  hover = "none",
  hoverSrc,
  settleKey = 0,
  className,
  stageClassName,
  children,
}: StageProps) {
  const small = size === "row" || size === "mini";
  const [failed, setFailed] = useState(false);
  const [altFailed, setAltFailed] = useState(false);
  const showImage = Boolean(src) && !failed;
  const showAlt = Boolean(hoverSrc) && hoverSrc !== src && !altFailed && hover === "lift";

  return (
    <div
      data-plate=""
      className={cn(
        "plate relative",
        STAGE_ASPECT[size],
        showImage ? "bg-stage" : "plate-empty",
        stageClassName,
        className,
      )}
    >
      {showImage ? (
        <>
          {/* Supplier packshots sit on #fff or #f8f8f8; the 4% lift takes the off-white
              ones up to the plate's white so no photo edge shows. */}
          <div
            key={settleKey}
            data-packshot=""
            className={cn(
              "absolute inset-0 p-[8%] transition-transform duration-[280ms] ease-[var(--ease-press)]",
              hover === "lift" && !showAlt && "group-hover:scale-[1.015] group-focus-within:scale-[1.015]",
              settleKey > 0 && "animate-settle",
            )}
          >
            <div className="relative size-full">
              <Image
                src={src as string}
                alt={alt}
                fill
                priority={priority}
                sizes={sizes ?? (small ? "96px" : "(min-width: 1280px) 320px, (min-width: 1024px) 30vw, 50vw")}
                className={cn(
                  "object-contain object-center brightness-[1.04] transition-opacity duration-[280ms] ease-[var(--ease-press)]",
                  showAlt && "group-hover:opacity-0 group-focus-within:opacity-0",
                )}
                onError={() => setFailed(true)}
              />
              {showAlt ? (
                <Image
                  src={hoverSrc as string}
                  alt=""
                  fill
                  sizes={sizes ?? "(min-width: 1280px) 320px, (min-width: 1024px) 30vw, 50vw"}
                  className="object-contain object-center opacity-0 brightness-[1.04] transition-opacity duration-[280ms] ease-[var(--ease-press)] group-hover:opacity-100 group-focus-within:opacity-100"
                  onError={() => setAltFailed(true)}
                />
              ) : null}
            </div>
          </div>
        </>
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-ink-subtle">
          <Trail className="block opacity-25" style={{ width: small ? 18 : 34, height: small ? 18 : 34 }} />
          {!small ? <span className="meta text-ui-xs">No photograph yet</span> : null}
        </div>
      )}
      {children}
    </div>
  );
}

function toNumber(value: number | string | null | undefined): number | null {
  if (value === null || value === undefined || value === "") return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

export function entryFlag(product: EntryProduct): { tone: "sale" | "ink" | "muted"; label: string } | null {
  const price = toNumber(product.price) ?? 0;
  const compare = toNumber(product.comparePrice);
  if (product.quantity !== undefined && product.quantity <= 0) return { tone: "muted", label: "Sold out" };
  const pct = discountPercent(price, compare);
  if (pct > 0) return { tone: "sale", label: `−${pct}%` };
  if (product.isNew) return { tone: "ink", label: "New" };
  return null;
}

const FLAG_TONE: Record<"sale" | "ink" | "muted", string> = {
  sale: "text-sale",
  ink: "text-ink",
  muted: "text-ink-subtle",
};

export interface ProductEntryProps {
  product: EntryProduct;
  density?: "lead" | "entry" | "row" | "mini";
  priority?: boolean;
  sizes?: string;
  specLine?: string | null;
  specRows?: { label: string; value: string }[];
  showPlate?: boolean;
  headingLevel?: 2 | 3 | 4;
  className?: string;
}

export function ProductEntry({ product, density = "entry", priority, sizes, specLine, specRows, showPlate = true, headingLevel = 3, className }: ProductEntryProps) {
  const { addItem } = useCart();
  const { isSaved, toggle, pending } = useWishlist();
  const [settleKey, setSettleKey] = useState(0);
  const price = toNumber(product.price) ?? 0;
  const compare = toNumber(product.comparePrice);
  const imageUrl = product.imageUrl ?? product.images?.[0]?.url ?? null;
  const hoverUrl = product.images?.[1]?.url ?? null;
  const { title, size } = productDisplay(product.name);
  const alt = product.images?.[0]?.alt || title;
  const outOfStock = product.quantity !== undefined && product.quantity <= 0;
  const saved = isSaved(product.id);
  const flag = entryFlag(product);
  const category = product.category ?? product.categories?.[0]?.category?.name ?? null;
  const href = `/product/${product.slug}`;
  const Heading = `h${headingLevel}` as "h2" | "h3" | "h4";

  const add = (event: React.MouseEvent<HTMLElement>) => {
    if (outOfStock) return;
    addItem({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      sku: product.sku ?? product.id,
      price,
      quantity: 1,
      imageUrl,
      maxQuantity: itemQuantityCap(product.quantity),
    });
    setSettleKey((k) => k + 1);
    window.dispatchEvent(new CustomEvent("wrenpaw:bag-add", { detail: { productId: product.id, source: event.currentTarget.closest("[data-entry]") } }));
  };

  if (density === "mini") {
    return (
      <article data-entry="" className={cn("group relative flex items-center gap-4", className)}>
        <Stage src={imageUrl} alt="" size="mini" className="w-16 shrink-0" />
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <Heading className="m-0 font-sans text-ui-sm font-medium leading-[1.4] tracking-normal">
            <Link href={href} className="line-clamp-2 text-ink after:absolute after:inset-0 hover-device:hover:underline">
              {title}
            </Link>
          </Heading>
          <PriceDisplay price={price} comparePrice={compare} size="sm" />
        </div>
      </article>
    );
  }

  if (density === "row") {
    return (
      <article data-entry="" className={cn("group relative flex items-center gap-5 py-4", className)}>
        <Stage src={imageUrl} alt="" size="row" hover="lift" className="w-[72px] shrink-0 sm:w-[88px]" />
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          {category ? <span className="eyebrow text-ink-subtle">{category}</span> : null}
          <Heading className="m-0 font-sans text-ui-md font-medium leading-[1.35] tracking-normal">
            <Link href={href} className="line-clamp-1 text-ink after:absolute after:inset-0 hover-device:hover:underline hover-device:hover:decoration-1 hover-device:hover:underline-offset-4">
              {title}
            </Link>
          </Heading>
          {size ? <span className="meta text-ink-subtle">{size}</span> : null}
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1">
          <PriceDisplay price={price} comparePrice={compare} size="sm" />
          {flag ? <span className={cn("eyebrow", FLAG_TONE[flag.tone])}>{flag.label}</span> : null}
        </div>
      </article>
    );
  }

  const lead = density === "lead";

  return (
    <article data-entry="" data-density={density} className={cn("group relative flex min-w-0 flex-col", className)}>
      {showPlate ? (
      <Stage
        src={imageUrl}
        alt={alt}
        hoverSrc={hoverUrl}
        size={lead ? "lead" : "entry"}
        sizes={sizes ?? (lead ? "(min-width: 1024px) 600px, 100vw" : undefined)}
        priority={priority}
        hover="lift"
        settleKey={settleKey}
        stageClassName="group-has-[a[data-entry-link]:focus-visible]:outline-2 group-has-[a[data-entry-link]:focus-visible]:-outline-offset-2 group-has-[a[data-entry-link]:focus-visible]:outline-focus"
      >
        <button
          type="button"
          onClick={() => toggle(product.id)}
          aria-pressed={saved}
          aria-label={saved ? `Saved: ${title}` : `Save ${title}`}
          disabled={pending(product.id)}
          className={cn(
            "absolute right-1 top-1 z-2 flex size-11 cursor-pointer items-center justify-center text-on-stage [--color-focus:var(--color-on-stage)] transition-opacity duration-[200ms]",
            saved ? "opacity-100" : "hover-device:opacity-0 hover-device:group-hover:opacity-100 hover-device:group-focus-within:opacity-100",
          )}
        >
          <Bookmark size={18} aria-hidden="true" fill={saved ? "currentColor" : "none"} />
        </button>
      </Stage>
      ) : null}

      <span
        aria-hidden="true"
        className={cn(
          "block h-px w-full bg-line transition-colors duration-[280ms] ease-[var(--ease-press)]",
          showPlate ? "mt-3" : "mt-0",
          "group-hover:bg-brand-2 group-focus-within:bg-brand-2",
        )}
      />

      <div className="mt-2.5 flex items-baseline justify-between gap-3">
        <span className="eyebrow truncate text-ink-subtle">{category ?? " "}</span>
        {flag ? <span className={cn("eyebrow shrink-0", FLAG_TONE[flag.tone])}>{flag.label}</span> : null}
      </div>

      <Heading
        className={cn(
          "m-0",
          lead ? "mt-3 font-display text-step-3" : "mt-1.5 font-sans text-step-0 font-medium leading-[1.4] tracking-normal",
        )}
      >
        <Link
          href={href}
          data-entry-link=""
          className={cn(
            "text-ink outline-none after:absolute after:inset-0 after:z-1 hover-device:hover:underline hover-device:hover:decoration-1 hover-device:hover:underline-offset-4",
            !lead && "line-clamp-2 min-h-[2.8em] break-words [overflow-wrap:anywhere]",
          )}
        >
          {title}
        </Link>
      </Heading>

      {size ? <span className="meta mt-1 block text-ink-subtle">{size}</span> : null}
      {lead && specLine ? <p className="standfirst mt-3 line-clamp-3">{specLine}</p> : null}
      {lead && specRows && specRows.length > 0 ? (
        <dl className="m-0 mt-5 grid grid-cols-[auto_1fr] gap-x-6">
          {specRows.map((row) => (
            <div key={row.label} className="col-span-2 grid grid-cols-subgrid border-t border-line py-2">
              <dt className="eyebrow self-center text-ink-subtle">{row.label}</dt>
              <dd className="meta m-0 self-center text-right text-ink">{row.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}

      <div className={cn("flex items-center justify-between gap-3", lead ? "mt-5" : "mt-2")}>
        <PriceDisplay price={price} comparePrice={compare} size={lead ? "md" : "sm"} />
        {!outOfStock && !lead ? (
          <button
            type="button"
            onClick={add}
            aria-label={`Add ${title} to basket`}
            className="relative z-2 flex size-11 shrink-0 cursor-pointer items-center justify-center bg-brand text-on-brand transition-colors duration-[200ms] active:bg-brand-hover hover-device:hidden"
          >
            <ShoppingBasket size={18} aria-hidden="true" />
          </button>
        ) : null}
      </div>

      {!outOfStock ? (
        <div
          className={cn(
            "relative z-2",
            lead
              ? "mt-5 block"
              : "mt-3 hidden hover-device:-mb-12 hover-device:block hover-device:opacity-0 hover-device:transition-opacity hover-device:duration-[200ms] hover-device:group-hover:opacity-100 hover-device:group-focus-within:opacity-100",
          )}
        >
          <Button size={lead ? "lg" : "sm"} fullWidth={!lead} onClick={add} aria-label={`Add ${title} to basket`}>
            Add to basket
          </Button>
        </div>
      ) : null}
    </article>
  );
}

export function EntrySkeleton({ density = "entry" }: { density?: "entry" | "lead" }) {
  return (
    <div aria-hidden="true" className="flex min-w-0 flex-col">
      <div className={cn("plate plate-empty", STAGE_ASPECT[density])} />
      <span className="mt-3 block h-px w-full bg-line" />
      <SkeletonBar className="mt-3 w-20" />
      <SkeletonBar className="mt-3 w-[85%]" />
      <SkeletonBar className="mt-2 w-[55%]" />
    </div>
  );
}

export function EntryGrid({ children, className, dense = false }: { children: ReactNode; className?: string; dense?: boolean }) {
  return (
    <div
      className={cn(
        "grid min-w-0 grid-cols-2 gap-x-5 gap-y-12 sm:gap-x-8 sm:gap-y-14",
        dense ? "lg:grid-cols-3" : "lg:grid-cols-3 xl:grid-cols-4",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function EntryGridSkeleton({ count = 8, dense = false }: { count?: number; dense?: boolean }) {
  return (
    <EntryGrid dense={dense}>
      {Array.from({ length: count }).map((_, i) => (
        <EntrySkeleton key={i} />
      ))}
    </EntryGrid>
  );
}
