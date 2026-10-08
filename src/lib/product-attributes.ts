import { productDisplay } from "@/lib/product-name";

/**
 * Supplier rows carry their attributes as a run-on label dump in `shortDescription`:
 *
 *   "Pet: Dog Type: Dog collar Colour: Pink Material: Plastic Size: M/L Approx."
 *
 * Nothing is delimited, values run into the next label, and roughly a third of the
 * rows end in marketing prose. So we cut the string on known labels and then read
 * each value against a vocabulary — anything outside it is dropped rather than
 * guessed, which keeps the facet lists clean enough to put in front of a customer.
 */

export const ATTRIBUTE_KEYS = ["colour", "material", "size", "flavour"] as const;
export type AttributeKey = (typeof ATTRIBUTE_KEYS)[number];

export type ProductAttributes = Partial<Record<AttributeKey, string[]>>;

/** Labels that start a new value. Longest first so "Type of fastening" wins over "Type". */
const SPEC_LABELS = [
  "Analytical constituents",
  "Approx. dimensions",
  "Important information",
  "Recommended age",
  "Recommended use",
  "Type of fastening",
  "Washing instructions",
  "Neck Measurement",
  "Characteristics",
  "Chest Measurement",
  "Composition",
  "Ingredients",
  "Properties",
  "Capacity",
  "Diameter",
  "Quantity",
  "Flavour",
  "Flavor",
  "Material",
  "Colour",
  "Color",
  "Design",
  "Height",
  "Length",
  "Weight",
  "Units",
  "Width",
  "Size",
  "Type",
  "Pet",
];

const LABEL_RE = new RegExp(`\\b(${SPEC_LABELS.map((l) => l.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})\\s*:`, "gi");

/** Everything from here on is a dimension note or sales copy, never an attribute. */
const VALUE_TAIL = /\b(?:approx\.|max\.|min\.|aprox\.|ø)\b/i;

const COLOURS = [
  "Multicolour",
  "Cobalt blue",
  "Light blue",
  "Dark blue",
  "Light grey",
  "Dark grey",
  "Light green",
  "Dark green",
  "Light brown",
  "Dark brown",
  "Anthracite",
  "Burgundy",
  "Champagne",
  "Chocolate",
  "Turquoise",
  "Transparent",
  "Graphite",
  "Lavender",
  "Mustard",
  "Fuchsia",
  "Magenta",
  "Emerald",
  "Natural",
  "Salmon",
  "Silver",
  "Maroon",
  "Orange",
  "Purple",
  "Yellow",
  "Violet",
  "Beige",
  "Black",
  "Brown",
  "Coral",
  "Cream",
  "Green",
  "Khaki",
  "Lilac",
  "Olive",
  "Taupe",
  "White",
  "Blue",
  "Gold",
  "Grey",
  "Jade",
  "Lime",
  "Mint",
  "Navy",
  "Pink",
  "Sand",
  "Teal",
  "Red",
];

const MATERIALS = [
  "Stainless steel",
  "Natural rubber",
  "Polypropylene",
  "Polyurethane",
  "Microfiber",
  "Polyester",
  "Aluminium",
  "Cardboard",
  "Porcelain",
  "Bioplastic",
  "Neoprene",
  "Silicone",
  "Seagrass",
  "Ceramic",
  "Bamboo",
  "Acrylic",
  "Leather",
  "Plastic",
  "Rattan",
  "Fleece",
  "Velvet",
  "Wicker",
  "Cotton",
  "Canvas",
  "Denim",
  "Glass",
  "Latex",
  "Linen",
  "Metal",
  "Nylon",
  "Paper",
  "Plush",
  "Resin",
  "Rubber",
  "Steel",
  "Stone",
  "Suede",
  "Vinyl",
  "Felt",
  "Foam",
  "Iron",
  "Jute",
  "Mesh",
  "Cork",
  "Rope",
  "Sisal",
  "Wood",
  "Wool",
  "EVA",
  "PVC",
  "TPR",
  "TPU",
];

const FLAVOURS = [
  "Sweet potato",
  "Strawberry",
  "Blueberry",
  "Wild boar",
  "Vegetables",
  "Chicken",
  "Pumpkin",
  "Sardine",
  "Herring",
  "Venison",
  "Carrot",
  "Yoghurt",
  "Peanut",
  "Salmon",
  "Shrimp",
  "Potato",
  "Rabbit",
  "Turkey",
  "Banana",
  "Cheese",
  "Fruits",
  "Insect",
  "Apple",
  "Honey",
  "Liver",
  "Trout",
  "Beef",
  "Corn",
  "Deer",
  "Duck",
  "Fish",
  "Goat",
  "Lamb",
  "Meat",
  "Milk",
  "Mint",
  "Pork",
  "Rice",
  "Tuna",
  "Veal",
  "Egg",
  "Ox",
  "Pig",
];

