import { IMAGE_VARIANT_WIDTHS } from "../lib/image-loader";
import { STORE_POLICY } from "./store-policy";

export type Matcher = string | RegExp;

export type MatchScope = "leaf" | "name" | "description" | "brand";

export interface StorefrontSubcategory {
  slug: string;
  name: string;
  description?: string;
  categoryArt?: string | null;
}

export interface StorefrontCategory {
  slug: string;
  name: string;
  description?: string;
  subs: StorefrontSubcategory[];
  categoryArt?: string | null;
}

export interface TaxonomyRoute {
  path: string;
  to: string;
}

export interface TaxonomyExclusion {
  path: string;
  rule: string;
}

export interface NameReroute {
  startsWith: string[];
  to: string;
}

export interface ExcludeRule {
  id: string;
  label: string;
  scopes: MatchScope[];
  keywords: Matcher[];
  unless?: Matcher[];
  onlyIn?: string[];
}

export interface CatalogConfig {
  source: {
    isoCode: string;
    cacheTtlHours: number;
  };
  storefront: StorefrontCategory[];
  taxonomy: {
    root: string;
    watch: string[];
    routes: TaxonomyRoute[];
    exclude: TaxonomyExclusion[];
    reroute: NameReroute[];
  };
  exclude: {
    ignorePhrases: Matcher[];
    rules: ExcludeRule[];
  };
  price: {
    sourceCurrency: "EUR";
    sourceToBaseRate: number;
    vatPercent: number;
    multiplier: number;
    roundToNinetyNine: boolean;
    minRetail: number;
    maxRetail: number;
    minMarginOverWholesale: number;
    anomalyFactor: number;
    anomalyMinSample: number;
    anomalyBasis: "primary" | "subcategory";
  };
  quality: {
    allowedConditions: string[];
    minImages: number;
    maxImagesPerProduct: number;
    skipLogoImages: boolean;
    minNameLength: number;
    maxNameLength: number;
    minDescriptionChars: number;
    maxVariantsPerName: number;
    requireInStock: boolean;
    maxPackUnits: number;
    maxPackUnitsByPrimary: Record<string, number>;
  };
  limits: {
    maxProducts: number;
    maxPerPrimary: number;
    maxPerSub: number;
    minPerPrimary: number;
    minPerSub: number;
    maxTopLevel: number;
  };
  images: {
    hosting: "supplier" | "r2";
    keyPrefix: string;
    concurrency: number;
    timeoutMs: number;
    maxBytes: number;
    variants: {
      widths: readonly number[];
      quality: number;
      effort: number;
    };
  };
  brands: {
    showcaseLimit: number;
    minProducts: number;
  };
}

