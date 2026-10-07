# Wrenpaw — Design Brief: "Hedgerow Press"

Decision record and implementation spec for wrenpaw.com. Replaces the Brasmora brief ("The Dresser"), which is void: no bevels, no shelf rules, no brass plates, no chalk-and-chocolate palette, no Gloock/Commissioner, no furniture metaphor, no `glaze` WebGL scene. `.claude/knowledge/DESIGN-MASTER.md` and `CHECKLIST-QC.md` still govern; where this brief is more specific, follow this brief.

Scope: storefront (`src/app/(store)/**`, `src/components/**` except `admin`, `src/styles/*`, `src/app/layout.tsx`, `src/app/fonts.css`, brand assets in `public/`). Admin is restyled by tokens only — it is isolated on `--admin-*`.

House rules: no comments in code; tokens only, never a hex in a component; reuse the existing utilities (`PriceDisplay`, `QuantitySelector`, `Breadcrumbs`, `EmptyState`, `ConfirmDialog`, `Tabs`, `Accordion`, `Pagination`, `homepage-products.ts`) and restyle them rather than writing parallel ones; real typographic characters, never an HTML entity straight after a JSX expression.

---

## 1. Concept

**Hedgerow Press.** Wrenpaw reads like a well-printed natural-history periodical that happens to sell things — a quarterly about living with animals, typeset on warm oat paper with ink-black type, hairline rules and one hot russet accent borrowed from a wren's breast. Photography is given room and set on a bright plate with a caption beneath it, the way a plate is captioned in print. Nothing floats in a rounded box: structure comes from rules, baseline alignment, oversized index numerals and genuine standfirsts. The visitor should feel they are reading something made by people who keep animals, and should be able to find and buy the right lead, tray or bag of food in three clicks.

**Why it suits pet retail.** A pet-supply catalogue is 5,996 supplier packshots with uneven names and uneven descriptions — the one thing it cannot survive is a uniform card grid, where every inconsistency lines up and shows. Editorial layout turns that unevenness into an asset: a lead item gets a full plate and a standfirst, a hundred others get a ruled one-line entry with a count, and the eye reads hierarchy instead of noise. It is also the right register commercially. Pet owners buy on trust and on specifics ("will this harness fit a 38 cm chest"), not on cuteness; a periodical voice can be warm about animals while staying precise about sizes, and it keeps the store adult, which matters when an acquiring bank reads the site.

**Signature motifs** (three, repeated with discipline, derived from the product itself):

1. **The ruled label.** A 1px rule running the full measure with a wide-tracked uppercase label sitting *on* it, inset from the left, the rule broken around the label. This is the section marker, the filter group header, the table caption and the footer column head. One device, eight jobs.
2. **The index numeral.** Oversized `01`–`07` in Piazzolla at low opacity, hung in the left margin of each homepage section and each checkout step. It makes the page read as an issue with a contents order, and it is the cheapest possible hierarchy.
3. **The track.** One square-block geometry doing two jobs. As the brand **mark** it is a paw set in printer's blocks: four square toes in an arc over a sharp trapezoidal pad, with the printed rule beneath it. As the **trail** (`Trail` in `BrandMark.tsx`) it is four squares stepping diagonally — the same blocks read as a track being laid — and it serves as the list bullet, the empty-plate mark, the loading indicator, the 404 dingbat and the order-confirmation stamp. It is the only ornamental shape in the system, and every instance marks a position rather than decorating one.

**Motion philosophy: calm press.** 200 ms for state, 280 ms for panels, 700 ms for scroll reveals, easing `cubic-bezier(0.2, 0.75, 0.25, 1)` — paper settling, not springs. One signature moment: the hero's **drawn underline**, an SVG stroke under one word of the headline that draws itself left to right on first paint. No WebGL, no canvas, no 3D.

**Divergence audit against the siblings.** The Dresser: chalk/chocolate/brass, Gloock + Commissioner, chamfered bevels, shelf rules, physical disclosure — none retained. Forest & Stone: warm stone, forest green, copper, Bricolage + Karla — our canvas is yellower, the accent is a flat red-orange not a metallic, and no face is shared. Against the rest of the portfolio (Inspection Bay, Salon Hang, Vault Run, Paper Theatre, Departure Board, Drop District, Blueprint Works, Chipwave, Aurora Signal, Console Deck) this is the only direction with: a paper masthead header (not a painted bar), serif display at 1.25 scale, a mono price voice, a ruled-table catalogue index instead of a card deck, and an ink colophon footer.

---

## 2. Colour tokens

