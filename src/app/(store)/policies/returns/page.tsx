import Link from "next/link";
import { PolicyLayout, policyMetadata, type PolicySection } from "@/components/layout/PolicyLayout/PolicyLayout";
import { POLICY_FACTS as F } from "@/lib/policy-facts";

export const generateMetadata = policyMetadata(
  "returns",
  `You have ${F.withdrawalDays} days from delivery to change your mind, ${F.returnShipDays} days to post the goods back, and we settle the refund to your original card inside ${F.refundDays} days. Anything faulty travels back at our expense.`,
);

const sections: PolicySection[] = [
  {
    id: "summary",
    title: "The short version",
    body: (
      <ul>
        <li>{F.withdrawalDays} days from the parcel arriving to change your mind, with no explanation required.</li>
        <li>Once you have told us, the goods need to be posted back inside {F.returnShipDays} days.</li>
        <li>Return postage is yours, except where the item is faulty, damaged or simply not what you ordered.</li>
        <li>Refunds land on the card you paid with inside {F.refundDays} days of the goods reaching us — or of your proof of posting, whichever is sooner.</li>
      </ul>
    ),
  },
  {
    id: "right-to-cancel",
    title: "The right to change your mind",
    body: (
      <>
        <p>
          Your {F.withdrawalDays}-day cancellation window on an online order comes from the Consumer Contracts Regulations 2013 (UK) and the
          Consumer Rights Directive (EU). Counting starts the day after the goods reach you or whoever you nominated. Split an order across
          several parcels and the clock starts the day after the final one lands.
        </p>
        <p>
          Everything in the range is covered. Nothing we sell is supplied sealed for health or hygiene reasons, so there is no category of
          product we carve out of this right.
        </p>
        <p>Catching an order before it leaves the warehouse is simpler still: tell us, we pull it, and the full amount goes back.</p>
      </>
    ),
  },
  {
    id: "how-to-return",
    title: "Sending something back",
    body: (
      <ol>
        <li>
          Write to {F.email}, or go through the <Link href="/contact">contact form</Link>, inside {F.withdrawalDays} days of delivery. We need
          the order number and which items are coming back. Telling us why is up to you.
        </li>
        <li>Expect an answer {F.replyTime}, giving you the return address and what to mark on the parcel.</li>
        <li>
          Wrap the goods so they survive the journey — the original packaging if you still have it — and post them inside {F.returnShipDays}{" "}
          days of writing to us. Choose a tracked service and hang on to the receipt; that receipt is your proof of return.
        </li>
        <li>We check the goods over on arrival and email you to confirm the refund.</li>
      </ol>
    ),
  },
  {
    id: "return-costs",
    title: "Who pays the postage",
    body: (
      <>
        <p>
          A change of mind means the return postage is on you. The address we send you may be in Spain, so what it costs depends on where
          you are posting from and which service you pick.
        </p>
        <p>
          Faulty goods, transit damage and wrong items are different: that return is at our expense. Contact us before you post anything and
          we will either book the collection or put your postage back.
        </p>
      </>
    ),
  },
  {
    id: "condition",
    title: "What condition goods come back in",
    body: (
      <>
        <p>
          Handle an item as freely as you would in a shop — unbox it, look it over, check the size against your animal. What we ask you not
          to do, while you are still deciding, is feed from a bowl, let an animal chew or sleep on something, fill a litter tray, or fill a
          tank or terrarium with water or substrate.
        </p>
        <p>
          Goods that arrive back visibly used, or damaged because they were handled more than checking required, may have the lost value
          deducted. We will tell you the figure and our reasoning before any refund goes through. A faulty item is never subject to a
          deduction.
        </p>
      </>
    ),
  },
  {
    id: "refunds",
    title: "How the money comes back",
    body: (
      <>
        <p>
          The refund clock is {F.refundDays} days, running from the day the goods arrive back with us or, if sooner, the day you show us
          proof that they are on their way. Cancel before dispatch and the same {F.refundDays} days run from your cancellation instead.
        </p>
        <p>
          We give back the price of the goods plus the standard delivery charge you paid on them. Keep part of an order and the delivery
          charge stays with us; send the whole order back and it is refunded too.
        </p>
        <p>
          Money returns to the card that paid, in the currency it paid in, with no handling fee from us. How quickly it surfaces on your
          statement is down to your bank, and a few working days is normal.
        </p>
      </>
    ),
  },
  {
    id: "faulty",
    title: "Faulty, damaged or wrong goods",
    body: (
      <>
        <p>
          Anything that turns up broken, develops a fault, or is not the item you ordered: email us the order number together with
          photographs of the goods and the packaging, as soon after delivery as you can manage.
        </p>
        <p>
          Replacement or refund is your choice, and the return costs you nothing. These are legal rights, so the {F.withdrawalDays}-day
          window does not cap them. Faults that emerge later fall under our{" "}
          <Link href="/policies/warranty">{F.warrantyMonths}-month warranty</Link> alongside your statutory rights.
        </p>
      </>
    ),
  },
  {
    id: "refused",
    title: "Parcels refused or sent back",
    body: (
      <p>
        Turn a delivery away, or let a parcel find its way back to us undelivered, and we count it as a cancellation from the moment it
        reaches the warehouse. Goods and delivery charge are refunded, minus whatever the carrier actually billed us for the return leg. The{" "}
        <Link href="/policies/shipping">Delivery policy</Link> covers this in context.
      </p>
    ),
  },
];

export default async function ReturnsPage() {
  return <PolicyLayout slug="returns" sections={sections} />;
}