const storefront: StorefrontCategory[] = [
  {
    slug: "dogs",
    name: "Dogs",
    description: "Food, beds, bowls, toys, coats and grooming for dogs of every size.",
    categoryArt: null,
    subs: [
      { slug: "dog-food", name: "Dry & wet food", categoryArt: null },
      { slug: "dog-treats", name: "Treats & chews", categoryArt: null },
      { slug: "dog-toys", name: "Toys", categoryArt: null },
      { slug: "dog-beds", name: "Beds & blankets", categoryArt: null },
      { slug: "dog-bowls", name: "Bowls & feeders", categoryArt: null },
      { slug: "dog-clothing", name: "Coats & jumpers", categoryArt: null },
      { slug: "dog-grooming", name: "Grooming", categoryArt: null },
      { slug: "dog-health", name: "Health & recovery", categoryArt: null },
      { slug: "dog-cleanup", name: "Clean-up & toilet training", categoryArt: null },
      { slug: "dog-kennels", name: "Kennels, pens & doors", categoryArt: null },
    ],
  },
  {
    slug: "dog-walking",
    name: "Dog walking",
    description: "Collars, harnesses, leads and the kit that goes out of the door with you.",
    categoryArt: null,
    subs: [
      { slug: "collars", name: "Collars", categoryArt: null },
      { slug: "harnesses", name: "Harnesses", categoryArt: null },
      { slug: "leads", name: "Leads & long lines", categoryArt: null },
      { slug: "id-tags", name: "ID tags & badges", categoryArt: null },
      { slug: "muzzles", name: "Muzzles", categoryArt: null },
      { slug: "dog-training", name: "Training & trackers", categoryArt: null },
    ],
  },
  {
    slug: "cats",
    name: "Cats",
    description: "Litter, scratchers, food, toys and quiet places to sleep.",
    categoryArt: null,
    subs: [
      { slug: "cat-food", name: "Dry & wet food", categoryArt: null },
      { slug: "cat-treats", name: "Treats", categoryArt: null },
      { slug: "cat-litter", name: "Litter trays & litter", categoryArt: null },
      { slug: "cat-trees", name: "Scratchers & cat trees", categoryArt: null },
      { slug: "cat-toys", name: "Toys", categoryArt: null },
      { slug: "cat-beds", name: "Beds & blankets", categoryArt: null },
      { slug: "cat-bowls", name: "Bowls & fountains", categoryArt: null },
      { slug: "cat-flaps", name: "Cat flaps & balcony nets", categoryArt: null },
      { slug: "cat-grooming", name: "Grooming", categoryArt: null },
      { slug: "cat-health", name: "Health & behaviour", categoryArt: null },
      { slug: "cat-collars", name: "Collars & leads", categoryArt: null },
    ],
  },
  {
    slug: "small-animals",
    name: "Small animals",
    description: "Cages, hay, hideouts and wheels for rabbits, guinea pigs, hamsters and ferrets.",
    categoryArt: null,
    subs: [
      { slug: "small-food", name: "Food, hay & snacks", categoryArt: null },
      { slug: "small-cages", name: "Cages & hutches", categoryArt: null },
      { slug: "small-habitat", name: "Habitat decor & tunnels", categoryArt: null },
      { slug: "small-beds", name: "Beds & hideouts", categoryArt: null },
      { slug: "small-bowls", name: "Bowls & water bottles", categoryArt: null },
      { slug: "small-toys", name: "Toys & exercise wheels", categoryArt: null },
      { slug: "small-grooming", name: "Grooming & care", categoryArt: null },
      { slug: "small-leads", name: "Harnesses & leads", categoryArt: null },
    ],
  },
  {
    slug: "birds",
    name: "Birds",
    description: "Cages, feeders and seed for pet birds, plus what the garden visitors eat.",
    categoryArt: null,
    subs: [
      { slug: "bird-food", name: "Food, seed & treats", categoryArt: null },
      { slug: "bird-cages", name: "Cages, perches & toys", categoryArt: null },
      { slug: "bird-feeders", name: "Feeders, drinkers & nest boxes", categoryArt: null },
    ],
  },
  {
    slug: "aquarium",
    name: "Aquarium",
    description: "Tanks, filtration, gravel and planting for freshwater set-ups.",
    categoryArt: null,
    subs: [
      { slug: "aqua-equipment", name: "Tanks, filters & lighting", categoryArt: null },
      { slug: "aqua-decor", name: "Decoration & substrate", categoryArt: null },
    ],
  },
  {
    slug: "reptiles",
    name: "Reptiles",
    description: "Terrarium decor, heat lamps, substrate and climate gear.",
    categoryArt: null,
    subs: [
      { slug: "rept-terrarium", name: "Habitat, substrate & feeding", categoryArt: null },
      { slug: "rept-climate", name: "Heating, lighting & climate", categoryArt: null },
    ],
  },
  {
    slug: "travel",
    name: "Travel & carriers",
    description: "Carriers, backpacks and transport boxes for the vet, the car and the train.",
    categoryArt: null,
    subs: [
      { slug: "dog-carriers", name: "Dog carriers & bags", categoryArt: null },
      { slug: "cat-carriers", name: "Cat carriers", categoryArt: null },
      { slug: "small-carriers", name: "Small pet, bird & reptile carriers", categoryArt: null },
    ],
  },
];

