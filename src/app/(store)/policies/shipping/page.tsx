import Link from "next/link";
import { PolicyLayout, policyMetadata, policyTable, type PolicySection } from "@/components/layout/PolicyLayout/PolicyLayout";
import { POLICY_FACTS as F } from "@/lib/policy-facts";

export const generateMetadata = policyMetadata(
  "shipping",
  `Everything leaves ${F.dispatchFrom} within ${F.processingDays}. Allow ${F.deliveryEu} inside the EU and ${F.deliveryUk} to the UK. One charge of ${F.deliveryCost} per order, waived from ${F.freeThreshold}.`,
);

const sections: PolicySection[] = [
  {
    id: "where",
    title: "Countries we send to",
    body: (
      <>
        <p>
          Our delivery map covers the {F.deliveryCountries}, and the country selector at checkout is the definitive list. Two groups are
          outside it: {F.restrictedCountries}; and {F.restrictedTerritories}.
        </p>
        <p>Parcels go to street addresses only. Read your address back before you pay — a missing door number is the commonest cause of a lost week.</p>
      </>
    ),
  },
  {
    id: "dispatch",
    title: "Where your parcel starts",
    body: (
      <p>
        Packing happens at {F.dispatchFrom}, and an order is on its way within {F.processingDays} of the payment clearing. We count Monday to
        Friday as business days and skip Spanish public holidays. Anything ordered over a weekend joins the queue on the following business
        day.
      </p>
    ),
  },
  {
    id: "times-costs",
    title: "How long it takes and what it costs",
    body: (
      <>
        <div className="overflow-x-auto">
          <table className={policyTable}>
            <thead>
              <tr>
                <th scope="col">Destination</th>
                <th scope="col">Dispatch</th>
                <th scope="col">Delivery</th>
                <th scope="col">Cost</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="font-medium text-ink">European Union</td>
                <td>{F.processingDays}</td>
                <td>{F.deliveryEu}</td>
                <td className="tabular">
                  {F.deliveryCost}, free from {F.freeThreshold}
                </td>
              </tr>
              <tr>
                <td className="font-medium text-ink">United Kingdom</td>
                <td>{F.processingDays}</td>
                <td>{F.deliveryUk}</td>
                <td className="tabular">
                  {F.deliveryCost}, free from {F.freeThreshold}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          You pay the delivery charge once per order, whatever its size, and you see it in your chosen currency before you confirm payment.
          The {F.freeThreshold} threshold is measured on the goods total after any discount has come off. Transit times are carrier estimates
          rather than promises of a particular day.
        </p>
      </>
    ),
  },
  {
    id: "uk-duties",
    title: "Import charges on UK orders",
    body: <p>{F.ukImportNote}</p>,
  },
  {
    id: "tracking",
    title: "Following the parcel",
    body: (
      <p>
        Dispatch triggers an email, and it carries a tracking number whenever the carrier issues one. Account holders can also see the order
        and where it has got to under <Link href="/account/orders">Your orders</Link>.
      </p>
    ),
  },
  {
    id: "failed",
    title: "When a delivery does not land",
    body: (
      <>
        <p>
          With nobody in, carriers normally post a card, come back another day, or hold the parcel at a local point for you to collect.
          Whatever the tracking message tells you to do is the quickest route to the parcel.
        </p>
        <p>
          Should a parcel travel all the way back to us — an incomplete address, say, or an uncollected parcel — we will get in touch. From
          there you can have it sent out again for a fresh delivery charge, or take a refund of the goods and the original delivery charge
          with the carrier&rsquo;s return fee deducted.
        </p>
      </>
    ),
  },
  {
    id: "late-damaged",
    title: "Late, missing or damaged parcels",
    body: (
      <>
        <p>{F.lateDeliveryNote}</p>
        <p>
          Damage in transit: hold on to the box and the packing material, then email us photographs of both along with your order number.
          Nothing damaged on the way to you costs you anything to put right — see <Link href="/policies/returns">Returns and refunds</Link>.
        </p>
      </>
    ),
  },
  {
    id: "risk",
    title: "Who carries the risk",
    body: (
      <p>
        Until the parcel reaches you or somebody you have nominated, the goods are at our risk. Ownership passes to you once we hold your
        payment in full.
      </p>
    ),
  },
];

export default async function ShippingPage() {
  return <PolicyLayout slug="shipping" sections={sections} />;
}
