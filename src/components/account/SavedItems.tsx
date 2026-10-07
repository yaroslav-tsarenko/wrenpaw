"use client";

import { useTranslations } from "next-intl";
import { EntryGrid, EntryGridSkeleton, ProductEntry, type EntryProduct } from "@/components/product/ProductEntry/ProductEntry";
import { EmptyState } from "@/components/shared/EmptyState/EmptyState";
import { Flag } from "@/components/ui/Flag";
import { AccountPageHeader } from "./AccountSidebar/AccountSidebar";
import { useAccountData } from "./useAccountData";
import { LoadError } from "./LoadError";

export function SavedItems() {
  const t = useTranslations("account.saved");
  const { data, error, loading, reload } = useAccountData<{ product: EntryProduct }[]>("/api/wishlist");
  const products = (data ?? []).map((item) => item.product).filter(Boolean);
  const count = loading ? null : products.length;

  return (
    <div>
      <AccountPageHeader title={t("title")} aside={count ? <Flag variant="neutral">{count}</Flag> : null} />
      {loading ? (
        <EntryGridSkeleton count={3} dense />
      ) : error ? (
        <LoadError onRetry={reload} />
      ) : products.length === 0 ? (
        <EmptyState title={t("emptyTitle")} subtitle={t("emptyBody")} actionLabel={t("browse")} actionHref="/catalog" align="start" className="border-t border-line px-0 py-10" />
      ) : (
        <EntryGrid dense>
          {products.map((product) => (
            <ProductEntry key={product.id} product={product} headingLevel={2} />
          ))}
        </EntryGrid>
      )}
    </div>
  );
}