const DOGS = "Dogs";
const DOG_WALK = "Dogs > Collars, harnesses and leads";
const DOG_CLOTHES = "Dogs > Clothing and accessories";
const DOG_FENCES = "Dogs > Cables, fastening stakes and fences";
const CATS = "Cats";
const CAT_BEDS = "Cats > Beds, blankets and furniture";
const SMALL = "Small animals";
const SMALL_HOMES = "Small animals > Houses and habitats";
const BIRDS = "Birds";
const GARDEN_BIRDS = "Birds and garden animals";
const AQUA = "Aquatics";
const REPTILES = "Reptiles and amphibians";

const route = (to: string, ...paths: string[]): TaxonomyRoute[] => paths.map((path) => ({ path, to }));
const block = (rule: string, ...paths: string[]): TaxonomyExclusion[] => paths.map((path) => ({ path, rule }));

const taxonomyRoutes: TaxonomyRoute[] = [
  ...route("dogs/dog-food", `${DOGS} > Food`),
  ...route("dogs/dog-treats", `${DOGS} > Treats`),
  ...route("dogs/dog-toys", `${DOGS} > Toys`),
  ...route("dogs/dog-beds", `${DOGS} > Beds and furniture`),
  ...route("dogs/dog-bowls", `${DOGS} > Feeding and drinking bowls`),
  ...route("dogs/dog-clothing", DOG_CLOTHES),
  ...route("dogs/dog-grooming", `${DOGS} > Hygiene`),
  ...route("dogs/dog-health", `${DOGS} > Health items`),
  ...route("dogs/dog-cleanup", `${DOGS} > Sand and home cleaning`),
  ...route("dogs/dog-kennels", `${DOGS} > Dog kennels and boxes`, `${DOGS} > Doors, cat flaps and ramps > Doors`, `${DOG_FENCES} > Stakes`, `${DOG_FENCES} > Cabling with carabiners`),

  ...route("dog-walking/collars", `${DOG_WALK} > Collars`, `${DOG_CLOTHES} > Collars and pendants`),
  ...route("dog-walking/harnesses", `${DOG_WALK} > Harnesses`),
  ...route("dog-walking/leads", `${DOG_WALK} > Leads`),
  ...route("dog-walking/id-tags", `${DOG_WALK} > Identification badges`),
  ...route("dog-walking/muzzles", `${DOG_WALK} > Muzzles`),
  ...route("dog-walking/dog-training", `${DOGS} > Training items`, `${DOG_WALK} > Tracker`),

  ...route("cats/cat-food", `${CATS} > Food`),
  ...route("cats/cat-treats", `${CATS} > Treats`),
  ...route("cats/cat-toys", `${CATS} > Toys`),
  ...route("cats/cat-litter", `${CATS} > Sand and home cleaning`),
  ...route("cats/cat-trees", `${CAT_BEDS} > Cat trees`, `${CAT_BEDS} > Scratching posts`, `${CAT_BEDS} > Scratching barrels`, `${CAT_BEDS} > Scratching mats`),
  ...route("cats/cat-beds", CAT_BEDS),
  ...route("cats/cat-bowls", `${CATS} > Feeding and drinking bowls`),
  ...route("cats/cat-flaps", `${CATS} > Cat boxes, nets and pens`, `${DOGS} > Doors, cat flaps and ramps > Cat flaps`),
  ...route("cats/cat-grooming", `${CATS} > Hygiene`),
  ...route("cats/cat-health", `${CATS} > Health items`, `${CATS} > Educational repellents`),
  ...route("cats/cat-collars", `${CATS} > Collars, harnesses and leads`),

  ...route("small-animals/small-food", `${SMALL} > Food`, `${SMALL} > Snacks`, `${SMALL} > Straw and grass`),
  ...route("small-animals/small-cages", `${SMALL_HOMES} > Cages`),
  ...route("small-animals/small-habitat", `${SMALL_HOMES} > Habitat decoration`, `${SMALL_HOMES} > Tubes and tunnels`),
  ...route("small-animals/small-beds", `${SMALL_HOMES} > Beds`),
  ...route("small-animals/small-bowls", `${SMALL} > Feeding and drinking bowls`),
  ...route("small-animals/small-toys", `${SMALL} > Toys`, `${SMALL} > Exercise wheels`),
  ...route("small-animals/small-grooming", `${SMALL} > Hygiene`, `${SMALL} > Healthy items`, `${SMALL} > Odour eliminator and stain remover`),
  ...route("small-animals/small-leads", `${SMALL} > Collars, harnesses and leads`),

  ...route("birds/bird-food", `${BIRDS} > Food`, `${BIRDS} > Snacks`, `${GARDEN_BIRDS} > Birds > Food`),
  ...route("birds/bird-cages", `${BIRDS} > Cages and accessories`, `${BIRDS} > Toys`),
  ...route("birds/bird-feeders", `${BIRDS} > Feeders and water dispensers`, GARDEN_BIRDS),

  ...route(
    "aquarium/aqua-equipment",
    `${AQUA} > Aquariums and fish tanks`, `${AQUA} > Bases for aquariums`, `${AQUA} > Pumps and filters`,
    `${AQUA} > Aquarium lights`, `${AQUA} > Cooling fans`, `${AQUA} > Thermometers`, `${AQUA} > Water treatments`,
    `${AQUA} > Cleaning accessories`, `${AQUA} > Automatic feeders`, `${AQUA} > Food`,
  ),
  ...route("aquarium/aqua-decor", `${AQUA} > Aquarium decoration`, `${AQUA} > Aquarium substrate`),

  ...route(
    "reptiles/rept-terrarium",
    `${REPTILES} > Basic terrarium kits`, `${REPTILES} > Habitat decoration`, `${REPTILES} > Beds, sand and substrate for terrariums`,
    `${REPTILES} > Cleaning`, `${REPTILES} > Filters and pumps`, `${REPTILES} > Food`, `${REPTILES} > Feeders`,
  ),
  ...route(
    "reptiles/rept-climate",
    `${REPTILES} > Thermal lamps for terrariums`, `${REPTILES} > Thermal mats for terrariums`, `${REPTILES} > Habitat lighting`,
    `${REPTILES} > Hygrometers`, `${REPTILES} > Thermometers`, `${REPTILES} > Thermostats`,
    `${REPTILES} > Automatic temperature regulators and control systems`,
  ),
  ...route("travel/dog-carriers", `${DOGS} > Transporters and travel products`),
  ...route("travel/cat-carriers", `${CATS} > Cages, cat boxes and transporters`),
  ...route("travel/small-carriers", `${SMALL} > Transporters`, `${BIRDS} > Transporters`, `${REPTILES} > Transporters`),
];

