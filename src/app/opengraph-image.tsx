import { getTranslations } from "next-intl/server";
import { BRAND } from "@/lib/brand";
import { defaultLocale } from "@/i18n/config";
import { POLICY_FACTS } from "@/lib/policy-facts";
import { OG_PALETTE as P, OG_SIZE } from "@/lib/og/assets";
import { Label, Rule, TrailMark, Wordmark, ogResponse } from "@/lib/og/parts";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = `${BRAND.name}: ${BRAND.tagline}`;

export default async function Image() {
  const t = await getTranslations({ locale: defaultLocale, namespace: "seo" });
  const facts = [t("ogFreeOver", { amount: POLICY_FACTS.freeThreshold }), t("ogReturns", { days: POLICY_FACTS.withdrawalDays })];

  return ogResponse(
    <div style={{ display: "flex", width: "100%", height: "100%", background: P.paper, color: P.ink, padding: "76px 88px 68px", flexDirection: "column", justifyContent: "space-between" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Label fontSize={22}>{t("ogShop")}</Label>
        <TrailMark size={64} color={P.accent} />
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Rule color={P.rule} height={2} />
        <div style={{ display: "flex", marginTop: 40 }}>
          <Wordmark size={156} color={P.ink} accent={P.accent} />
        </div>
        <div style={{ display: "flex", marginTop: 30, fontFamily: "Schibsted", fontSize: 38, color: P.inkMuted, maxWidth: 840, lineHeight: 1.3 }}>
          {t("siteDescription")}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Rule color={P.line} height={1} />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 26 }}>
          <div style={{ display: "flex", fontFamily: "Schibsted", fontSize: 26, color: P.inkMuted }}>
            {facts.map((fact, i) => (
              <div key={fact} style={{ display: "flex", alignItems: "center" }}>
                {i > 0 ? <div style={{ width: 1, height: 24, background: P.line, margin: "0 22px" }} /> : null}
                {fact}
              </div>
            ))}
          </div>
          <Label fontSize={22} color={P.ink}>{BRAND.domain}</Label>
        </div>
      </div>
    </div>,
  );
}
