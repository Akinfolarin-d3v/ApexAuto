import { Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    quote:
      "I financed and signed everything from my couch in about twenty minutes. The car showed up two days later exactly as described.",
    name: "M. Okafor",
    detail: "Bought a Rivian R2, Lagos → delivered in Abuja",
  },
  {
    quote:
      "The trade-in estimate was within $300 of what I actually got. First dealer experience that didn't feel like a negotiation tactic.",
    name: "D. Whitfield",
    detail: "Traded a 2019 Accord toward a Taycan GTS",
  },
  {
    quote:
      "Compared three SUVs side by side before I ever spoke to anyone. By the time I called, I already knew exactly which one I wanted.",
    name: "S. Palacios",
    detail: "Bought a Range Rover Sport Autobiography",
  },
];

export default function Testimonials() {
  return (
    <section className="border-t-2 border-steel-200 py-24">
      <div className="container-page">
        <p className="eyebrow bg-signal-tint text-signal-dim">
          Customer trust
        </p>
        <h2 className="mt-3 font-display text-3xl tracking-tightest md:text-4xl">
          People who bought the easier way
        </h2>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col justify-between rounded-3xl border-2 border-steel-200 p-8 transition-all duration-500 ease-bouncy hover:-translate-y-1 hover:border-ink hover:shadow-soft"
            >
              <div>
                <Quote size={24} strokeWidth={2} className="mb-3 fill-signal-tint text-signal-dim" />
                <blockquote className="font-display text-xl leading-snug tracking-tightest text-ink">
                  {t.quote}
                </blockquote>
              </div>
              <figcaption className="mt-8 text-sm text-steel-500">
                <span className="font-bold text-ink">{t.name}</span>
                <br />
                {t.detail}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
