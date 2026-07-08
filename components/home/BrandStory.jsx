export default function BrandStory() {
  return (
    <section className="border-t-2 border-steel-200 py-28">
      <div className="container-page grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <div>
          <p className="eyebrow bg-trust-tint text-trust-dim">
            Why LoisnX
          </p>
          <h2 className="mt-4 max-w-md font-display text-3xl leading-tight tracking-tightest md:text-4xl">
            We rebuilt the dealership as software.
          </h2>
        </div>

        <div className="flex flex-col gap-8">
          <p className="max-w-xl text-lg leading-relaxed text-steel-600">
            No pressure, no back-office negotiation theater, no waiting
            for a manager who isn't real. Every price on LoisnX is the
            price. Every car has been inspected before it's listed, and
            every number — financing, trade-in, taxes — is visible before
            you commit to anything.
          </p>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <h3 className="font-display text-lg tracking-tightest">Transparent pricing</h3>
              <p className="mt-2 text-sm leading-relaxed text-steel-500">
                No hidden fees, no dealer markup games. The number you see
                is the number you pay.
              </p>
            </div>
            <div>
              <h3 className="font-display text-lg tracking-tightest">Inspected, always</h3>
              <p className="mt-2 text-sm leading-relaxed text-steel-500">
                A multi-point inspection and full history report on every
                vehicle before it's ever listed.
              </p>
            </div>
            <div>
              <h3 className="font-display text-lg tracking-tightest">Buy on your time</h3>
              <p className="mt-2 text-sm leading-relaxed text-steel-500">
                Finance, trade in, and finalize the whole purchase from
                your phone — no showroom required.
              </p>
            </div>
            <div>
              <h3 className="font-display text-lg tracking-tightest">Real humans, if you need one</h3>
              <p className="mt-2 text-sm leading-relaxed text-steel-500">
                Support is available at every step, but nobody's chasing
                you for a decision.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
