import Link from "next/link";
import { PolicyLayout, SellerBlock, policyMetadata, policyTable, type PolicySection } from "@/components/layout/PolicyLayout/PolicyLayout";
import { STORE_POLICY } from "@/config/store-policy";
import { POLICY_FACTS as F } from "@/lib/policy-facts";

export const generateMetadata = policyMetadata(
  "privacy",
  `What personal data ${F.company} (${F.brand}) holds, the UK GDPR and EU GDPR grounds for holding it, who else handles it, for how long, and what you can ask us to do.`,
);

const purposes: { purpose: string; data: string; basis: string }[] = [
  { purpose: "Accepting, packing and shipping an order", data: "Name, email, phone, delivery and billing address, items ordered", basis: "Contract" },
  { purpose: "Maintaining your account", data: "Name, email, phone, date of birth, address, password (stored as a hash), order history, saved items", basis: "Contract" },
  { purpose: `Confirming you have reached ${F.minAge}`, data: "Date of birth", basis: "Contract and legitimate interests" },
  { purpose: "Replying to messages and complaints", data: "Name, email, order number, the content of your message, the IP address it was sent from", basis: "Contract and legitimate interests" },
  { purpose: "Processing refunds, defending chargebacks and preventing fraud", data: "Order details, payment result and transaction reference, IP address", basis: "Legal obligation and legitimate interests" },
  { purpose: "Keeping restricted countries and territories out of checkout", data: "Delivery and billing country, address", basis: "Legal obligation" },
  { purpose: "Meeting accounting and tax obligations", data: "Order and refund records", basis: "Legal obligation" },
  { purpose: "Sending the newsletter, where you asked for it", data: "Email address", basis: "Consent" },
  { purpose: "Keeping the site up and secure", data: "IP address, browser and device type, pages requested, error logs", basis: "Legitimate interests" },
];

