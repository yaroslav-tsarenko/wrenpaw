import Link from "next/link";
import { PolicyLayout, policyMetadata, type PolicySection } from "@/components/layout/PolicyLayout/PolicyLayout";
import { POLICY_FACTS as F } from "@/lib/policy-facts";

export const generateMetadata = policyMetadata(
  "payment",
  `Card payment at ${F.brand} runs on a PCI DSS compliant hosted page and takes ${F.cardMethods}. Prices read in ${F.currencies}, and your full card number never reaches us.`,
);

const sections: PolicySection[] = [
  {
    id: "methods",
    title: "What we take",
    body: (
      <>
        <p>Credit and debit cards from {F.cardMethods} are the only way to pay here. Nothing else is accepted.</p>
        <p>
          The card details themselves are entered on the hosted page belonging to{" "}
          {F.paymentProviderNamed ? `${F.paymentProviderNamed}, a PCI DSS compliant payment provider` : "our PCI DSS compliant payment provider"}. Pressing Pay at checkout
          hands you over to that page, and you come back to {F.brand} once the payment has gone through.
        </p>
      </>
    ),
  },
  {
    id: "security",
    title: "How your card is kept safe",
    body: (
      <>
        <p>
          <strong>Full card data is never stored or processed by us.</strong> The number, the expiry date and the security code are typed
          into the provider&rsquo;s page, not ours, and they do not travel through this website at any point. What comes back to us is the
          outcome of the payment plus a transaction reference.
        </p>
        <p>
          3-D Secure and Strong Customer Authentication are applied to every payment. That is why your bank may want confirmation — a prompt
          in its app, or a one-time code. Skip that step and the money is not taken.
        </p>
      </>
    ),
  },
  {
    id: "currencies",
    title: "Currencies",
    body: (
      <>
        <p>
          Prices can be read and paid in {F.currencies}. We set them in {F.baseCurrency} and convert into the others at our current rate.
          Whatever total the checkout shows in your chosen currency is the figure we charge.
        </p>
        <p>
          Hold a card in some other currency and your issuer may do its own conversion and add a fee for doing so. That fee is theirs, not
          ours, and is outside our control.
        </p>
      </>
    ),
  },
  {
    id: "tax",
    title: "Tax",
    body: F.vatRegistered ? (
      <p>VAT at the rate applying to your order is already inside the price, and your invoice breaks the VAT out as a separate line.</p>
    ) : (
      <p>
        VAT registration does not apply to {F.company}. No VAT is added, and none appears at checkout, on your order confirmation or on your
        invoice. UK deliveries have a separate note on import charges in the <Link href="/policies/shipping">Delivery policy</Link>.
      </p>
    ),
  },
  {
    id: "when-charged",
    title: "The moment you are charged",
    body: (
      <>
        <p>
          The charge happens when you finish the payment on the provider&rsquo;s page. Only once the provider has confirmed that to us do we
          create the order and send the confirmation email. A declined or abandoned payment creates no order and takes no money.
        </p>
        <p>
          When a payment will not go through, check the card details and whether your bank has approved it, then have another go. Still
          stuck, and it is a question for your bank — or write to us at {F.email}.
        </p>
      </>
    ),
  },
  {
    id: "refunds",
    title: "Refunds",
    body: (
      <p>
        A refund returns to the card that paid, in the currency it paid in, inside {F.refundDays} days, as the{" "}
        <Link href="/policies/returns">Returns and refunds policy</Link> sets out. Sending it to a different card or account is not something
        we are able to do.
      </p>
    ),
  },
  {
    id: "statement",
    title: "What appears on your statement",
    body: (
      <p>
        Depending on your bank, the entry reads either {F.company} or {F.brand}. If a line looks unfamiliar, email {F.email} before you raise
        it with the bank and we will track down the order for you.
      </p>
    ),
  },
  {
    id: "disputes",
    title: "If something goes wrong",
    body: (
      <p>
        Come to us first when an order is not right — we can almost always settle it more quickly than a card dispute will. Our approach to
        chargebacks sits in the <Link href="/policies/terms#chargebacks">Terms and conditions</Link>.
      </p>
    ),
  },
];

export default async function PaymentPage() {
  return <PolicyLayout slug="payment" sections={sections} />;
}