Single source: `src/styles/variables.css`. `src/styles/globals.css` maps them to utilities in `@theme inline`. `tailwind.config.ts` mirrors the aliases for tooling; `@theme` is authoritative. `ThemeProvider` keeps setting `data-theme` + the `dark` class; dark values hang off `[data-theme="dark"]`.

Every existing alias name is kept so nothing stops compiling — only the values and the meanings change.

| Variable | Utility | Job | Light | Dark |
|---|---|---|---|---|
| `--color-bg` | `bg-surface` | oat paper, the page | `#F4EFE4` | `#161411` |
| `--color-bg-secondary` | `bg-surface-1` | alternating band, disabled field | `#EAE3D4` | `#1E1B17` |
| `--color-bg-tertiary` | `bg-surface-2` | inset, skeleton, empty plate | `#DED5C2` | `#100E0C` |
| `--color-bg-warm` | `bg-surface-warm` | accent wash (note boxes, reduced strip) | `#F2E3DA` | `#33231B` |
| `--color-raised` | `bg-raised` | inputs, panels, modals, menu | `#FBF9F4` | `#232019` |
| `--color-stage` | `bg-stage` | the photographic plate | `#FFFFFF` | `#EFE9DD` |
| `--color-on-stage` | `text-on-stage` | type and icons on the plate | `#211B1C` | `#201C16` |
| `--color-text` | `text-ink` | ink | `#211B1C` | `#F2EDE1` |
| `--color-text-secondary` | `text-ink-muted` | standfirst, caption | `#554C48` | `#B6ACA0` |
| `--color-text-tertiary` | `text-ink-subtle` | folio, counts, meta | `#6B615B` | `#938A80` |
| `--color-accent` | `bg-brand` `text-brand` `border-brand` | **ink**: every primary action | `#211B1C` | `#F2EDE1` |
| `--color-accent-hover` | `bg-brand-hover` | ink pressed | `#000000` | `#FFFFFF` |
| `--color-accent-light` | `bg-brand-soft` | quiet hover fill | `#EAE3D4` | `#2B2721` |
| `--color-on-accent` | `text-on-brand` | type on the ink fill | `#F4EFE4` | `#161411` |
| `--color-accent-2` | `bg-brand-2` `text-brand-2` | **russet**: the one accent | `#A33B12` | `#E8733F` |
| `--color-accent-2-hover` | `bg-brand-2-hover` | russet pressed | `#8A2F0C` | `#F18A5B` |
| `--color-on-accent-2` | `text-on-brand-2` | type on russet | `#FFF8F2` | `#1A120D` |
| `--color-accent-3` | `text-sale` `bg-sale` | reduced price ink (= russet) | `#A33B12` | `#E8733F` |
| `--color-paint` | `bg-paint` | the ink panel: colophon, cookie bar, newsletter | `#211B1C` | `#0F0D0B` |
| `--color-plinth` | `bg-plinth` | footer base (= paint) | `#211B1C` | `#0F0D0B` |
| `--color-on-paint` | `text-on-paint` | type on the ink panel | `#F4EFE4` | `#F2EDE1` |
| `--color-on-paint-muted` | `text-on-paint-muted` | secondary type on ink | `#BDB2A4` | `#B6ACA0` |
| `--color-on-paint-line` | `border-on-paint-line` | hairline on ink | `rgba(244,239,228,.18)` | `rgba(242,237,225,.16)` |
| `--color-accent-on-paint` | `text-brand-on-paint` | russet on the ink panel | `#E8733F` | `#E8733F` |
| `--color-rule` | `bg-rule` `border-rule` | the structural 1px rule (ink at 100%) | `#211B1C` | `#F2EDE1` |
| `--color-border` | `border-line` | decorative hairline | `#D8CFBE` | `#332E26` |
| `--color-border-hover` | `border-line-hover` | hairline, hovered | `#B5A992` | `#4D463A` |
| `--color-border-control` | `border-control` | input / checkbox / select edge | `#8A8070` | `#7A7164` |
| `--color-focus` | `outline-focus` | focus ring (russet, both themes) | `#A33B12` | `#E8733F` |
| `--color-focus-on-paint` | — | focus ring on ink | `#E8733F` | `#E8733F` |
| `--color-success` / `-tint` | `text-success` `bg-success-tint` | in stock, paid | `#2C6B4F` / `#DFEDE4` | `#79BE95` / `#1B2A22` |
| `--color-warning` / `-tint` | | low stock, pending | `#8A5207` / `#F7E9D4` | `#E0A95F` / `#2E2316` |
| `--color-danger` / `-tint` / `--color-on-danger` | | errors, cancelled | `#A32218` / `#F8E2E0` / `#FFF8F2` | `#F0897E` / `#331D1B` / `#1A120D` |
| `--color-info` / `-tint` | | shipped, neutral notes | `#44555E` / `#E3E9EC` / | `#9FB0B8` / `#1E2529` |
| `--color-scrim` | `bg-scrim` | dialog backdrop | `rgba(33,27,28,.52)` | `rgba(5,4,3,.70)` |