const taxonomyExclusions: TaxonomyExclusion[] = [
  ...block(
    "medical",
    `${DOGS} > Health items > Medications`, `${DOGS} > Health items > Anti-parasites`, `${DOGS} > Health items > Supplements and vitamins`,
    `${DOGS} > Health items > Digestion solutions`, `${DOGS} > Flea and lice control`,
    `${CATS} > Health items > Supplements and vitamins`, `${CATS} > Control of fleas and lice`,
    `${BIRDS} > Health items`,
  ),
  ...block("welfare", `${DOG_FENCES} > Wireless and radio-controlled fences`, `${DOGS} > Training items > Training collars`),
  ...block("off-niche", `${DOG_CLOTHES} > Fancy dress costumes`, `${GARDEN_BIRDS} > Insect Hotels`),
];

const nameReroutes: NameReroute[] = [
  { startsWith: ["cat flap", "cat door"], to: "cats/cat-flaps" },
  { startsWith: ["cat litter", "litter box", "litter tray"], to: "cats/cat-litter" },
  { startsWith: ["dog kennel", "dog house", "doghouse"], to: "dogs/dog-kennels" },
  { startsWith: ["scratching post", "scratching barrel", "scratcher"], to: "cats/cat-trees" },
];

const medicalKeywords: Matcher[] = [
  "medication", "medications", "medicine", "medicinal", "prescription diet", "prescription food", "veterinary medicine",
  "veterinary diet", "veterinary diets", "vet diet", "urinary s/o", "anallergenic", "hepatic", "gastrointestinal",
  /\brenal\b/i,
  "veterinary drug", "antibiotic", "dewormer", "deworming", "wormer", "vermifuge", "anthelmintic", "vaccine", "insecticide",
  "pesticide", "acaricide", "fipronil", "permethrin", "ivermectin", "antiparasitic", "anti-parasitic", "anti-parasite",
  "spot-on pipette", "syringe", "multivitamin", "multi-vitamin", "multivitamins", "food supplement",
  "dietary supplement", "supplements and vitamins", "sedative", "anaesthetic", "euthanasia",
  /\b\d+\s*(?:tablets|capsules|pills|ampoules)\b/i,
];

