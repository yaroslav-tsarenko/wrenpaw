import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { JsonLd } from "@/components/shared/SEO/JsonLd";
import { getHomeData } from "@/components/home/data";
import { MastheadOpener } from "@/components/home/MastheadOpener";
import { CategoryIndex } from "@/components/home/CategoryIndex";
import { LeadFeature } from "@/components/home/LeadFeature";
import { ReducedStrip } from "@/components/home/ReducedStrip";
import { ByAnimal } from "@/components/home/ByAnimal";
import { NewIn } from "@/components/home/NewIn";
import { KeepingNotes } from "@/components/home/KeepingNotes";
import { Colophon } from "@/components/home/Colophon";
import { BRAND } from "@/lib/brand";
import { pageMetadata } from "@/lib/seo/metadata";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo/structured-data";
import { POLICY_FACTS } from "@/lib/policy-facts";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("home");
  const title = t("metaTitle", { brand: BRAND.name });
  const description = t("metaDescription", {
    brand: BRAND.name,
    dispatchFrom: POLICY_FACTS.dispatchFrom,
    withdrawalDays: POLICY_FACTS.withdrawalDays,
    warrantyMonths: POLICY_FACTS.warrantyMonths,
  });
  return pageMetadata({ title, description, path: "/", absoluteTitle: true });
}

export default async function HomePage() {
  const data = await getHomeData();

  // Sections drop out when they have no stock to show, so the printed numerals
  // are handed out here rather than hard-coded — otherwise the sequence skips.
  let printed = 1; // the masthead is 01 and carries no numeral
  const numeral = (shown: boolean) => (shown ? String(++printed).padStart(2, "0") : "");
  const numerals = {
    index: numeral(data.index.major.length > 0 || data.index.minor.length > 0),
    feature: numeral(Boolean(data.feature.lead)),
    reduced: numeral(data.reduced.length > 0),
    animals: numeral(data.animals.length > 0),
    newest: numeral(data.newest.length >= 4),
    notes: numeral(true),
  };

  return (
    <div data-landing="home">
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={websiteJsonLd()} />
      <MastheadOpener lead={data.masthead.lead} categories={data.masthead.categories} totalProducts={data.totalProducts} />
      <CategoryIndex index={numerals.index} major={data.index.major} minor={data.index.minor} totalProducts={data.totalProducts} />
      <LeadFeature index={numerals.feature} lead={data.feature.lead} runnersUp={data.feature.runnersUp} ranked={data.feature.ranked} />
      <ReducedStrip index={numerals.reduced} products={data.reduced} />
      <ByAnimal index={numerals.animals} blocks={data.animals} />
      <NewIn index={numerals.newest} products={data.newest} />
      <KeepingNotes index={numerals.notes} />
      <Colophon />
    </div>
  );
}
