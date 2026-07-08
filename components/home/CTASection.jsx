import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";

export default function CTASection() {
  return (
    <section className="border-t-2 border-steel-200 py-28">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-4xl bg-signal px-8 py-16 text-ink md:px-16 md:py-20">
          <div className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full bg-trust/25 blur-3xl" />
          <div className="pointer-events-none absolute -left-16 bottom-0 h-48 w-48 rounded-full bg-velocity/15 blur-3xl" />
          <div className="relative grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-end">
            <div>
              <h2 className="max-w-lg font-display text-4xl font-extrabold leading-[1.02] tracking-tightest md:text-5xl">
                Got a car to trade?
                <br />
                Find out what it's worth.
              </h2>
              <p className="mt-5 max-w-md text-ink/70">
                Get a real trade-in estimate in under two minutes, then
                apply it directly toward anything in stock.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <Button as={Link} href="/trade-in" variant="dark" size="lg">
                Estimate My Trade-In <ArrowRight size={16} strokeWidth={2} />
              </Button>
              <Button as={Link} href="/inventory" variant="secondary" size="lg">
                Browse Cars
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
