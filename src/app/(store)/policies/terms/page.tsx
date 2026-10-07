import Link from "next/link";
import { PolicyLayout, SellerBlock, policyMetadata, type PolicySection } from "@/components/layout/PolicyLayout/PolicyLayout";
import { POLICY_FACTS as F } from "@/lib/policy-facts";

export const generateMetadata = policyMetadata(
  "terms",
  `The basis on which ${F.company} trades as ${F.brand}: eligibility, pricing, card payment, dispatch from Spain, the ${F.withdrawalDays}-day cancellation right, refunds and complaints.`,
);

const sections: PolicySection[] = [
  {
    id: "about",
    title: "What these terms are",
    body: (
      <>
        <p>
          Any order placed through {F.domain} is placed on these terms. {F.brand} is the trading name under which {F.company} operates, so
          &ldquo;we&rdquo;, &ldquo;us&rdquo; and &ldquo;our&rdquo; below all mean {F.company}, and &ldquo;you&rdquo; means whoever is
          ordering.
        </p>
        <SellerBlock />
        <p>
          Read them together with the <Link href="/policies/shipping">Delivery policy</Link>,{" "}
          <Link href="/policies/returns">Returns and refunds policy</Link>, <Link href="/policies/payment">Payment policy</Link>,{" "}
          <Link href="/policies/warranty">Warranty</Link>, <Link href="/policies/privacy">Privacy policy</Link> and{" "}
          <Link href="/policies/cookies">Cookie policy</Link>. None of them takes away a right the law gives you as a consumer.
        </p>
      </>
    ),
  },
  {
    id: "who-can-order",
    title: "Who may order",
    body: (
      <>
        <p>
          Registering or ordering requires you to be {F.minAge} or older. Date of birth is asked for at registration, and we will not open
          an account for anyone below {F.minAge}.
        </p>
        <p>
          Our customers are private individuals buying for the animals in their own households. Everything here is pet equipment for
          domestic keeping. Buy it to resell, or for a kennel, cattery, breeding or rescue operation, and the consumer rights described
          below do not attach to that purchase.
        </p>
        <p>Name, email, telephone number and both addresses must be correct and must belong to you.</p>
      </>
    ),
  },
  {
    id: "where-we-sell",
    title: "Where we trade",
    body: (
      <>
        <p>Delivery runs to the {F.deliveryCountries}, and checkout will only let you pick a destination we actually serve.</p>
        <p>
          We neither sell nor deliver into {F.restrictedCountries}, nor into {F.restrictedTerritories}, and we do not open accounts there.
          Those places are blocked at registration and at checkout alike. Where an order turns out to be tied to one of them — by delivery
          address, by billing address or by the card itself — we void it and return everything paid.
        </p>
      </>
    ),
  },
  {
    id: "products",
    title: "The range",
    body: (
      <>
        <p>
          We stock food, treats, bedding, bowls and feeders, collars, harnesses and leads, grooming tools, litter trays and litter, cages,
          hutches and kennels, carriers, aquarium equipment and decoration, and terrarium habitat, heating and lighting. Live animals and
          prescription-only veterinary medicines are not part of the range.
        </p>
        <p>
          Every product page carries the materials, the measurements and the care notes we hold for that item. The photographs show the
          product itself, though screens render colour differently, and items made or finished by hand vary a little between units. Treat
          measurements as approximate unless the page says otherwise.
        </p>
        <p>
          Follow the care and safety notes on the page and on the packaging — the weight or girth a harness is rated for, the species and
          life stage a food is formulated for, the tank volume a filter is sized for, whether a heat source requires a thermostat.
        </p>
      </>
    ),
  },
  {
    id: "orders",
    title: "When an order becomes a contract",
    body: (
      <>
        <ol>
          <li>You fill the bag and open the checkout.</li>
          <li>You give us your contact details and delivery address and pick a delivery method.</li>
          <li>You read the order back, tick the box accepting these terms, and press Pay.</li>
          <li>Our payment provider&rsquo;s hosted page takes your card details.</li>
          <li>
            When that provider tells us the payment succeeded, a confirmation email goes out. Your contract with {F.company} comes into
            existence at the moment we send it.
          </li>
        </ol>
        <p>
          A single order may hold up to {F.maxQtyPerItem} of any one product and {F.maxItemsPerOrder} items overall. We can refuse an order
          before the contract exists, or cancel it afterwards and refund in full, where the product has gone out of stock, where the price
          or description shown was plainly in error, where the destination is one we do not reach, or where the payment looks fraudulent.
          Either way you hear from us by email.
        </p>
      </>
    ),
  },
  {
    id: "prices",
    title: "Prices, currency and tax",
    body: (
      <>
        <p>
          You can read prices in {F.currencies}. {F.baseCurrency} is the currency we price in, and the others are derived from it at our
          current rate. The charge is taken in whichever currency you had selected when you ordered, at the total displayed before you paid.
          A card denominated elsewhere may attract your issuer&rsquo;s own exchange fee.
        </p>
        {F.vatRegistered ? (
          <p>VAT at the applicable rate is already included in the price you see.</p>
        ) : (
          <p>
            {F.company} holds no VAT registration. Nothing is added for VAT, and no VAT line appears at checkout, on the confirmation or on
            the invoice.
          </p>
        )}
        <p>
          Delivery is {F.deliveryCost} on an order, and nothing at all once the order reaches {F.freeThreshold}. You see that charge at
          checkout before paying.
        </p>
        <p>{F.ukImportNote}</p>
      </>
    ),
  },
  {
    id: "payment",
    title: "Payment",
    body: (
      <>
        <p>
          Cards from {F.cardMethods} are accepted. The details go in on the hosted page run by {F.paymentProvider}, which holds PCI DSS
          compliance; your full card number is neither seen nor stored by us. 3-D Secure may send your bank looking for confirmation,
          typically through its app.
        </p>
        <p>
          Completing that page is what charges the card. A declined payment produces no order. The{" "}
          <Link href="/policies/payment">Payment policy</Link> goes into more detail.
        </p>
      </>
    ),
  },
  {
    id: "delivery",
    title: "Delivery",
    body: (
      <>
        <p>
          Packing and dispatch happen at {F.dispatchFrom} inside {F.processingDays}. After dispatch, reckon on {F.deliveryEu} for EU
          addresses and {F.deliveryUk} for the United Kingdom — estimates from the carrier rather than fixed dates.
        </p>
        <p>
          Risk in the goods passes to you when they are handed to you or to somebody you nominated. Title passes once your payment has
          cleared in full.
        </p>
        <p>
          {F.lateDeliveryNote} The <Link href="/policies/shipping">Delivery policy</Link> carries the detail.
        </p>
      </>
    ),
  },
  {
    id: "cancel",
    title: "Cancelling",
    body: (
      <>
        <p>
          The Consumer Contracts (Information, Cancellation and Additional Charges) Regulations 2013 in the UK, and the Consumer Rights
          Directive in the EU, give you {F.withdrawalDays} days to cancel without explaining yourself. Day one is the day after the goods
          reach you or your nominee; where an order is split, it is the day after the last parcel lands.
        </p>
        <p>
          Cancelling before dispatch is also open to you. Email us the order number, and if the parcel is still with the warehouse we pull
          it and return the whole amount.
        </p>
        <p>
          To cancel once it has arrived, tell us inside the {F.withdrawalDays} days, at {F.email} or through the{" "}
          <Link href="/contact">contact form</Link>, with the order number. No particular form is required, though this wording works:
          &ldquo;I hereby give notice that I cancel my contract for the sale of the following goods: [items], ordered on [date] / received on
          [date], order number [number], name, address.&rdquo;
        </p>
        <p>
          The goods then need to be on their way back inside {F.returnShipDays} days of that notice. Return postage is yours unless the item
          was faulty or was not what you ordered. The <Link href="/policies/returns">Returns and refunds policy</Link> sets out each step.
        </p>
        <p>
          Inspect the goods as freely as you would in a shop. Where an item has actually been put to use — a bowl fed from, a bed slept on, a
          tray filled, a tank filled with water — we may reduce the refund to reflect the value lost.
        </p>
      </>
    ),
  },
  {
    id: "refunds",
    title: "Refunds",
    body: (
      <>
        <p>
          A cancellation gets you the price of the goods and the standard delivery charge you paid on them. The {F.refundDays}-day refund
          period runs from the day the goods arrive back, or from the day you give us proof of posting if that is sooner. Cancelled before
          dispatch, it runs from the cancellation itself.
        </p>
        <p>
          The money goes to the paying card, in the paying currency, with nothing deducted as a fee. Your bank may need a few more working
          days before it shows.
        </p>
      </>
    ),
  },
  {
    id: "faulty",
    title: "Faulty or incorrect goods",
    body: (
      <>
        <p>
          Goods have to match their description, be of satisfactory quality and be fit for purpose. Where something arrives broken, proves
          faulty, or is the wrong item, send us the order number with photographs: we cover the return and you choose between a replacement
          and a refund.
        </p>
        <p>
          On top of those legal rights sits our {F.warrantyMonths}-month warranty against manufacturing defects, described in the{" "}
          <Link href="/policies/warranty">Warranty</Link>.
        </p>
      </>
    ),
  },
  {
    id: "chargebacks",
    title: "Chargebacks",
    body: (
      <>
        <p>
          Come to us before you go to your card issuer. Almost everything is resolved more quickly that way than through a formal dispute.
        </p>
        <p>
          Where a chargeback is opened, we will put the order record, the delivery tracking and our correspondence with you in front of the
          issuer. A chargeback decided your way is not refunded a second time by us directly. Where one is raised against an order that was
          delivered and never returned, we may hold the account while the dispute runs. Nothing here cuts across your rights under the card
          scheme rules or consumer law.
        </p>
      </>
    ),
  },
  {
    id: "account",
    title: "Your account",
    body: (
      <>
        <p>
          Keeping the password to yourself, and whatever happens under the account, is your responsibility. Let us know immediately if you
          suspect somebody else has been in it.
        </p>
        <p>
          An account can be suspended or closed by us where it breaches the{" "}
          <Link href="/policies/acceptable-use">Acceptable use policy</Link>, carries false details, or connects to a restricted country or
          territory. You may ask us to close yours whenever you like.
        </p>
      </>
    ),
  },
  {
    id: "liability",
    title: "What we are liable for",
    body: (
      <>
        <p>
          Breach these terms and we answer for loss or damage that was a foreseeable consequence of the breach. Loss that nobody could have
          foreseen when the contract was made is not something we answer for.
        </p>
        <p>
          Liability for death or personal injury arising from our negligence, for fraud, and for breach of your legal rights in the goods, is
          neither excluded nor limited.
        </p>
        <p>
          What we sell is for private, household keeping of animals. Loss of profit, loss of business and business interruption are outside
          our liability to you.
        </p>
      </>
    ),
  },
  {
    id: "outside-control",
    title: "Things we cannot control",
    body: (
      <p>
        Carrier disruption, industrial action, severe weather, a closed warehouse — where something of that kind holds your order up, we
        tell you as soon as we know and do what can reasonably be done to shorten the delay. Where the delay looks substantial, you may
        cancel and we refund everything paid for goods still undelivered.
      </p>
    ),
  },
  {
    id: "data",
    title: "Personal data",
    body: (
      <p>
        What we do with your personal data is described in the <Link href="/policies/privacy">Privacy policy</Link>.
      </p>
    ),
  },
  {
    id: "complaints",
    title: "Complaints",
    body: (
      <p>
        Unhappy about an order? Email {F.email}. An acknowledgement follows {F.complaintsAck} and a full answer inside{" "}
        {F.complaintsDays} days. How it works, and where a complaint can go after us, is in the{" "}
        <Link href="/policies/complaints">Complaints policy</Link>.
      </p>
    ),
  },
  {
    id: "law",
    title: "Governing law",
    body: (
      <>
        <p>
          {F.governingLaw.charAt(0).toUpperCase() + F.governingLaw.slice(1)} govern these terms, and {F.courts} may hear a dispute arising
          from them.
        </p>
        <p>
          Living in the United Kingdom or an EU member state, you keep the mandatory consumer protections of the country you live in, and
          you may bring proceedings in its courts.
        </p>
      </>
    ),
  },
  {
    id: "changes",
    title: "Amendments",
    body: (
      <p>
        These terms can change. Whichever version was published at the moment you ordered is the version that governs that order, and the
        date at the head of this page records the last revision.
      </p>
    ),
  },
];

export default async function TermsPage() {
  return <PolicyLayout slug="terms" sections={sections} />;
}