Removed entirely: `--color-brass*`, `--color-shelf*`, `--bevel-*`, `--shelf-*`, `--promo-bg-*`, `--gradient-*`, `--shadow-contact`, and the `.bevel*` / `.shelf-rule*` / `.contact-shadow` component classes.

### 2.1 Measured contrast (sRGB relative luminance, WCAG 2.1 formula)

Light theme:

| Pair | Ratio | Needs | |
|---|---|---|---|
| ink `#211B1C` on paper `#F4EFE4` | **14.79** | 4.5 | ok |
| ink on band `#EAE3D4` | **13.27** | 4.5 | ok |
| ink on inset `#DED5C2` | **11.63** | 4.5 | ok |
| ink on raised `#FBF9F4` | **16.12** | 4.5 | ok |
| ink on stage `#FFFFFF` | **16.96** | 4.5 | ok |
| ink-muted `#554C48` on paper | **7.29** | 4.5 | ok |
| ink-muted on band | **6.54** | 4.5 | ok |
| ink-subtle `#6B615B` on paper | **5.25** | 4.5 | ok |
| ink-subtle on band | **4.71** | 4.5 | ok |
| russet `#A33B12` on paper | **5.74** | 4.5 | ok |
| russet on band | **5.15** | 4.5 | ok |
| russet on raised | **6.25** | 4.5 | ok |
| russet on accent-wash `#F2E3DA` | **5.26** | 4.5 | ok |
| on-brand `#F4EFE4` on ink fill | **14.79** | 4.5 | ok |
| on-accent-2 `#FFF8F2` on russet | **6.25** | 4.5 | ok |
| on-accent-2 on russet-hover `#8A2F0C` | **8.01** | 4.5 | ok |
| success `#2C6B4F` on paper | **5.51** | 4.5 | ok |
| warning `#8A5207` on paper | **5.57** | 4.5 | ok |
| danger `#A32218` on paper | **6.54** | 4.5 | ok |
| info `#44555E` on paper | **6.77** | 4.5 | ok |
| on-paint `#F4EFE4` on ink panel | **14.79** | 4.5 | ok |
| on-paint-muted `#BDB2A4` on ink panel | **8.13** | 4.5 | ok |
| russet-on-paint `#E8733F` on ink panel | **5.62** | 4.5 | ok |
| control `#8A8070` on paper | **3.39** | 3 (1.4.11) | ok |
| control on raised | **3.69** | 3 | ok |

Dark theme:

| Pair | Ratio | Needs | |
|---|---|---|---|
| ink `#F2EDE1` on paper `#161411` | **15.74** | 4.5 | ok |
| ink on band `#1E1B17` | **14.68** | 4.5 | ok |
| ink on inset `#100E0C` | **16.49** | 4.5 | ok |
| ink on raised `#232019` | **13.91** | 4.5 | ok |
| on-stage `#201C16` on stage `#EFE9DD` | **15.7** | 4.5 | ok |
| ink-muted `#B6ACA0` on paper | **8.23** | 4.5 | ok |
| ink-muted on raised | **7.27** | 4.5 | ok |
| ink-subtle `#938A80` on paper | **5.42** | 4.5 | ok |
| ink-subtle on band | **5.05** | 4.5 | ok |
| russet `#E8733F` on paper | **6.09** | 4.5 | ok |
| russet on band | **5.68** | 4.5 | ok |
| russet on raised | **5.38** | 4.5 | ok |
| russet on accent-wash `#33231B` | **4.98** | 4.5 | ok |
| on-brand `#161411` on ink fill `#F2EDE1` | **15.74** | 4.5 | ok |
| on-accent-2 `#1A120D` on russet | **6.12** | 4.5 | ok |
| success `#79BE95` on paper | **8.42** | 4.5 | ok |
| warning `#E0A95F` on paper | **8.76** | 4.5 | ok |
| danger `#F0897E` on paper | **7.52** | 4.5 | ok |
| info `#9FB0B8` on paper | **8.21** | 4.5 | ok |
| on-paint on ink panel `#0F0D0B` | **16.60** | 4.5 | ok |
| on-paint-muted on ink panel | **8.68** | 4.5 | ok |
| russet-on-paint on ink panel | **6.42** | 4.5 | ok |
| control `#7A7164` on paper | **3.83** | 3 | ok |
| control on raised | **3.38** | 3 | ok |