const sections: PolicySection[] = [
  {
    id: "controller",
    title: "Who holds your data",
    body: (
      <>
        <p>
          The controller of everything described here is {F.company}, trading as {F.brand}. For customers in the United Kingdom that means
          the UK GDPR and the Data Protection Act 2018 apply; for customers across the European Union, the EU General Data Protection
          Regulation does.
        </p>
        <SellerBlock />
        <p>Questions about your data, or a request to exercise a right, go to {F.email}.</p>
      </>
    ),
  },
  {
    id: "collect",
    title: "What we hold",
    body: (
      <>
        <ul>
          <li><strong>Account details:</strong> forename and surname, email, telephone number, date of birth, street, town, postcode and country, plus your password — kept only as a one-way hash.</li>
          <li><strong>Order details:</strong> what you bought, where it went and where it was billed, how you can be contacted, the delivery method, and the payment outcome plus transaction reference our provider passes back.</li>
          <li><strong>Messages:</strong> the content of anything you send by email or through the contact form, any order number in it, and — for the form — the originating IP address.</li>
          <li><strong>Saved items:</strong> whichever products you have bookmarked to the account.</li>
          <li><strong>Newsletter:</strong> an email address, where you have given us one for that purpose.</li>
          <li><strong>Technical data:</strong> IP address, browser and device, and which pages were requested, as written to server logs. What is kept in your browser is covered by the <Link href="/policies/cookies">Cookie policy</Link>.</li>
        </ul>
      </>
    ),
  },
  {
    id: "card-data",
    title: "Card payments",
    body: (
      <>
        <p>
          <strong>
            Full payment card data is neither stored nor processed on our side. Every card payment goes through our PCI DSS compliant
            provider{F.paymentProviderNamed ? `, ${F.paymentProviderNamed}` : ""}.
          </strong>
        </p>
        <p>
          Card details are typed into the provider&rsquo;s hosted page, never into this site. 3-D Secure and Strong Customer Authentication
          (SCA) sit over the payment, which is why your bank may want to confirm it — usually inside its own app. All that comes back to us
          is whether it worked, and a reference.
        </p>
      </>
    ),
  },
  {
    id: "use",
    title: "Our purposes and lawful bases",
    body: (
      <div className="overflow-x-auto">
        <table className={policyTable}>
          <thead>
            <tr>
              <th scope="col">Purpose</th>
              <th scope="col">Data</th>
              <th scope="col">Lawful basis</th>
            </tr>
          </thead>
          <tbody>
            {purposes.map((row) => (
              <tr key={row.purpose}>
                <td className="font-medium text-ink">{row.purpose}</td>
                <td className="text-ink-muted">{row.data}</td>
                <td>{row.basis}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ),
  },
  {
    id: "sharing",
    title: "Who else sees it",
    body: (
      <>
        <p>
          Personal data leaves us only for service providers acting on our instructions and on our behalf, and each receives nothing beyond
          what its job requires:
        </p>
        <ul>
          {STORE_POLICY.processors.map((p) => (
            <li key={p.role}>
              <strong>{p.name ? `${p.role} (${p.name})` : p.role}:</strong> {p.purpose.charAt(0).toLowerCase() + p.purpose.slice(1)}.
            </li>
          ))}
        </ul>
        <p>
          Disclosure also happens where the law compels it — a tax authority, the police — or to a card issuer handling a disputed payment.
          We do not sell personal data, and advertisers get none of it.
        </p>
      </>
    ),
  },
  {
    id: "transfers",
    title: "International transfers",
    body: (
      <p>
        Because packing and dispatch happen in {STORE_POLICY.shipping.dispatchCountry}, delivery details are handled inside the European
        Union. Each of the UK and the EU treats the other&rsquo;s data protection regime as adequate. Should a provider handle data beyond
        the UK or the European Economic Area, we rely on an adequacy decision or on standard contractual clauses, adding the UK
        International Data Transfer Addendum for UK data.
      </p>
    ),
  },
  {
    id: "retention",
    title: "Retention",
    body: (
      <ul>
        <li>Orders, payments and refunds: held {F.retention.orderRecordsYears} years from the order, because accounting and tax law require it.</li>
        <li>The account itself: until you ask us to close it, or once {F.retention.inactiveAccountYears} years pass with no sign-in and no order. Order records then remain on the basis above.</li>
        <li>Correspondence and complaints: {F.retention.supportMessagesMonths} months from the end of the exchange.</li>
        <li>Newsletter address: until you unsubscribe.</li>
      </ul>
    ),
  },
  {
    id: "rights",
    title: "Your rights",
    body: (
      <>
        <p>You are entitled to:</p>
        <ul>
          <li>a copy of the personal data we hold on you;</li>
          <li>correction of anything inaccurate;</li>
          <li>erasure, where the need has passed or no lawful basis remains;</li>
          <li>restriction of, or objection to, our use of it — legitimate interests included;</li>
          <li>a portable copy of whatever you supplied to us;</li>
          <li>withdrawal of consent whenever you choose — unsubscribing, or changing your cookie settings.</li>
        </ul>
        <p>
          Write to {F.email} to exercise any of them. Our answer comes within one month, and we may need you to verify who you are before we
          act.
        </p>
        <p>
          A supervisory authority will also hear a complaint: in the United Kingdom, the Information Commissioner&rsquo;s Office
          (ico.org.uk); in the European Union, the authority for the country where you live or work. We would rather have the first
          opportunity to put it right.
        </p>
      </>
    ),
  },
  {
    id: "security",
    title: "Security",
    body: (
      <p>
        Nothing is served except over HTTPS. Passwords exist only as one-way hashes. Customer data is reachable only by the people who need
        it to get orders out and answer messages. Card details never touch our systems at all.
      </p>
    ),
  },
  {
    id: "automated",
    title: "Automated decisions",
    body: (
      <p>
        No decision with legal or comparable consequences for you is taken here by machine alone. Your card issuer and our payment provider
        do run their own automated fraud screening and can refuse a payment; where that happens, get in touch and we will look at the order
        ourselves.
      </p>
    ),
  },
  {
    id: "age",
    title: "Age",
    body: (
      <p>
        This is an adult shop. We do not knowingly take data from anyone under {F.minAge}. Tell us at {F.email} if you think somebody under
        {F.minAge} has registered and the account will be removed.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: <p>This policy is revised whenever our handling of personal data changes, and the date at the head of the page identifies the current version.</p>,
  },
];

export default async function PrivacyPage() {
  return <PolicyLayout slug="privacy" sections={sections} />;
}
