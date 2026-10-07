export const BRAND = {
  name: "Wrenpaw",
  domain: "wrenpaw.com",
  tagline: "Pet supplies for the whole household",
} as const;

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || `https://${BRAND.domain}`).replace(/\/+$/, "");
