import Link from "next/link";
import { PolicyLayout, policyMetadata, policyTable, type PolicySection } from "@/components/layout/PolicyLayout/PolicyLayout";
import { CookieSettingsButton } from "@/components/layout/PolicyLayout/CookieSettingsButton";
import { COOKIE_CATEGORIES, COOKIE_TABLE, type CookieRecord } from "@/config/cookies";
import { POLICY_FACTS as F } from "@/lib/policy-facts";

export const generateMetadata = policyMetadata(
  "cookies",
  `A complete list of the cookies and browser-storage keys ${F.brand} sets, what each is for, how long it survives, and where to change your mind.`,
);

function CookieTable({ rows }: { rows: CookieRecord[] }) {
  return (
    <>
      <table className={`${policyTable} hidden md:table`}>
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Type</th>
            <th scope="col">Provider</th>
            <th scope="col">Purpose</th>
            <th scope="col">Expiry</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name}>
              <td className="font-mono text-ui-xs text-ink [overflow-wrap:anywhere]">{row.name}</td>
              <td className="whitespace-nowrap text-ink-muted">{row.kind}</td>
              <td className="text-ink-muted">{row.provider}</td>
              <td>{row.purpose}</td>
              <td className="text-ink-muted">{row.expiry}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div role="list" className="mt-5 border-t border-line md:hidden">
        {rows.map((row) => (
          <div role="listitem" key={row.name} className="border-b border-line py-4">
            <div className="font-mono text-ui-xs text-ink [overflow-wrap:anywhere]">{row.name}</div>
            <div className="mt-1 text-ui-sm">{row.purpose}</div>
            <div className="meta mt-2 text-ink-muted">
              {row.kind} · {row.provider} · {row.expiry}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

const necessary = COOKIE_CATEGORIES.find((c) => c.id === "necessary");
const consentKey = COOKIE_TABLE.necessary.find((r) => r.name.endsWith("-consent"))?.name;

const sections: PolicySection[] = [
  {
    id: "what",
    title: "Scope",
    body: (
      <>
        <p>
          A cookie is a small text file a site leaves in your browser; local storage and session storage are related browser facilities that
          hold data on your own device and nowhere else. Everything of that kind which {F.brand} sets on {F.domain} is listed below.
        </p>
        <p>
          It is the identical list you get from &ldquo;Show cookies&rdquo; inside Cookie settings. Bookmarked products live in your account
          on our server rather than in the browser.
        </p>
      </>
    ),
  },
  {
    id: "necessary",
    title: "Necessary cookies and storage",
    body: (
      <>
        <p>{necessary?.purpose} They cannot be switched off, because nothing in the shop functions without them, and none of them serves advertising.</p>
        <CookieTable rows={COOKIE_TABLE.necessary} />
      </>
    ),
  },
  {
    id: "optional",
    title: "Analytics and marketing",
    body: (
      <>
        <p>
          As things stand, {F.brand} sets nothing for analytics and nothing for marketing. Both categories appear in Cookie settings and sit
          off until you turn them on. Were we to adopt such a tool, every cookie it sets would be documented here first, and it would load
          only once you had permitted that category.
        </p>
        {COOKIE_TABLE.analytics.length ? <CookieTable rows={COOKIE_TABLE.analytics} /> : null}
        {COOKIE_TABLE.marketing.length ? <CookieTable rows={COOKIE_TABLE.marketing} /> : null}
      </>
    ),
  },
  {
    id: "choice",
    title: "Changing your mind",
    body: (
      <>
        <p>
          The banner on a first visit gives you Accept all, Reject all and Customise. Revisit that decision whenever you like through the{" "}
          <strong>Cookie settings</strong> link in the footer of every page, or with the button here. Taking consent back costs no more
          effort than giving it, and it applies immediately.
        </p>
        <p>
          What you chose is held in local storage as <code className="font-mono text-ui-xs">{consentKey}</code> for twelve months, after
          which we put the question again.
        </p>
        <div className="mt-6">
          <CookieSettingsButton />
        </div>
        <p>
          Your browser settings will also clear cookies and site data outright. Clear the necessary ones and you will find the bag empty and
          yourself signed out.
        </p>
      </>
    ),
  },
  {
    id: "third-party",
    title: "The payment page",
    body: (
      <p>
        Paying moves you onto the hosted page of our payment provider. The provider runs that page on its own domain and may set cookies
        there for security and fraud prevention, governed by its own cookie policy rather than this one. The{" "}
        <Link href="/policies/payment">Payment policy</Link> has the background.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: (
      <p>
        Add or drop a cookie or storage key and this list is revised to match. Questions to {F.email}. Our treatment of personal data is
        described in the <Link href="/policies/privacy">Privacy policy</Link>.
      </p>
    ),
  },
];

export default async function CookiesPage() {
  return <PolicyLayout slug="cookies" sections={sections} />;
}
