import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const CATEGORIES = [
  {
    slug: "electric",
    label: "Electric",
    copy: "Instant torque, zero tailpipe emissions, and the software gets better after you buy it.",
    accent: "bg-trust-tint text-trust-dim",
  },
  {
    slug: "luxury-suv",
    label: "Luxury SUVs",
    copy: "Three rows or two, air suspension standard, cabins built to outlast the lease.",
    accent: "bg-ink text-signal",
  },
  {
    slug: "sport-sedan",
    label: "Sport Sedans",
    copy: "The kind of car you take the long way home in. Track-capable, still has cupholders.",
    accent: "bg-velocity-tint text-velocity-dim",
  },
  {
    slug: "best-value",
    label: "Best Value",
    copy: "Inspected, priced fairly, and quietly some of the smartest buys on the lot.",
    accent: "bg-signal-tint text-signal-dim",
  },
];

export default function Categories() {
  return (
    <section className="border-t-2 border-steel-200 py-24">
      <div className="container-page">
        <div className="flex items-end justify-between gap-6">
          <h2 className="font-display text-3xl tracking-tightest md:text-4xl">
            Shop by category
          </h2>
          <Link
            href="/inventory"
            className="hidden items-center gap-1 text-sm font-bold text-trust transition-colors hover:text-trust-dim md:inline-flex"
          >
            View all inventory <ArrowUpRight size={15} strokeWidth={1.75} />
          </Link>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/inventory?category=${cat.slug}`}
              className="group flex flex-col justify-between rounded-3xl border-2 border-steel-200 p-6 transition-all duration-500 ease-bouncy hover:-translate-y-1.5 hover:border-ink hover:shadow-soft"
            >
              <div>
                <span className={`eyebrow ${cat.accent}`}>
                  {cat.label}
                </span>
                <p className="mt-4 text-sm leading-relaxed text-steel-500">{cat.copy}</p>
              </div>
              <div className="mt-8 flex items-center gap-1 text-sm font-bold text-ink">
                Explore
                <ArrowUpRight
                  size={15}
                  strokeWidth={1.75}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