const welfareKeywords: Matcher[] = [
  "shock collar", "electric collar", "electric shock", "static correction", "anti-bark collar", "anti bark collar",
  "bark control collar", "invisible fence", "electric fence", "radio-controlled fence", "prong collar", "pinch collar",
  "choke chain", "choke collar", "spiked collar", "glue trap", "rodent trap", "mouse trap", "rat poison", "rodenticide",
  "insect killer", "fly killer", "mosquito killer", "animal trap",
];

const liveAnimalKeywords: Matcher[] = [
  "live animal", "live animals", "live fish", "live insects", "live crickets", "live locusts", "live mealworms",
  "live food", "livestock", "live plants", "live coral", "live rock",
];

const licensedKeywords: Matcher[] = [
  "disney", "pixar", "marvel", "avengers", "spider man", "spiderman", "spider-man", "iron man", "captain america",
  "dc comics", "batman", "superman", "wonder woman", "justice league", "harry potter", "hogwarts", "fantastic beasts",
  "star wars", "mandalorian", "baby yoda", "grogu", "pokemon", "pokémon", "pikachu", "mickey", "minnie",
  "mickey mouse", "minnie mouse", "winnie the pooh", "toy story", "lilo and stitch", "the lion king",
  "disney princess", "disney frozen", "frozen ii", "elsa and anna", "anna and elsa", "hello kitty", "sanrio",
  "peppa pig", "paw patrol", "bluey", "barbie", "lego", "minecraft", "fortnite", "sonic the hedgehog", "super mario",
  "nintendo", "playstation", "xbox", "looney tunes", "bugs bunny", "snoopy", "peanuts", "smurfs", "simpsons",
  "the simpsons", "garfield", "sesame street", "minions", "despicable me", "shrek", "dragon ball", "naruto",
  "one piece", "my little pony", "transformers", "hot wheels", "jurassic", "game of thrones", "lord of the rings",
  "stranger things", "squid game", "coca cola", "coca-cola", "pepsi", "ferrari", "porsche", "lamborghini",
  "real madrid", "fc barcelona", "f.c. barcelona", "barça", "barca", "atletico de madrid", "atlético de madrid",
  "juventus", "manchester united", "manchester city", "liverpool fc", "chelsea fc", "arsenal", "paris saint germain",
  "psg", "bayern", "ac milan", "inter milan", "nba", "nfl", "uefa", "fifa", "licensed product", "official licence",
  "official license", "officially licensed", "gabby's dollhouse", "spidey", "pj masks", "lol surprise", "rainbow high",
  "stitch", "miffy", "bandai", "kuromi", "my melody", "cinnamoroll", "pochacco", "paddington", "beverly hills polo club",
  "polo club", "us polo", "u.s. polo", "scooby doo", "scooby-doo", "tom and jerry", "the grinch", "snoop dogg",
];

