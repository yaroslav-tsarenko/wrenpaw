import Link from "next/link";
import { PolicyLayout, policyMetadata, type PolicySection } from "@/components/layout/PolicyLayout/PolicyLayout";
import { POLICY_FACTS as F } from "@/lib/policy-facts";

export const generateMetadata = policyMetadata(
  "acceptable-use",
  `The conditions on which you may use ${F.domain} and hold a ${F.brand} account, and the consequences of ignoring them.`,
);

const sections: PolicySection[] = [
  {
    id: "scope",
    title: "Who is covered",
    body: (
      <p>
        Everyone who opens {F.domain}, whether or not they register, is covered by this policy, and it sits inside our{" "}
        <Link href="/policies/terms">Terms and conditions</Link> rather than alongside them.
      </p>
    ),
  },
  {
    id: "accounts",
    title: "Accounts",
    body: (
      <ul>
        <li>An account holder has to be at least {F.minAge}.</li>
        <li>Register once, under your own name, with details that are actually correct.</li>
        <li>Your password is yours alone — do not lend the account out and do not sign in to anyone else&rsquo;s.</li>
        <li>
          Neither registration from, nor delivery to, {F.restrictedCountries} or {F.restrictedTerritories} is permitted. Routing round that
          with a VPN, a proxy or an address that is not yours is a breach in itself.
        </li>
      </ul>
    ),
  },
  {
    id: "not-allowed",
    title: "What you must not do",
    body: (
      <ul>
        <li>Pay with a card that is stolen or that you have no authority to use, or order goods you have no intention of paying for.</li>
        <li>
          Order for resale, or work round the per-order limits of {F.maxQtyPerItem} of any one product and {F.maxItemsPerOrder} items in
          total.
        </li>
        <li>Register more than once in order to claim a single-use discount again.</li>
        <li>Run automated traffic that loads the site — scrapers, bulk sign-ups, checkout hammering.</li>
        <li>
          Go looking at other customers&rsquo; data, at the admin area, or at any system you have no right to, and do not probe for security
          holes unless we have agreed to it in writing.
        </li>
        <li>Send or upload malware, spam, or anything the law prohibits.</li>
      </ul>
    ),
  },
  {
    id: "breach",
    title: "What follows a breach",
    body: (
      <>
        <p>
          Our response may be to void and refund an order, to suspend the account, or to close it altogether. Where reporting is a legal
          obligation — card fraud being the obvious case — the matter goes to the appropriate authority.
        </p>
        <p>Believe we have got it wrong? Write to {F.email} and a person will look at the decision again.</p>
      </>
    ),
  },
];

export default async function AcceptableUsePage() {
  return <PolicyLayout slug="acceptable-use" sections={sections} />;
}
