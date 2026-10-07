"use client";

import { EntryGrid, ProductEntry, type EntryProduct } from "@/components/product/ProductEntry/ProductEntry";

interface ProductGridProps {
  products: EntryProduct[];
  dense?: boolean;
  priorityCount?: number;
  className?: string;
}

export function ProductGrid({ products, dense = false, priorityCount = 0, className }: ProductGridProps) {
  return (
    <EntryGrid dense={dense} className={className}>
      {products.map((product, index) => (
        <ProductEntry key={product.id} product={product} priority={index < priorityCount} />
      ))}
    </EntryGrid>
  );
}