/** Canonical clothing sizes, in wearing order so the facet list reads XS → XXL. */
const SIZES = ["XXS", "XXS/XS", "XS", "XS/S", "S", "S/M", "M", "M/L", "L", "L/XL", "XL", "XL/XXL", "XXL", "One size"];
const SIZE_ORDER = new Map(SIZES.map((s, i) => [s, i]));

type Vocabulary = { values: string[]; lookup: Map<string, string> };

function vocabulary(values: string[]): Vocabulary {
  return { values, lookup: new Map(values.map((v) => [v.toLowerCase(), v])) };
}

const VOCABULARY: Record<Exclude<AttributeKey, "size">, Vocabulary> = {
  colour: vocabulary(COLOURS),
  material: vocabulary(MATERIALS),
  flavour: vocabulary(FLAVOURS),
};

/** Split the dump into `label -> raw value`, keeping the first value for a repeated label. */
function splitSpecDump(text: string): Map<string, string> {
  const out = new Map<string, string>();
  const hits: { label: string; start: number; end: number }[] = [];
  LABEL_RE.lastIndex = 0;
  for (let m = LABEL_RE.exec(text); m; m = LABEL_RE.exec(text)) {
    hits.push({ label: m[1].toLowerCase(), start: m.index, end: m.index + m[0].length });
  }
  for (let i = 0; i < hits.length; i += 1) {
    const raw = text.slice(hits[i].end, i + 1 < hits.length ? hits[i + 1].start : text.length);
    const tail = raw.search(VALUE_TAIL);
    const value = (tail === -1 ? raw : raw.slice(0, tail)).trim();
    if (value && !out.has(hits[i].label)) out.set(hits[i].label, value);
  }
  return out;
}

/**
 * Values are space-run multi-values ("Colour: White Grey", "Material: Metal Plastic"),
 * so read every vocabulary term the segment contains, longest term first.
 */
function readVocabulary(value: string | undefined, vocab: Vocabulary): string[] {
  if (!value) return [];
  let rest = ` ${value.toLowerCase()} `;
  const found: string[] = [];
  for (const term of vocab.values) {
    const needle = ` ${term.toLowerCase()} `;
    const at = rest.indexOf(needle);
    if (at === -1) continue;
    found.push(term);
    rest = `${rest.slice(0, at + 1)}${rest.slice(at + needle.length - 1)}`;
  }
  return found;
}

function readSize(value: string | undefined): string[] {
  if (!value) return [];
  for (const token of value.split(/[\s,]+/)) {
    const key = token.replace(/[()]/g, "").replace(/-/g, "/").toUpperCase();
    if (SIZE_ORDER.has(key)) return [key];
  }
  return /^one size$/i.test(value.trim()) ? ["One size"] : [];
}

export function sizeRank(value: string): number {
  return SIZE_ORDER.get(value) ?? SIZES.length;
}

export function attributeValueRank(key: AttributeKey, value: string): number {
  if (key === "size") return sizeRank(value);
  const vocab = VOCABULARY[key];
  const index = vocab.values.findIndex((v) => v === value);
  return index === -1 ? vocab.values.length : index;
}

export interface AttributeSource {
  name?: string | null;
  shortDescription?: string | null;
}

export function parseProductAttributes({ name, shortDescription }: AttributeSource): ProductAttributes {
  const dump = splitSpecDump((shortDescription ?? "").replace(/\s+/g, " "));
  const colour = readVocabulary(dump.get("colour") ?? dump.get("color"), VOCABULARY.colour);
  const material = readVocabulary(dump.get("material"), VOCABULARY.material);
  const flavour = readVocabulary(dump.get("flavour") ?? dump.get("flavor"), VOCABULARY.flavour);
  // The size also rides on the end of most names ("… Trixie 20081 Black M/L"),
  // which covers rows whose dump has no Size: label at all.
  const size = readSize(dump.get("size")).concat(readSize(productDisplay(name).size ?? undefined));

  const attributes: ProductAttributes = {};
  if (colour.length) attributes.colour = colour;
  if (material.length) attributes.material = material;
  if (flavour.length) attributes.flavour = flavour;
  if (size.length) attributes.size = [size[0]];
  return attributes;
}

/** Read attributes back out of the stored `characteristics` JSON, ignoring anything unexpected. */
export function readProductAttributes(characteristics: unknown): ProductAttributes {
  if (!characteristics || typeof characteristics !== "object" || Array.isArray(characteristics)) return {};
  const source = characteristics as Record<string, unknown>;
  const out: ProductAttributes = {};
  for (const key of ATTRIBUTE_KEYS) {
    const raw = source[key];
    const values = Array.isArray(raw) ? raw : typeof raw === "string" ? [raw] : [];
    const clean = values.filter((v): v is string => typeof v === "string" && v.length > 0);
    if (clean.length) out[key] = clean;
  }
  return out;
}

export function hasAttributes(attributes: ProductAttributes): boolean {
  return ATTRIBUTE_KEYS.some((key) => (attributes[key]?.length ?? 0) > 0);
}
