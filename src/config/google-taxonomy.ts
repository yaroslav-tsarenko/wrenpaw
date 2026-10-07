export interface GoogleTaxonomyRefinement {
  keywords: string[];
  id: number;
  name: string;
}

export interface GoogleTaxonomyEntry {
  id: number;
  name: string;
  refine?: GoogleTaxonomyRefinement[];
}

export const GOOGLE_TAXONOMY_VERSION = "2021-09-21";

const PET = "Animals & Pet Supplies > Pet Supplies";

export const GOOGLE_TAXONOMY_FALLBACK: GoogleTaxonomyEntry = { id: 2, name: PET };

const DOG: GoogleTaxonomyEntry = { id: 5, name: `${PET} > Dog Supplies` };
const CAT: GoogleTaxonomyEntry = { id: 4, name: `${PET} > Cat Supplies` };
const SMALL: GoogleTaxonomyEntry = { id: 8, name: `${PET} > Small Animal Supplies` };
const BIRD: GoogleTaxonomyEntry = { id: 3, name: `${PET} > Bird Supplies` };
const FISH: GoogleTaxonomyEntry = { id: 6, name: `${PET} > Fish Supplies` };
const REPTILE: GoogleTaxonomyEntry = { id: 7, name: `${PET} > Reptile & Amphibian Supplies` };

export const GOOGLE_TAXONOMY: Record<string, GoogleTaxonomyEntry> = {
  dogs: DOG,
  "dog-food": DOG,
  "dog-treats": DOG,
  "dog-toys": DOG,
  "dog-beds": DOG,
  "dog-bowls": DOG,
  "dog-clothing": DOG,
  "dog-grooming": DOG,
  "dog-health": DOG,
  "dog-cleanup": DOG,
  "dog-kennels": DOG,
  "dog-walking": DOG,
  collars: DOG,
  harnesses: DOG,
  leads: DOG,
  "id-tags": DOG,
  muzzles: DOG,
  "dog-training": DOG,
  "dog-carriers": DOG,

  cats: CAT,
  "cat-food": CAT,
  "cat-treats": CAT,
  "cat-litter": CAT,
  "cat-trees": CAT,
  "cat-toys": CAT,
  "cat-beds": CAT,
  "cat-bowls": CAT,
  "cat-flaps": CAT,
  "cat-grooming": CAT,
  "cat-health": CAT,
  "cat-collars": CAT,
  "cat-carriers": CAT,

  "small-animals": SMALL,
  "small-food": SMALL,
  "small-cages": SMALL,
  "small-habitat": SMALL,
  "small-beds": SMALL,
  "small-bowls": SMALL,
  "small-toys": SMALL,
  "small-grooming": SMALL,
  "small-leads": SMALL,
  "small-carriers": SMALL,

  birds: BIRD,
  "bird-food": BIRD,
  "bird-cages": BIRD,
  "bird-feeders": BIRD,

  aquarium: FISH,
  "aqua-equipment": FISH,
  "aqua-decor": FISH,

  reptiles: REPTILE,
  "rept-terrarium": REPTILE,
  "rept-climate": REPTILE,

  travel: { id: 2, name: PET },
};

function matchesKeyword(text: string, keyword: string): boolean {
  const escaped = keyword.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(?:^|[^a-z])${escaped}(?:s|es)?(?![a-z])`, "i").test(text);
}

export function googleTaxonomyFor(categorySlugs: string[], productName: string, override?: string | null): { id: number; name: string } {
  const explicit = override?.trim();
  if (explicit && /^\d+$/.test(explicit)) return { id: Number(explicit), name: explicit };
  const name = productName.toLowerCase();
  for (const slug of [...categorySlugs].reverse()) {
    const entry = GOOGLE_TAXONOMY[slug];
    if (!entry) continue;
    const refined = entry.refine?.find((rule) => rule.keywords.some((keyword) => matchesKeyword(name, keyword)));
    return refined ? { id: refined.id, name: refined.name } : { id: entry.id, name: entry.name };
  }
  return GOOGLE_TAXONOMY_FALLBACK;
}