const licensedBrandKeywords: Matcher[] = ["frozen", "cerdá", "cerda", "stor", "kids licensing", "warner bros", "sonic"];

const licensedDescriptionKeywords: Matcher[] = [
  "disney", "pixar", "marvel", "harry potter", "hogwarts", "star wars", "pokemon", "pikachu", "hello kitty",
  "peppa pig", "paw patrol", "minecraft", "fortnite", "nintendo", "looney tunes", "warner bros", "dc comics",
  "official licence", "official license", "officially licensed", "licensed product", "under licence", "under license",
];

const regionKeywords: Matcher[] = [
  "russian", "russia", "ru language", "ru only", "cyrillic", "cis", "region locked", "region lock", "region free",
  "belarus", "spanish text", "text in spanish", "spanish language", "spanish only", "portuguese text",
  "text in portuguese", "portuguese language", "french text", "text in french", "french language", "italian text",
  "text in italian", "german text", "text in german", "us plug", "uk plug", "not for sale in",
  /\bregion\s*:\s*\w+/i,
  /\b(?:only|exclusively)\s+(?:for|in)\s+(?:spain|portugal|france|italy|germany|uk|usa)\b/i,
];

const regionDescriptionKeywords: Matcher[] = [
  "region locked", "region lock", "cyrillic", "text in spanish", "message in spanish", "text in portuguese",
  "text in french", "text in italian", "text in german", "us plug", "not for sale in", "russian only",
  "russian language only",
  /\bregion\s*:\s*(?!all\b)\w+/i,
  /\b(?:only|exclusively)\s+(?:for sale\s+)?(?:for|in)\s+(?:spain|portugal|france|italy|germany|the uk|uk|the usa|usa)\b/i,
];

const rules: ExcludeRule[] = [
  { id: "medical", label: "Veterinary medicines and supplements", scopes: ["leaf", "name"], keywords: medicalKeywords },
  { id: "welfare", label: "Aversive training gear and animal traps", scopes: ["leaf", "name"], keywords: welfareKeywords },
  { id: "live-animals", label: "Live animals and plants", scopes: ["leaf", "name"], keywords: liveAnimalKeywords },
  {
    id: "adult",
    label: "Adult content",
    scopes: ["name"],
    keywords: [
      /\badult (?:toys?|products?|games?|content|gifts?|humou?r)\b/i, "adults only", "for adults only", "erotic",
      "erotica", "sex toy", "sexy", "sexual", "lingerie", "fetish", "bdsm", /\bxxx\b/i, "18+", "penis", "boobs",
      "naughty", "kinky", "bachelorette", "hen party", "stag party",
    ],
  },
  {
    id: "weapons",
    label: "Weapons and self-defence",
    scopes: ["name"],
    keywords: [
      "weapon", "weapons", "pistol", "rifle", "airsoft", "crossbow", "ammunition", "pepper spray", "self defence",
      "self defense", "knuckle duster", "brass knuckles", "sword", "katana", "taser", "stun gun", "slingshot",
      "machete", "hunting knife",
    ],
  },
  {
    id: "vapes",
    label: "Vapes, smoking and drug paraphernalia",
    scopes: ["name"],
    keywords: ["vape", "vaping", "e cigarette", "e-cigarette", "shisha", "hookah", "cbd", "cannabis", "tobacco", "cigarette", "cigar", "bong"],
  },
  { id: "licensed", label: "Licensed characters and famous trademarks", scopes: ["name", "brand"], keywords: licensedKeywords },
  { id: "licensed", label: "Licensed characters and famous trademarks", scopes: ["brand"], keywords: licensedBrandKeywords },
  { id: "licensed", label: "Licensed characters and famous trademarks", scopes: ["description"], keywords: licensedDescriptionKeywords },
  { id: "region", label: "Region or language restricted", scopes: ["name"], keywords: regionKeywords },
  { id: "region", label: "Region or language restricted", scopes: ["description"], keywords: regionDescriptionKeywords },
  {
    id: "condition",
    label: "Refurbished, used or outlet stock",
    scopes: ["name"],
    keywords: ["refurbished", "reconditioned", "second hand", "second-hand", "pre owned", "pre-owned", "open box", "outlet stock", "damaged packaging", "grade a", "grade b"],
  },
  {
    id: "off-niche",
    label: "Outside the pet niche",
    scopes: ["name"],
    keywords: [
      "fancy dress", "halloween costume", "carnival costume", "lawn mower", "strimmer", "hedge trimmer", "barbecue",
      "garden hose", "sun lounger", "smartphone", "mobile phone", "laptop", "television", "headphones",
      "power bank", "e-scooter", "motorbike", "number plate",
    ],
  },
];

