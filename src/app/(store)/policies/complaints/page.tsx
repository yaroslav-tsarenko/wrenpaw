import Link from "next/link";
import { PolicyLayout, policyMetadata, type PolicySection } from "@/components/layout/PolicyLayout/PolicyLayout";
import { POLICY_FACTS as F } from "@/lib/policy-facts";

export const generateMetadata = policyMetadata(
  "complaints",
  `Raising a complaint with ${F.brand}: an acknowledgement ${F.complaintsAck} and a considered answer inside ${F.complaintsDays} days.`,
);

const sections: PolicySection[] = [
  {
    id: "how",
    title: "Getting a complaint to us",
    body: (
      <>
        <p>
          Write to {F.email}, or send it through the <Link href="/contact">contact form</Link>. Four things make it quicker to deal with:
        </p>
        <ul>
          <li>your name, and the email address the order was placed under;</li>
          <li>the order number, where an order is involved;</li>
          <li>an account of what happened, with photographs if an item arrived damaged or faulty;</li>
          <li>the outcome you are after.</li>
        </ul>
        <p>We are at the desk {F.supportHours}.</p>
      </>
    ),
  },
  {
    id: "timeline",
    title: "How we handle it",
    body: (
      <ol>
        <li>An acknowledgement reaches you {F.complaintsAck}, naming whoever has picked it up.</li>
        <li>We investigate, which can mean going back to the warehouse or chasing the carrier.</li>
        <li>
          Our full answer follows inside {F.complaintsDays} days, setting out what we established and what we intend to do. Where more time
          is genuinely needed — a carrier tracing a lost parcel, for instance — we say so and give you a date.
        </li>
      </ol>
    ),
  },
  {
    id: "escalate",
    title: "If our answer does not settle it",
    body: (
      <>
        <p>
          Reply and ask for a review. Somebody else on the team takes the file from the beginning and comes back to you within{" "}
          {F.complaintsDays} days.
        </p>
        <p>
          Where we still cannot reach agreement, the consumer advice body for your country can take it up: Citizens Advice in England, Wales
          and Scotland, Consumerline in Northern Ireland, or the European Consumer Centre in your EU member state. Court action also remains
          open to you, on the terms described in the governing law section of our <Link href="/policies/terms#law">Terms and conditions</Link>.
        </p>
        <p>
          Where the complaint concerns our handling of personal data, a data protection authority can also hear it — see the{" "}
          <Link href="/policies/privacy#rights">Privacy policy</Link>.
        </p>
      </>
    ),
  },
  {
    id: "records",
    title: "What we keep",
    body: (
      <p>
        Each complaint and our answer to it stay on file for {F.retention.supportMessagesMonths} months, both so we can pick the thread back
        up and so patterns are visible to us.
      </p>
    ),
  },
];

export default async function ComplaintsPage() {
  return <PolicyLayout slug="complaints" sections={sections} />;
}