`--color-border` (1.35:1 light, 1.37:1 dark) and `--color-border-hover` (2.36:1 / 1.97:1) are **decorative** hairlines only — they separate content, never define the boundary of a control and never carry state. Every control boundary and every state indicator uses `--color-border-control` (≥3.38:1 in both themes) or `--color-rule`. Focus rings use `--color-focus` at 2px with a 2px offset; russet on paper is 5.74:1 and on ink 5.62:1, both over the 3:1 required by 1.4.11.

---

## 3. Typography

Three faces, paired by contrast, none used by any sibling store. Verified present on npm:

| Role | Package (verified `npm view`) | Family | Why |
|---|---|---|---|
| Display | `@fontsource-variable/piazzolla@5.3.0` | Piazzolla Variable, wght 100–900 | A contemporary text serif with real teeth: flat-sided bowls, sharp asymmetric serifs and a tall x-height. It stays handsome at 5 rem (headlines) and readable at 1.2 rem (standfirsts), which is exactly what a periodical needs from one face. Nothing like Gloock's fat didone or Fraunces' wobble. |
| Text | `@fontsource-variable/schibsted-grotesk@5.3.0` | Schibsted Grotesk Variable, wght 100–900 + italic | A newsroom grotesk — slightly condensed, open apertures, single-storey `g`, drawn for UI and for dense body at small sizes. Calm enough to carry 160-character supplier descriptions without fighting the serif. |
| Data | `@fontsource-variable/spline-sans-mono@5.3.0` | Spline Sans Mono Variable, wght 300–700 | The price, stock, size suffix, order number, dimensions and count voice. Humanist mono with slab-ish terminals — warm rather than technical, so money does not read as a terminal readout. |

