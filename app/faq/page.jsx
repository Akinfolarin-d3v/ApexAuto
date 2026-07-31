import Link from "next/link";
import { FAQ_GROUPS } from "@/data/faq";
import FAQAccordion from "@/components/faq/FAQAccordion";

export const metadata = {
  title: "FAQ",
  description: "Answers to common questions about buying, financing, and trading in a car on LoisnX.",
};

export default function FAQPage() {
  return (
    <div className="pt-20">
      <div className="container-page py-10">
        <p className="eyebrow bg-trust-tint text-trust-dim">Support</p>
        <h1 className="mt-2 font-display text-4xl tracking-tightest md:text-5xl">
          Frequently asked questions
        </h1>
        <p className="mt-4 max-w-xl text-steel-600">
          Can't find what you're looking for? <Link href="/contact" className="text-trust hover:underline">Reach out</Link> and we'll get back to you.
        </p>

        <div className="mt-12 flex flex-col gap-12">
          {FAQ_GROUPS.map((group) => (
            <div key={group.category}>
              <h2 className="font-display text-xl tracking-tightest">{group.category}</h2>
              <div className="mt-5">
                <FAQAccordion items={group.questions} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
