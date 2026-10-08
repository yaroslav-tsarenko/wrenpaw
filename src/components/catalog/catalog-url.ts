import { ATTRIBUTE_KEYS, type AttributeKey } from "@/lib/product-attributes";

export const SORT_KEYS = ["newest", "price-asc", "price-desc", "popular", "name-asc", "relevance"] as const;
export type SortKey = (typeof SORT_KEYS)[number];

export const CATALOG_PAGE_SIZE = 24;

export type AttributeSelection = Record<AttributeKey, string[]>;

export interface CatalogParams {
  sort: SortKey;
  page: number;
  minPrice: number | null;
  maxPrice: number | null;
  inStock: boolean;
  onSale: boolean;
  brands: string[];
  category: string | null;
  attributes: AttributeSelection;
}

export interface CategoryOption {
  key: string;
  name: string;
  count: number;
  href: string;
  active: boolean;
  depth: 0 | 1;
}

export interface ValueOption {
  value: string;
  count: number;
}

export interface AttributeFacet {
  key: AttributeKey;
  values: ValueOption[];
}

export interface CatalogFacets {
  categoryTitle: "category" | "subcategory";
  categories: CategoryOption[];
  brands: ValueOption[];
  attributes: AttributeFacet[];
  price: { min: number; max: number } | null;
  inStockCount: number;
  onSaleCount: number;
  narrowingInStock: boolean;
}

export type RawSearchParams = Record<string, string | string[] | undefined>;

function first(value: string | string[] | undefined): string {
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}

/** Multi-value params travel as `brand=Flexi,Hunter`, and repeated keys are merged too. */
function list(value: string | string[] | undefined): string[] {
  const raw = Array.isArray(value) ? value : value === undefined ? [] : [value];
  const seen = new Set<string>();
  for (const entry of raw) {
    for (const part of entry.split(",")) {
      const clean = part.trim();
      if (clean) seen.add(clean);
    }
  }
  return [...seen];
}

function price(value: string): number | null {
  if (!value) return null;
  const n = Number(value);
  return Number.isFinite(n) && n >= 0 ? Math.round(n * 100) / 100 : null;
}

export function emptyAttributes(): AttributeSelection {
  const out = {} as AttributeSelection;
  for (const key of ATTRIBUTE_KEYS) out[key] = [];
  return out;
}

export function parseCatalogParams(raw: RawSearchParams, defaultSort: SortKey = "newest"): CatalogParams {
  const sortRaw = first(raw.sort) as SortKey;
  const page = parseInt(first(raw.page), 10);
  let minPrice = price(first(raw.minPrice));
  let maxPrice = price(first(raw.maxPrice));
  if (minPrice !== null && maxPrice !== null && minPrice > maxPrice) [minPrice, maxPrice] = [maxPrice, minPrice];
  const attributes = emptyAttributes();
  for (const key of ATTRIBUTE_KEYS) attributes[key] = list(raw[key]);
  return {
    sort: SORT_KEYS.includes(sortRaw) ? sortRaw : defaultSort,
    page: Number.isFinite(page) && page > 1 ? page : 1,
    minPrice,
    maxPrice,
    inStock: first(raw.inStock) === "true",
    onSale: first(raw.onSale) === "true",
    brands: list(raw.brand),
    category: first(raw.category).trim() || null,
    attributes,
  };
}

export function selectedAttributeCount(params: CatalogParams): number {
  return ATTRIBUTE_KEYS.reduce((sum, key) => sum + params.attributes[key].length, 0);
}

export function hasActiveFilters(params: CatalogParams): boolean {
  return (
    params.minPrice !== null ||
    params.maxPrice !== null ||
    params.inStock ||
    params.onSale ||
    params.brands.length > 0 ||
    selectedAttributeCount(params) > 0 ||
    Boolean(params.category)
  );
}

/** Add or remove one value from a multi-select facet, keeping the original order. */
export function toggleValue(values: string[], value: string): string[] {
  return values.includes(value) ? values.filter((v) => v !== value) : [...values, value];
}

export type ParamOverrides = Partial<CatalogParams>;

export function buildCatalogHref(
  basePath: string,
  params: CatalogParams,
  overrides: ParamOverrides = {},
  options: { fixed?: Record<string, string>; defaultSort?: SortKey; resetPage?: boolean } = {},
): string {
  const next: CatalogParams = { ...params, ...overrides };
  const resetPage = options.resetPage ?? !("page" in overrides);
  if (resetPage) next.page = 1;
  const qs = new URLSearchParams();
  for (const [key, value] of Object.entries(options.fixed ?? {})) if (value) qs.set(key, value);
  if (next.category) qs.set("category", next.category);
  if (next.brands.length > 0) qs.set("brand", next.brands.join(","));
  for (const key of ATTRIBUTE_KEYS) {
    const values = next.attributes[key];
    if (values.length > 0) qs.set(key, values.join(","));
  }
  if (next.minPrice !== null) qs.set("minPrice", String(next.minPrice));
  if (next.maxPrice !== null) qs.set("maxPrice", String(next.maxPrice));
  if (next.inStock) qs.set("inStock", "true");
  if (next.onSale) qs.set("onSale", "true");
  if (next.sort !== (options.defaultSort ?? "newest")) qs.set("sort", next.sort);
  if (next.page > 1) qs.set("page", String(next.page));
  const query = qs.toString();
  return query ? `${basePath}?${query}` : basePath;
}

export function clearedParams(params: CatalogParams): CatalogParams {
  return {
    ...params,
    minPrice: null,
    maxPrice: null,
    inStock: false,
    onSale: false,
    brands: [],
    category: null,
    attributes: emptyAttributes(),
    page: 1,
  };
}
