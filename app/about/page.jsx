import Link from "next/link";
import { ArrowRight, ShieldCheck, Sparkles, Timer, Users } from "lucide-react";
import Button from "@/components/ui/Button";

export const metadata = {
  title: "About — LoisnX",
  description: "Why LoisnX exists, and how we've rebuilt car buying as software.",
};

const VALUES = [
  {
    icon: ShieldCheck,
    title: "Radical transparency",
    copy: "Every price, fee, and financing number is visible before you commit to anything — never negotiated behind a manager's desk.",
  },
  {
    icon: Sparkles,
    title: "Inspected, not just listed",
    copy: "A 150+ point inspection and full history report happen before a car is ever posted, not after you've already asked.",
  },
  {
    icon: Timer,
    title: "Built for your time",
    copy: "Browse, compare, finance, trade in, and buy — on your schedule, without a showroom appointment.",
  },
  {
    icon: Users,
    title: "Real people, on your terms",
    copy: "Support is there when you want it and invisible when you don't. No calls you didn't ask for.",
  },
];

const MILESTONES = [
  { year: "2022", event: "LoisnX founded on a simple premise: buying a car shouldn't feel adversarial." },
  { year: "2023", event: "First 10,000 vehicles sold entirely online, across 14 states." },
  { year: "2024", event: "Launched trade-in estimates and a payment calculator to make every number visible up front." },
  { year: "2026", event: "48,000+ cars sold, with the same no-pressure model from day one." },
];

export default function AboutPage() {
  return (
    <div className="pt-20">
      <section className="container-page py-16">
        <p className="eyebrow bg-trust-tint text-trust-dim">About LoisnX</p>
        <h1 className="mt-3 max-w-2xl font-display text-4xl leading-tight tracking-tightest md:text-6xl">
          We think buying a car should feel like using good software.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-steel-600">
          No back-office negotiation theater, no waiting on a manager who
          isn't real, no pressure to decide today. Just clear pricing, real
          inventory, and a buying flow that respects your time.
        </p>
      </section>

      <section className="border-t border-steel-200 py-20">
        <div className="container-page">
          <h2 className="font-display text-2xl tracking-tightest md:text-3xl">What we believe</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {VALUES.map((value) => (
              <div key={value.title} className="rounded-2xl border border-steel-200 p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-signal">
                  <value.icon size={18} strokeWidth={1.75} />
                </span>
                <h3 className="mt-4 font-display text-lg tracking-tightest">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-steel-500">{value.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t-2 border-steel-200 bg-trust py-20 text-canvas">
        <div className="container-page grid gap-10 sm:grid-cols-4">
          {[
            ["48,200+", "Cars sold"],
            ["4.9 / 5", "Avg. customer rating"],
            ["150+", "Inspection points per car"],
            ["3 days", "Avg. time to key handoff"],
          ].map(([value, label]) => (
            <div key={label}>
              <p className="font-display text-4xl font-extrabold tracking-tightest">{value}</p>
              <p className="mt-2 text-xs font-bold uppercase tracking-wide text-white/70">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-steel-200 py-20">
        <div className="container-page">
          <h2 className="font-display text-2xl tracking-tightest md:text-3xl">Where we've been</h2>
          <div className="mt-10 flex flex-col divide-y divide-steel-200 border-t border-steel-200">
            {MILESTONES.map((m) => (
              <div key={m.year} className="flex flex-col gap-1 py-6 sm:flex-row sm:gap-8">
                <span className="w-20 shrink-0 font-mono text-sm text-steel-400">{m.year}</span>
                <span className="text-steel-600">{m.event}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-steel-200 py-24">
        <div className="container-page flex flex-col items-center gap-6 text-center">
          <h2 className="max-w-lg font-display text-3xl tracking-tightest md:text-4xl">
            See it for yourself.
          </h2>
          <Button as={Link} href="/inventory" size="lg">
            Browse Inventory <ArrowRight size={16} strokeWidth={2} />
          </Button>
        </div>
      </section>
    </div>
  );
}
