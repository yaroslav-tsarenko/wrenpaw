import { EntryGridSkeleton } from "@/components/product/ProductEntry/ProductEntry";

export function ProductSkeleton({ count = 12, dense = false }: { count?: number; dense?: boolean }) {
  return <EntryGridSkeleton count={count} dense={dense} />;
}