Loading: the latin and latin-ext `wght` `.woff2` files are copied into `public/fonts/` and declared by hand in `src/app/fonts.css` with the upstream `unicode-range` values (the project's existing pattern for Gloock, extended to all three). `font-display: swap`, metric-matched fallback faces (`Piazzolla Fallback` → Georgia, `Schibsted Fallback` → Arial/Liberation Sans, `Spline Mono Fallback` → DejaVu Sans Mono) with `size-adjust` / `ascent-override` so swap does not shift layout. `src/app/layout.tsx` preloads only `piazzolla-latin-wght-normal.woff2` and `schibsted-grotesk-latin-wght-normal.woff2` — the two faces above the fold.

`--font-display: "Piazzolla Variable"`, `--font-sans: "Schibsted Grotesk Variable"`, `--font-mono: "Spline Sans Mono Variable"`.

### 3.1 Scale — ratio 1.25 (major third), base 16px, fluid

Names kept so existing markup compiles. Tightened tracking rises with size, which is what makes big serif type look set rather than scaled.

| Token | Value | Use | Face / tracking |
|---|---|---|---|
| `--text-step--1` | `0.8125rem` | folio, caption, legal | sans, `0.005em` |
| `--text-step-0` | `1rem` | body | sans, `0` |
| `--text-step-1` | `clamp(1.125rem, 1.06rem + .3vw, 1.25rem)` | standfirst, list lead | sans or display |
| `--text-step-2` | `clamp(1.3rem, 1.17rem + .6vw, 1.5625rem)` | h3, row title | display, `-0.01em` |
| `--text-step-3` | `clamp(1.55rem, 1.3rem + 1.1vw, 1.953rem)` | h2 | display, `-0.015em` |
| `--text-step-4` | `clamp(1.9rem, 1.4rem + 2.2vw, 2.441rem)` | section opener | display, `-0.02em` |
| `--text-step-5` | `clamp(2.3rem, 1.4rem + 3.8vw, 3.052rem)` | page h1 | display, `-0.022em` |
| `--text-step-6` | `clamp(2.8rem, 1.2rem + 6.4vw, 3.815rem)` | homepage h1 | display, `-0.025em` |
| `--text-display-xl` | `clamp(4.5rem, 2rem + 13vw, 11rem)` | index numerals, 404 | display, `-0.03em` |
| `--text-ui-md` / `-sm` / `-xs` | `0.9375` / `0.875` / `0.8125rem` | controls, chips, meta | sans |

Body line-height 1.6, standfirst 1.45, display 1.06–1.14. Reading measure 68ch (`measure`), standfirst 42ch. The eyebrow utility (`eyebrow`) is sans 600 / 0.75rem / `0.14em` / uppercase — it is the label half of the **ruled label** motif. Mono numerals are `tabular`.

Base rules in `globals.css`: `h1–h6` get `font-family: var(--font-display)`, `font-weight: 500`, `font-synthesis: none`, `text-wrap: balance`; `p` gets `text-wrap: pretty`; `body` is sans 400 / 1.6.

---

## 4. Space, geometry, rules, elevation

**Spacing.** 4px base, Tailwind's default scale. Section rhythm is deliberately uneven — this is the main anti-template lever:

| Section role | Mobile | Desktop |
|---|---|---|
| Masthead opener | `pt-6 pb-14` | `pt-10 pb-20` |
| Index (ruled list) | `py-14` | `py-24` |
| Lead feature | `py-16` | `pt-28 pb-24` |
| Reduced band (full-bleed ink) | `py-12` | `py-16` |
| By animal | `py-14` | `py-20` |
| New in (dense) | `py-10` | `py-14` |
| Notes | `py-14` | `py-24` |
| Colophon | `pt-12` | `pt-16` |

No two adjacent sections share a padding value.

**Layout.** `--max-width: 1280px` (`max-w-container`), `--container-narrow: 1080px`, `--container-read: 680px`, `--container-wide: 1440px`. The grid is 12 columns with a 32px gutter at `lg`. Standard editorial splits: `7/5` (masthead), `8/4` (section opener + aside), `5/7` (lead feature reversed), `4/4/4` only where three things are genuinely equal — which on this site is nowhere on the homepage.

**Radius — mixed, by material, never uniform.**

| Token | Value | Applies to |
|---|---|---|
| `--radius-sm` | `0` | buttons, inputs, selects, chips, tabs, badges, pagination — everything structural is square |
| `--radius-md` | `2px` | the photographic plate, gallery thumbs, the category thumbnail |
| `--radius-lg` | `2px` | modals, drawers, the colophon panel |
| `--radius-xl` / `-2xl` / `-3xl` / `-4xl` | `2px` | legacy aliases, pinned to the plate radius |
| `--radius-pill` | `0` | **the pill is abolished**; every `rounded-pill` reads square |

So: paper and ink are cut square; only the photographic plate has the 2px softening of a printed tip-in. That is the whole radius language.

**Rules (borders).** Three weights, and only three:
- `1px solid var(--color-border)` — decorative separation inside a block (table rows, list items).
- `1px solid var(--color-rule)` — the structural rule: section openers, the masthead underline, the footer top. Full ink, so it reads as a printed rule.
- `2px solid var(--color-rule)` — used once per page maximum, under the page `h1`.

**Elevation.** Essentially flat. `--shadow-sm` / `-md` / `-card` / `-card-hover`: `none`. Panels that overlay content get a hairline plus a long, very soft shadow (`--shadow-lg`, `--shadow-panel`) so the paper edge is visible without a glow. No `shadow-accent` glow; focus is an outline.

**Z-index** unchanged: sticky 40, dropdown 50, drawer 60, modal 70, toast 80, cookie 90.

---

## 5. Icons

**Lucide** (`lucide-react`, already a dependency), stroke width 1.5, 18px in controls, 20px in the header, 16px in meta. Never in a circle, never decorative.

| Job | Glyph | Note |
|---|---|---|
| **Cart** | `ShoppingBasket` | Deliberately *not* `Handbag` (The Dresser) or `ShoppingCart` (the default). A basket is what you carry round a feed store, and the glyph's open weave reads at 20px. |
| Search | `Search` | |
| Account | `UserRound` | |
| Saved | `Bookmark` / filled when saved | *Not* `Heart` — a bookmark matches the periodical metaphor and avoids the "cute pet shop" register. |
| Menu / close | `Menu` / `X` | |
| Filters | `SlidersHorizontal` | |
| Sort | `ArrowUpDown` | |
| Next / prev | `ArrowRight` / `ArrowLeft` | Arrows, never chevrons, for navigation; `ChevronDown` is reserved for disclosure. |
| Disclosure | `ChevronDown` | accordions, selects, the category menu |
| Quantity | `Minus` / `Plus` | |
| No photo | `ImageOff` | the deliberate empty plate |
| In stock / warning / error | `Check` / `TriangleAlert` / `CircleAlert` | |
| Delivery | `Truck` | |
| Returns | `RotateCcw` | |
| Warranty | `ShieldCheck` | |
| Copy / download | `Copy` / `Download` | |

The **trail** (four squares) is not a Lucide glyph; it is a 12-line inline SVG component `Trail` in `src/components/layout/BrandMark.tsx`, used for the cart badge wrap, list bullets, the loader, and the end-of-policy dingbat.

---

## 6. Logo and favicon

**Wordmark.** "Wrenpaw" set live in Piazzolla Variable at weight 500, tracking `-0.02em`, with "paw" at the same weight but with the `--color-accent-2` russet applied to the final `w` only — a single coloured letter is enough identity and survives at 80px wide. Set as text, not a traced path, so it is crisp at any size and recolours with the theme. The accessible name comes from the link's `aria-label`; the wordmark itself is `aria-hidden` when it sits beside one.

**Mark (the paw).** A square ink tile, 512×512, cut perfectly sharp. Inside, a paw built only from printer's blocks: four russet squares as toes in a shallow arc (56px outer, 66px inner) above a sharp trapezoid pad (`198,266 314,266 338,384 174,384`). Beneath them one full-width russet rule at 1/8 height — the printed rule, so the mark carries both the animal and the press. It survives to 16px, where the favicon drops to three toes and the pad. It is geometric, not illustrative, so it never reads as clip art.

**Files.** `public/logo.svg` (ink wordmark + mark, light), `public/logo-dark.svg` (paper on transparent), `public/logo-on-paint.svg` (paper wordmark, russet mark, for the ink panel), `public/favicon.svg` (mark only), plus `src/app/icon.svg` (theme-aware), `favicon.ico`, `favicon-16/32`, `apple-touch-icon` (180), `android-chrome-192/512` generated by `scripts/gen-favicons.mjs` (rewritten around the paw geometry, with hand-tuned 32px and 16px variants rasterised by sharp). `public/manifest.json` theme colour `#211B1C`, background `#F4EFE4`.

---

## 7. Homepage sections

Seven numbered sections plus a colophon. No hero→three-cards→testimonials skeleton anywhere; no two sections share a shape, a density or a background.

| # | Section | Shape | Data |
|---|---|---|---|
| `01` | **Masthead** | 7/5 asymmetric split. Left: eyebrow with the live product count, an `h1` at `--text-step-6` with a **drawn russet underline** under the last word, a 42ch standfirst, two links (shop all / the biggest category), then a ruled contents strip of the eight categories with mono counts, set in the same column so the two columns balance. Right: one tall plate (`4/5`) of the lead product with a ruled caption beneath (category, name, size, price). | `getHomeData().masthead` |
| `02` | **The index** | A ruled table of all eight categories — *not* a grid. The two largest get a tall row: index numeral, name at step-3, description, mono count, and three small plates of real products. The remaining six get a compact one-line ruled row: numeral, name, count, arrow. Different importance, different treatment. | categories + counts |
| `03` | **Lead feature** | 6/5 split with the plate (`3/2`) bleeding to the viewport edge at `lg`. Right: ruled label, name at step-3, the `shortDescription` as a standfirst when `productStandfirst` accepts it (omitted when null or when it is a supplier spec dump), a mono spec table (section, availability, size), price, add to basket. Beneath, two `row`-density ruled entries for the runners-up. | order-ranked, else featured, else newest |
| `04` | **Reduced** | Full-bleed **ink band**. Four reduced items as a horizontal ruled strip: the discount percentage set at step-4 in mono russet, then the plate, then name and price. Density and colour both change here — the only inverted section above the footer. | `getSaleProducts` |
| `05` | **By animal** | Three unequal columns at `lg` (`6/3/3`): one large card-free block with a `3/2` plate, the category description and up to six ruled subcategory links; two medium blocks with a square plate and three links each. | cats / small animals / birds |
| `06` | **New in** | Dense six-up strip of compact entries separated by hairlines, smaller type, mono arrival dates. Renders only at ≥4 items. | `getNewProducts` |
| `07` | **Notes on keeping animals** | 4/7 split. Left: the section opener with the index numeral and the trail. Right: four notes from `KEEPING_NOTES` in `src/config/care.ts`, the first given pull-quote treatment (step-2 display, 2px russet rule to its left). Each links to a real category or subcategory. | `care.ts` |
| — | **Colophon** | A full-width ink panel above the footer: the wordmark at step-5, a ruled mono table of the three policy facts that matter (free-delivery threshold, withdrawal days, warranty months — all from `store-policy.ts`), and the newsletter field. | `POLICY_FACTS` |

"Pull quotes used only where there is real content to quote": the only pull quote on the site is in `07`, and it quotes a care note the store itself wrote. There are no testimonials, no star ratings on the homepage, no partner logos, no counters.

---

## 8. Card anatomy — `ProductEntry`

One component, four densities, replacing `ShelfTile`. All of them share the **plate**: a `bg-stage` box at a fixed aspect ratio with `--radius-md`, the image `object-contain` with 8% padding, and a **caption rule** beneath it (1px `--color-border`) that carries the meta. Nothing is a card: there is no surrounding box, no shadow, no border around the text.

| Density | Plate | Name | Meta | Actions |
|---|---|---|---|---|
| `lead` | `4/5`, full column | display step-3 | standfirst + mono spec rows | full-width primary button |
| `entry` (default, grids) | `1/1` | sans step-0 500, 2-line clamp | mono price, mono size suffix | icon button on touch, text button on hover-reveal |
| `row` (index, reduced, new-in) | `1/1` at 96px | sans ui-md 500, 1-line clamp | mono price inline | whole row is the link |
| `mini` (cart, toast, search) | `1/1` at 64px | sans ui-sm | mono price | — |

**Graceful single-image path** (1,315 products have exactly one image). The plate never promises a second photo. `entry` and `lead` cross-fade to `images[1]` on hover *only when it exists*; with one image the hover treatment is instead a 1.5% scale-up of the same photo plus a russet caption rule — a different, equally deliberate response, so a packshot-only product does not look broken. The `lead` density shows thumbnails only at `images.length > 1`.

**The deliberate empty plate.** Images are served from the supplier CDN and 504 in the sandbox, so the placeholder is a first-class state, not a fallback: `bg-surface-2`, the **trail** mark centred at 20% opacity, and the caption `No photograph yet` in mono ui-xs. It uses the brand's own motif, so a page full of placeholders still reads as Wrenpaw.

**Flags.** At most one per entry, set as a mono uppercase label on the caption rule, never a floating badge: `−NN%` in russet (reduced), `New` in ink, `Sold out` in ink-subtle with the price struck. Category is *not* a flag — it is the caption's first field.

**Description extremes.** `entry` shows no description at all. `lead` shows `shortDescription` clamped to 2 lines and nothing if it is null. The PDP clamps the long form (aquarium tanks run past 1,000 characters) inside a `measure` column with a tab, so a 60-character toy description and a spec dump both sit correctly.

---

## 9. PDP anatomy

Three bands, each a different shape:

1. **Plate + facts**, 7/5 at `lg`. Left: the gallery — one large plate, thumbnails in a row beneath *only* when there is more than one image, click to zoom. Right, aligned to the plate's top rule: breadcrumbs, category eyebrow linking to the subcategory, `h1` at step-5 in display (the **display name**, see §11), the size suffix in mono beneath it as a caption, price (`PriceDisplay`, mono, compare-at struck), availability with the `Check`/`TriangleAlert` glyph, `QuantitySelector`, the primary button, the saved toggle as a text link, then a mono micro-table of delivery and returns facts pulled from `store-policy.ts`.
2. **Tabs**: Description / Specifications / Care / Delivery & returns, as a ruled tab bar (labels on a rule, active one carrying a 2px russet underline) with content in a `measure` column. Tabs with no content are not rendered.
3. **Related**, a ruled `row`-density list of six, under a ruled label — not a card carousel.

---

## 10. Motion inventory

Engine: `src/lib/motion` keeps `ticker.ts`, `env.ts`, `tokens.ts` and `engine.ts`; every Dresser scene (`dresser`, `drawers`, `hooks`, `rack`, `glaze` — the last being a WebGL shader) is **deleted** and replaced with two scenes: `reveal.ts` (IntersectionObserver staggered reveals) and `rule.ts` (the drawn underline / rule). `bag-flight.ts` is retained and retargeted to the basket. Durations/eases live in `tokens.ts` and mirror into `variables.css`.

| # | Moment | Mechanism | Duration |
|---|---|---|---|
| 1 | **Drawn underline** (signature) | `rule.ts`: SVG `stroke-dashoffset` 100→0 on the hero headline's underline, once, on first intersection | 700 ms |
| 2 | Section reveal | `reveal.ts`: `[data-reveal]` children get `opacity 0→1` + `translateY 12px→0`, staggered 60 ms, via IntersectionObserver, once | 700 ms |
| 3 | Section rule draw | `reveal.ts`: ruled labels and section rules animate `scaleX 0→1` from the left | 560 ms |
| 4 | Index row hover | background to `bg-brand-soft`, the arrow slides 4px right, the row's rule thickens to 2px | 200 ms |
| 5 | Plate hover — multi-image | cross-fade to `images[1]`, opacity only | 280 ms |
| 6 | Plate hover — single image | `scale(1.015)` on the photo, caption rule turns russet | 280 ms |
| 7 | Add-to-bag confirmation | `bag-flight.ts`: a ghost of the photo arcs to the basket, the basket nudges 2px, the count badge's trail squares fill in sequence, and `CartToast` slides up from the bottom rule | 420 ms flight + 200 ms badge |
| 8 | Button press | `translateY(1px)`, fill to `--color-accent-hover` | 200 ms |
| 9 | Underline on text links | `text-decoration-thickness` 1px→2px (no layout shift) | 200 ms |
| 10 | Drawer / sheet (cart, filters, mobile menu) | `translateX` with the calm-press ease, scrim fades | 280 ms in / 240 ms out |
| 11 | Dialog (search, zoom, confirm) | `opacity` + `translateY(8px)` | 240 ms |
| 12 | Page transition | `MotionRoot` fades `#main` 0.6→1 on pathname change | 200 ms |
| 13 | Filter / sort update | the grid dips to 50% opacity while the transition is pending | 160 ms |
| 14 | Loading | the **trail**: four squares fill in sequence, `steps(1)` | 480 ms loop |
| 15 | Skeleton | static `bg-surface-2` bars, no shimmer | — |
| 16 | Accordion | `grid-template-rows` 0fr→1fr, chevron rotates 180° | 280 ms |
| 17 | Toast | slide up 12px + fade | 240 ms |

**Reduced motion.** `readMotionEnv()` returns `reduced` and the engine mounts nothing — every `[data-reveal]` element is visible by default and the reveal only ever *removes* a class, so the static page is complete. `globals.css` additionally clamps every animation to 1ms and every transition to 120ms on `prefers-reduced-motion: reduce`, keeps `scroll-behavior: auto`, and the drawn underline renders fully drawn.

---

## 11. Display names

The supplier data is literal: 524 names begin `Fodder` (a mistranslation of dry food), 3,052 end in a size or measure suffix (`… Blue XL`, `… 10 L`, `… 13 kg`), 230 carry raw model codes. `scripts/lib/catalog-text.ts` already exposes `cleanProductName` and it runs **at import**, so entity decoding, supplier-trace scrubbing and shouting-case are already fixed in the database.

**Decision: the remaining transform is applied at render, not at import.** A new `src/lib/product-name.ts` exports `productDisplay(name)` returning `{ title, size }`. Reasons: slugs, SEO canonical names, search indexing, order history and invoices keep the stored name, so nothing already sold changes its label retrospectively; and the rule set can be tuned without a 5,996-row re-import. The storefront calls it in `ProductEntry`, `ProductInfo`, the PDP metadata, `CartItem`, `SearchResults` and the JSON-LD name.

It does four things:
1. `Fodder` → `Dry food` at the start of a name.
2. Peels a trailing dimension string (`120 x 60 x 40 cm`, and the truncated `59 x 1 x` the supplier also emits) off the title and normalises it to `120 × 60 × 40 cm`.
3. Loops up to three times peeling further size suffixes, so `Dog Harness Gloria Air Mesh Star Pink Size XXS 24-26 cm` resolves to "Dog Harness Gloria Air Mesh Star Pink" / "24–26 cm". Recognised: clothing sizes `XS…XXXL` and `S/M` pairs, a measure or range plus `kg g mg l ml cl cm mm m`, and a stranded `Size` label before any of them.
4. Drops a bare model code — a trailing run of 6+ digits, or a 4+ character alphanumeric block with no vowels — when it is not a measurement.

The returned `size` is set in mono as a **caption** beneath the name on the card and the PDP, never inside the headline. It never invents words and never removes a brand name; if a rule would leave fewer than three characters it returns the input untouched.

**`productStandfirst(text)`** sits beside it. 2,056 products have no `shortDescription` at all and a further group carries a supplier spec dump (`Pet: Dog Type: Dog Harness Colour: Pink Material: Polyester…`). It returns `null` for anything under 24 characters or carrying two or more `Label:` patterns, so the masthead, the lead feature and the PDP show a real sentence or nothing. The spec values still reach the customer, formatted, in the PDP Specifications tab.

---

## 12. Self-critique against the slop checklist

- **Could it be mistaken for generic AI UI?** No: the homepage has no card grid, no three-column feature row, no centred hero, no testimonial band. Its dominant shape is a ruled table.
- **Too many cards / rounds / pills?** There are no cards. Radius is 0 everywhere except the 2px photographic plate. `--radius-pill` is 0, so the ten legacy `rounded-pill` usages render square.
- **Default fonts?** No. Piazzolla / Schibsted Grotesk / Spline Sans Mono, none shared with a sibling, none on the excluded list.
- **Gradients, glow, blur?** None. `--gradient-*` is deleted. Elevation is a hairline plus one long soft shadow on overlays.
- **Fake content?** No stats, no reviews, no partner logos, no invented testimonials. Every number on the site comes from `store-policy.ts` or a live `COUNT(*)`.
- **Identical section padding?** No — §4 sets a different pair per section, and §4 is enforced.
- **Elements with no job?** The trail is the only ornament and every instance marks a position (brand, count, bullet, loading step, end of text).
- **Still usable?** Focus rings at 3:1+, keyboard paths on every menu and drawer, `aria-current` on navigation, semantic landmarks, one `h1` per page, 44px minimum touch targets, full reduced-motion fallback, and a placeholder state designed on purpose because the CDN will fail.
