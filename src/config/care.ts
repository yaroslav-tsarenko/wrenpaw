export type CareType = "dogs" | "walking" | "cats" | "small-animals" | "birds" | "aquarium" | "reptiles" | "travel";

export interface CareGuide {
  title: string;
  steps: string[];
}

export const CARE_BY_CATEGORY: Record<string, CareType> = {
  dogs: "dogs",
  "dog-walking": "walking",
  cats: "cats",
  "small-animals": "small-animals",
  birds: "birds",
  aquarium: "aquarium",
  reptiles: "reptiles",
  travel: "travel",
};

export const CARE_GUIDES: Record<CareType, CareGuide> = {
  dogs: {
    title: "Using and cleaning dog kit",
    steps: [
      "Check the measurements in the product details against your dog before you buy. Breed names on a label are a guide, not a fit.",
      "Introduce anything new while your dog is calm and unhurried, and keep the first sessions short.",
      "Wash bedding and fabric toys at the temperature shown on the label, and let them dry fully before they go back down.",
      "Replace chew toys once pieces can be bitten off, and bowls once the surface is scratched enough to hold residue.",
    ],
  },
  walking: {
    title: "Collars, harnesses and leads",
    steps: [
      "Measure the neck or chest with a soft tape and compare it with the size range in the product details before choosing a size.",
      "Fit so that two fingers slide flat under the strap. A harness that rides up into the armpit is too loose, not too small.",
      "Check stitching, buckles and clips before each walk, and retire anything with a deformed clip or a frayed strap.",
      "Rinse salt, mud and sand off webbing after use and dry it away from direct heat.",
    ],
  },
  cats: {
    title: "Living with cats",
    steps: [
      "Keep food, water and the litter tray apart. Most cats will not drink next to where they eat.",
      "Scoop the tray daily and wash it out with hot water and unscented detergent when you change the litter.",
      "Put scratching posts where your cat already scratches rather than where it suits the room, or they will be ignored.",
      "Wash fabric beds on a gentle cycle and keep the cat's own scent in the rotation by washing one item at a time.",
    ],
  },
  "small-animals": {
    title: "Cages, hutches and bedding",
    steps: [
      "Spot-clean the soiled corner every day and do a full bedding change weekly, keeping a handful of old nesting material so the smell stays familiar.",
      "Wash the base and accessories with hot water and a rinse-off animal-safe cleaner, then dry everything before refilling.",
      "Check water bottles every day. Ball valves stick, and a stuck bottle looks full.",
      "Keep wooden chews and tunnels dry, and replace them once they are chewed through or soiled.",
    ],
  },
  birds: {
    title: "Cages, perches and feeders",
    steps: [
      "Change the water daily and wash the drinker properly. Seed husks and droppings in water are the usual cause of illness.",
      "Clean the cage tray every day and scrub perches weekly, giving wooden perches time to dry completely.",
      "Offer perches of different diameters so feet are not held in one position all day.",
      "Store seed sealed, cool and dry, and check it for mould or insects before refilling.",
    ],
  },
  aquarium: {
    title: "Tanks, filters and water",
    steps: [
      "Let a new tank cycle before adding fish, and add livestock a few at a time.",
      "Change part of the water on a regular schedule rather than emptying the tank. Treat tap water for chlorine first.",
      "Rinse filter media in water taken out of the tank, never under the tap, so the bacteria in it survive.",
      "Keep the heater and light on a timer and check the temperature with a separate thermometer.",
    ],
  },
  reptiles: {
    title: "Terrariums, heating and lighting",
    steps: [
      "Check the temperature gradient at both ends of the terrarium with thermometers, not by the controller's own reading.",
      "Keep every heat source on a thermostat and out of direct contact with the animal.",
      "Replace UVB lamps on the schedule in the product details. Output falls long before the lamp stops lighting.",
      "Spot-clean substrate daily and replace it fully on the interval the species needs.",
    ],
  },
  travel: {
    title: "Carriers and travelling",
    steps: [
      "Leave the carrier open at home with bedding inside for a few days before the first journey.",
      "Check the internal measurements in the product details against your animal standing and turning, and check your airline's own limits before flying.",
      "Secure the carrier in the car so it cannot slide, and never put it in the boot of a hatchback without ventilation.",
      "Wipe the carrier out and air it after each trip, and wash removable liners.",
    ],
  },
};

export interface MaterialCare {
  id: string;
  match: RegExp;
  nameOnly?: boolean;
  title: string;
  steps: string[];
}

