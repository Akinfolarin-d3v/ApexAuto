"use client";

import { formatCurrency } from "@/lib/utils";
import { clsx } from "@/lib/utils";
import { TERM_OPTIONS } from "@/lib/finance";
import StepShell from "@/components/checkout/StepShell";

const CREDIT_TIERS = [
  { id: "excellent", label: "Excellent (720+)", apr: 5.4 },
  { id: "good", label: "Good (660–719)", apr: 6.9 },
  { id: "fair", label: "Fair (600–659)", apr: 9.8 },
  { id: "limited", label: "Limited (< 600)", apr: 13.5 },
];

export default function PaymentStep({ vehiclePrice, payment, setPayment, onBack, onNext }) {
  function update(patch) {
    setPayment((prev) => ({ ...prev, ...patch }));
  }

  return (
    <StepShell
      title="How would you like to pay?"
      description="This is an estimate — final terms are confirmed with your financing partner."
      onBack={onBack}
      onNext={onNext}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => update({ method: "finance" })}
          className={clsx(
            "rounded-2xl border p-5 text-left transition-all duration-300",
            payment.method === "finance" ? "border-ink bg-ink text-canvas" : "border-steel-200 hover:border-ink/40"
          )}
        >
          <span className="font-display text-lg tracking-tightest">Finance</span>
          <p className={clsx("mt-1 text-xs", payment.method === "finance" ? "text-white/70" : "text-steel-500")}>
            Spread the cost over monthly payments.
          </p>
        </button>
        <button
          type="button"
          onClick={() => update({ method: "cash" })}
          className={clsx(
            "rounded-2xl border p-5 text-left transition-all duration-300",
            payment.method === "cash" ? "border-ink bg-ink text-canvas" : "border-steel-200 hover:border-ink/40"
          )}
        >
          <span className="font-display text-lg tracking-tightest">Pay in Full</span>
          <p className={clsx("mt-1 text-xs", payment.method === "cash" ? "text-white/70" : "text-steel-500")}>
            One payment, no interest, done.
          </p>
        </button>
      </div>

      {payment.method === "finance" && (
        <div className="mt-8 flex flex-col gap-6 rounded-2xl border border-steel-200 p-6">
          <div>
            <div className="flex justify-between text-xs text-steel-500">
              <span>Down payment</span>
              <span className="font-mono">{formatCurrency(payment.downPayment)}</span>
            </div>
            <input
              type="range"
              min={0}
              max={Math.round(vehiclePrice * 0.6)}
              step={500}
              value={payment.downPayment}
              onChange={(e) => update({ downPayment: Number(e.target.value) })}
              className="mt-2 w-full accent-ink"
            />
          </div>

          <div>
            <span className="text-xs text-steel-500">Estimated credit tier</span>
            <div className="mt-2 flex flex-wrap gap-2">
              {CREDIT_TIERS.map((tier) => (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => update({ apr: tier.apr, creditTier: tier.id })}
                  className={clsx(
                    "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors duration-300",
                    payment.creditTier === tier.id
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
            <span className="text-xs text-steel-500">Term</span>
            <div className="mt-2 flex flex-wrap gap-2">
              {TERM_OPTIONS.map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => update({ termMonths: term })}
                  className={clsx(
                    "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors duration-300",
                    payment.termMonths === term
                      ? "border-ink bg-ink text-canvas"
                      : "border-steel-200 text-steel-600 hover:border-ink"
                  )}
                >
                  {term} mo
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </StepShell>
  );
}
