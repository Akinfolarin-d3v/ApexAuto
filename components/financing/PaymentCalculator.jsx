"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { formatCurrency, clsx } from "@/lib/utils";
import { useCars } from "@/hooks/useCars";
import { estimateMonthlyPayment, TERM_OPTIONS } from "@/lib/finance";

const CREDIT_TIERS = [
  { id: "excellent", label: "Excellent (720+)", apr: 5.4 },
  { id: "good", label: "Good (660–719)", apr: 6.9 },
  { id: "fair", label: "Fair (600–659)", apr: 9.8 },
  { id: "limited", label: "Limited (< 600)", apr: 13.5 },
];

export default function PaymentCalculator() {
  const searchParams = useSearchParams();
  const { cars, loading } = useCars();
  const preselectId = searchParams.get("carId");

  const [carId, setCarId] = useState(preselectId || "");
  const [downPayment, setDownPayment] = useState(0);
  const [creditTier, setCreditTier] = useState("good");
  const [termMonths, setTermMonths] = useState(60);

  const car = cars.find((c) => c.id === carId);

  useEffect(() => {
    if (!carId && cars.length) setCarId(cars[0].id);
  }, [cars, carId]);

  useEffect(() => {
    if (car) setDownPayment(Math.round(car.price * 0.1));
  }, [car?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const apr = CREDIT_TIERS.find((t) => t.id === creditTier)?.apr ?? 6.9;

  const result = useMemo(() => {
    if (!car) return null;
    const monthly = estimateMonthlyPayment({ price: car.price, downPayment, apr, termMonths });
    const totalPaid = monthly * termMonths + downPayment;
    const totalInterest = Math.max(totalPaid - car.price, 0);
    return { monthly, totalPaid, totalInterest };
  }, [car, downPayment, apr, termMonths]);

  if (loading) {
    return <p className="container-page py-24 font-mono text-sm text-steel-500">Loading…</p>;
  }

  return (
    <div className="container-page py-10">
      <p className="eyebrow bg-trust-tint text-trust-dim">Estimate before you buy</p>
      <h1 className="mt-2 font-display text-4xl tracking-tightest md:text-5xl">Payment Calculator</h1>
      <p className="mt-3 max-w-xl text-steel-600">
        Model a monthly payment for any car in stock. Final rate is always confirmed by your lender.
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_1fr]">
        <div className="flex flex-col gap-8">
          <div>
            <label className="text-sm text-steel-500">Vehicle</label>
            <select
              value={carId}
              onChange={(e) => setCarId(e.target.value)}
              className="mt-2 w-full rounded-lg border border-steel-200 px-3 py-3 text-sm focus:border-ink focus:outline-none"
            >
              {cars.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title} — {formatCurrency(c.price)}
                </option>
              ))}
            </select>
          </div>

          {car && (
            <>
              <div>
                <div className="flex justify-between text-sm text-steel-500">
                  <span>Down payment</span>
                  <span className="font-mono">{formatCurrency(downPayment)}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={Math.round(car.price * 0.6)}
                  step={500}
                  value={downPayment}
                  onChange={(e) => setDownPayment(Number(e.target.value))}
                  className="mt-2 w-full accent-ink"
                />
              </div>

              <div>
                <span className="text-sm text-steel-500">Estimated credit tier</span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {CREDIT_TIERS.map((tier) => (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => setCreditTier(tier.id)}
                      className={clsx(
                        "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors duration-300",
                        creditTier === tier.id
                          ? "border-ink bg-ink text-canvas"
                          : "border-steel-200 text-steel-600 hover:border-ink"
                      )}
                    >
                      {tier.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-sm text-steel-500">Term</span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {TERM_OPTIONS.map((term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => setTermMonths(term)}
                      className={clsx(
                        "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors duration-300",
                        termMonths === term
                          ? "border-ink bg-ink text-canvas"
                          : "border-steel-200 text-steel-600 hover:border-ink"
                      )}
                    >
                      {term} mo
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {car && result && (
          <div className="h-fit rounded-2xl border border-steel-200 p-6">
            <p className="font-mono text-xs uppercase tracking-wide text-steel-500">{car.title}</p>
            <p className="mt-2 font-display text-4xl tracking-tightest">
              {formatCurrency(Math.round(result.monthly))}
              <span className="text-base font-normal text-steel-500">/mo</span>
            </p>
            <p className="mt-1 font-mono text-xs text-steel-400">{apr}% APR est. · {termMonths} months</p>

            <div className="mt-6 h-2 w-full overflow-hidden rounded-full bg-steel-100">
              <div
                className="h-full bg-signal"
                style={{ width: `${Math.min((car.price / result.totalPaid) * 100, 100)}%` }}
              />
            </div>
            <div className="mt-2 flex justify-between font-mono text-[11px] text-steel-400">
              <span>Principal</span>
              <span>Interest</span>
            </div>

            <div className="mt-6 flex flex-col gap-3 border-t border-steel-200 pt-5 text-sm">
              <Row label="Vehicle price" value={formatCurrency(car.price)} />
              <Row label="Down payment" value={formatCurrency(downPayment)} />
              <Row label="Est. total interest" value={formatCurrency(Math.round(result.totalInterest))} />
              <Row label="Est. total cost" value={formatCurrency(Math.round(result.totalPaid))} emphasis />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Row({ label, value, emphasis }) {
  return (
    <div className="flex justify-between">
      <span className="text-steel-500">{label}</span>
      <span className={emphasis ? "font-mono text-base text-ink" : "font-mono text-ink"}>{value}</span>
    </div>
  );
}