export const MATERIAL_CARE: MaterialCare[] = [
  {
    id: "stainless-steel",
    match: /\bstainless[\s-]steel\b|\binox\b/i,
    title: "Stainless steel",
    steps: [
      "Wash in hot soapy water and dry straight away to avoid water marks.",
      "Stainless bowls are the easiest surface to keep hygienic, which is why they suit dogs that eat fast and messily.",
    ],
  },
  {
    id: "ceramic",
    match: /\bceramic\b|\bstoneware\b|\bporcelain\b/i,
    title: "Ceramic",
    steps: [
      "Check for chips and hairline cracks each time you wash it. A cracked glaze holds bacteria and should be retired.",
      "Avoid sudden temperature changes, and do not use a ceramic bowl that has been dropped even if it looks intact.",
    ],
  },
  {
    id: "nylon-webbing",
    match: /\bnylon\b|\bwebbing\b|\bpolyester\b/i,
    title: "Webbing and nylon",
    steps: [
      "Hand wash in warm water with mild detergent and air dry. A tumble dryer weakens the weave and the stitching.",
      "Check the stitched loops at both ends and the clip before each use.",
    ],
  },
  {
    id: "leather",
    match: /\bleather\b/i,
    title: "Leather",
    steps: [
      "Wipe clean and let it dry at room temperature, away from radiators.",
      "Feed with a leather conditioner now and then so it stays supple, and keep it out of prolonged wet.",
    ],
  },
  {
    id: "wood",
    match: /\b(?:wood|wooden|pine|birch|bamboo|willow)\b/i,
    nameOnly: true,
    title: "Wood",
    steps: [
      "Keep it dry. Wooden hides, perches and tunnels soak up urine and should be replaced rather than scrubbed once they do.",
      "Brush off debris and let it dry fully in the air after any wet clean.",
    ],
  },
  {
    id: "plush",
    match: /\bplush\b|\bfleece\b|\bcotton\b|\bcushion\b/i,
    title: "Plush and fabric",
    steps: [
      "Wash at the temperature on the label and air dry. Check seams and squeakers afterwards.",
      "Retire a plush toy once the stuffing is exposed. Loose filling is a swallowing risk.",
    ],
  },
  {
    id: "glass-tank",
    match: /\bglass\b|\bacrylic\b/i,
    title: "Glass and acrylic",
    steps: [
      "Clean with an algae pad kept only for the tank, never with household cleaners.",
      "Acrylic scratches far more easily than glass, so use a soft pad and no grit.",
    ],
  },
];

const MATERIAL_TYPES: CareType[] = ["dogs", "walking", "cats", "small-animals", "birds", "aquarium", "reptiles", "travel"];

export function careFor(rootCategorySlug: string | null | undefined, name: string, details: string): { guide: CareGuide | null; materials: MaterialCare[] } {
  const type = rootCategorySlug ? CARE_BY_CATEGORY[rootCategorySlug] : undefined;
  if (!type) return { guide: null, materials: [] };
  const found = MATERIAL_TYPES.includes(type) ? MATERIAL_CARE.filter((m) => m.match.test(m.nameOnly ? name : `${name} ${details}`)) : [];
  return { guide: CARE_GUIDES[type], materials: found.slice(0, 2) };
}

export interface KeepingNote {
  title: string;
  body: string;
  linkLabel: string;
  href: string;
}

export const KEEPING_NOTES: KeepingNote[] = [
  {
    title: "Measure before you order a harness",
    body: "A harness is sized by chest girth, not by breed or by weight. Run a soft tape around the deepest part of the chest just behind the front legs, keep it snug, and read the number against the size range in the product details. Two sizes overlap on most ranges, and the smaller one is usually the better fit.",
    linkLabel: "Harnesses",
    href: "/catalog/harnesses",
  },
  {
    title: "Food, water and litter belong apart",
    body: "Cats avoid drinking where they eat and will not reliably use a tray within sight of either. Three separate places, each with an exit route, solves more litter-tray problems than any change of litter.",
    linkLabel: "Litter trays & litter",
    href: "/catalog/cat-litter",
  },
  {
    title: "Rinse filter media in tank water",
    body: "Filter sponges hold the bacteria that keep a tank stable. Rinsing them under the tap kills that colony with chlorine and restarts the cycle. Squeeze them out in a bucket of water you have just taken from the tank instead.",
    linkLabel: "Tanks, filters & lighting",
    href: "/catalog/aqua-equipment",
  },
  {
    title: "UVB stops working before the lamp does",
    body: "A reptile UVB lamp carries on giving visible light long after its ultraviolet output has fallen too low to be useful. Note the fitting date and replace it on the interval the manufacturer states, whether or not it still lights.",
    linkLabel: "Heating, lighting & climate",
    href: "/catalog/rept-climate",
  },
];
