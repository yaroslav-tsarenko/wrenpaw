import Link from "next/link";
import { PolicyLayout, policyMetadata, type PolicySection } from "@/components/layout/PolicyLayout/PolicyLayout";
import { POLICY_FACTS as F } from "@/lib/policy-facts";

export const generateMetadata = policyMetadata(
  "warranty",
  `${F.warrantyMonths} months of cover against manufacturing defects on everything ${F.brand} sells, sitting on top of the statutory rights you already hold in the UK and the EU.`,
);

const sections: PolicySection[] = [
  {
    id: "two-kinds",
    title: "Two layers of protection",
    body: (
      <>
        <p>
          Buying from {F.brand} leaves you with two separate things to fall back on. One is the set of rights the law already gives you,
          which nothing in this warranty narrows or substitutes. The other is the {F.warrantyMonths}-month warranty we add ourselves.
        </p>
        <h3>Statutory rights</h3>
        <ul>
          <li>
            <strong>United Kingdom:</strong> the Consumer Rights Act 2015 requires goods to match their description, to be of satisfactory
            quality and to be fit for purpose. Where they fall short, the first 30 days after delivery give you a short-term right to reject
            for a full refund. Beyond that you can ask for repair or replacement, and where that fails to resolve matters, a price reduction
            or refund. Claims remain open for up to six years, or five in Scotland.
          </li>
          <li>
            <strong>European Union:</strong> the legal guarantee of conformity runs for a minimum of two years from delivery, and any lack
            of conformity appearing inside the first year is presumed to have been there when the goods arrived.
          </li>
        </ul>
        <h3>What we add</h3>
        <p>
          For {F.warrantyMonths} months from the delivery date we will replace or refund a product whose materials or workmanship fail,
          provided it has been used normally in a household and in line with the care instructions.
        </p>
      </>
    ),
  },
  {
    id: "covered",
    title: "Inside the warranty",
    body: (
      <ul>
        <li>Buckles, clips, D-rings and stitching on collars, harnesses and leads that give way without being misused.</li>
        <li>Welds, bars, catches and door hinges on cages, hutches and carriers that fail or come apart.</li>
        <li>Seams, zips and covers on beds, mats and blankets that open up under normal washing.</li>
        <li>Pumps, filters, heaters and lighting units that stop working inside the warranty period through a manufacturing fault.</li>
        <li>Water bottles, drinkers, fountains and bowls that leak, or whose valves stick from the outset.</li>
        <li>Terrarium thermostats and controllers that read or switch incorrectly out of the box.</li>
        <li>Tanks and terrariums with seams or joints that seep when filled as the product page describes.</li>
      </ul>
    ),
  },
  {
    id: "not-covered",
    title: "Outside the warranty",
    body: (
      <>
        <ul>
          <li>Ordinary wear: chewed toys, frayed webbing, scratched posts, faded fabric, flattened bedding and consumed bedding or substrate.</li>
          <li>Damage an animal has done — chewing, clawing, digging or soiling — which is use rather than a defect.</li>
          <li>Breakage from dropping or knocking, and glass or acrylic cracked by a sudden change of temperature.</li>
          <li>Anything used outside the care instructions: a hand-wash cover put through a hot machine wash, a heat mat run without a thermostat, a cage loaded past its stated weight.</li>
          <li>Lamps, bulbs and filter media, which are consumables with a stated service life rather than warranted parts.</li>
          <li>Rust on metal cages, bars or bowls left standing in wet, and mould on wooden hides that were not allowed to dry.</li>
          <li>Breeding, rescue, kennel, cattery or any other commercial and professional use.</li>
        </ul>
        <p>
          These limits bind our own warranty and nothing else. Where a product was already faulty when it reached you, your statutory rights
          are untouched by this list.
        </p>
      </>
    ),
  },
  {
    id: "claim",
    title: "Making a claim",
    body: (
      <ol>
        <li>
          Email {F.email}, or use the <Link href="/contact">contact form</Link>, quoting your order number.
        </li>
        <li>Tell us what has gone wrong and attach photographs showing it, including any batch or model marking on the product itself.</li>
        <li>
          We answer {F.replyTime}. Where we need the item in our hands to assess it, we will explain how to send it and cover the postage.
        </li>
        <li>
          An accepted claim is settled with the same product again, the nearest equivalent where it has been discontinued, or a refund of
          what you paid.
        </li>
      </ol>
    ),
  },
  {
    id: "who",
    title: "Who stands behind it",
    body: (
      <p>
        {F.company}, trading as {F.brand}, gives this warranty to the person who bought the product from us, on goods delivered into the
        United Kingdom and the European Union. Where we replace an item, the replacement runs out the remainder of the original warranty
        period.
      </p>
    ),
  },
];

export default async function WarrantyPage() {
  return <PolicyLayout slug="warranty" sections={sections} />;
}