const ignorePhrases: Matcher[] = [
  /\bshock[- ]?free\b/gi,
  /\b(?:no|without) (?:electric )?shocks?\b/gi,
  /\bvet(?:erinary)?[- ](?:approved|recommended|tested|formulated|developed)\b/gi,
  /\bnot (?:a )?(?:medicine|medication)\b/gi,
  /\bfree (?:from|of) (?:pesticides?|insecticides?|antibiotics?)\b/gi,
];

const PRICE_VAT_PERCENT = STORE_POLICY.tax.pricesIncludeVat ? STORE_POLICY.tax.vatRatePercent : 0;

export const catalogConfig: CatalogConfig = {
  source: {
    isoCode: "en",
    cacheTtlHours: 6,
  },
  storefront,
  taxonomy: {
    root: "Pet products",
    watch: [
      "Dogs", "Cats", "Small animals", "Birds", "Birds and garden animals", "Aquatics",
      "Reptiles and amphibians", "Horses", "Insects",
    ],
    routes: taxonomyRoutes,
    exclude: taxonomyExclusions,
    reroute: nameReroutes,
  },
  exclude: {
    ignorePhrases,
    rules,
  },
  price: {
    sourceCurrency: "EUR",
    sourceToBaseRate: 0.855,
    vatPercent: PRICE_VAT_PERCENT,
    multiplier: 1.15,
    roundToNinetyNine: true,
    minRetail: 3,
    maxRetail: 400,
    minMarginOverWholesale: 1.15,
    anomalyFactor: 8,
    anomalyMinSample: 8,
    anomalyBasis: "subcategory",
  },
  quality: {
    allowedConditions: ["NEW"],
    minImages: 1,
    maxImagesPerProduct: 6,
    skipLogoImages: true,
    minNameLength: 6,
    maxNameLength: 140,
    minDescriptionChars: 60,
    maxVariantsPerName: 3,
    requireInStock: true,
    maxPackUnits: 6,
    maxPackUnitsByPrimary: {
      dogs: 24,
      cats: 24,
      "small-animals": 12,
      birds: 12,
    },
  },
  limits: {
    maxProducts: 7000,
    maxPerPrimary: 2800,
    maxPerSub: 450,
    minPerPrimary: 30,
    minPerSub: 12,
    maxTopLevel: 10,
  },
  images: {
    hosting: "supplier",
    keyPrefix: "wrenpaw/products",
    concurrency: 6,
    timeoutMs: 30000,
    maxBytes: 15 * 1024 * 1024,
    variants: {
      widths: IMAGE_VARIANT_WIDTHS,
      quality: 78,
      effort: 4,
    },
  },
  brands: {
    showcaseLimit: 24,
    minProducts: 3,
  },
};
