export interface NavCategory {
  slug: string;
  name: string;
  short: string;
}

export const NAV_CATEGORIES: NavCategory[] = [
  { slug: "dogs", name: "Dogs", short: "Dogs" },
  { slug: "dog-walking", name: "Dog walking", short: "Walking" },
  { slug: "cats", name: "Cats", short: "Cats" },
  { slug: "small-animals", name: "Small animals", short: "Small animals" },
  { slug: "birds", name: "Birds", short: "Birds" },
  { slug: "aquarium", name: "Aquarium", short: "Aquarium" },
  { slug: "reptiles", name: "Reptiles", short: "Reptiles" },
  { slug: "travel", name: "Travel & carriers", short: "Travel" },
];

export const CORNICE_LINKS = ["dogs", "dog-walking", "cats", "small-animals", "birds", "aquarium"];

export const MEGA_ZONES: { title: string; slugs: string[] }[] = [
  { title: "Dogs", slugs: ["dogs", "dog-walking"] },
  { title: "Cats", slugs: ["cats"] },
  { title: "Small animals & birds", slugs: ["small-animals", "birds"] },
  { title: "Tanks & terrariums", slugs: ["aquarium", "reptiles", "travel"] },
];

export const FURNITURE_ZONES: Record<"lead" | "index" | "animals" | "secondary", string[]> = {
  lead: ["dogs", "dog-walking"],
  index: ["dogs", "dog-walking", "cats", "small-animals", "birds", "aquarium", "reptiles", "travel"],
  animals: ["cats", "small-animals", "birds"],
  secondary: ["aquarium", "reptiles", "travel"],
};

export function navCategory(slug: string): NavCategory | undefined {
  return NAV_CATEGORIES.find((c) => c.slug === slug);
}

export const HELP_LINKS: { href: string; label: string; signedInHref?: string }[] = [
  { href: "/policies/shipping", label: "Delivery" },
  { href: "/policies/returns", label: "Returns & refunds" },
  { href: "/policies/warranty", label: "Warranty" },
  { href: "/policies/payment", label: "Payment" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact us" },
  { href: "/contact?topic=order", signedInHref: "/account/orders", label: "Track an order" },
];

export const POLICY_LINKS = [
  { href: "/policies/terms", label: "Terms & conditions" },
  { href: "/policies/privacy", label: "Privacy policy" },
  { href: "/policies/cookies", label: "Cookie policy" },
  { href: "/policies", label: "All policies" },
];
