"use client";

import { formatCurrency } from "@/lib/utils";
import { clsx } from "@/lib/utils";
import StepShell from "@/components/checkout/StepShell";

export default function TrimStep({ car, trims, selectedTrimId, onSelect, onNext }) {
  return (
    <StepShell
      title="Choose a trim"
      description={`Select which configuration of the ${car.title} you'd like to buy.`}
      onNext={onNext}
    >
      <div className="grid gap-4 sm:grid-cols-3">
        {trims.map((trim) => {
          const active = trim.id === selectedTrimId;
          return (
            <button
              key={trim.id}
              type="button"
              onClick={() => onSelect(trim.id)}
              className={clsx(
                "flex flex-col items-start gap-3 rounded-2xl border p-5 text-left transition-all duration-300",
                active ? "border-ink bg-ink text-canvas" : "border-steel-200 hover:border-ink/40"
              )}
            >
              <span className="font-display text-lg tracking-tightest">{trim.label}</span>
              <span className={clsx("font-mono text-sm", active ? "text-signal" : "text-steel-500")}>
                {trim.priceDelta === 0 ? "Included" : `+${formatCurrency(trim.priceDelta)}`}
              </span>
              <p className={clsx("text-xs leading-relaxed", active ? "text-white/70" : "text-steel-500")}>
                {trim.blurb}
              </p>
              {trim.features.length > 0 && (
                <ul className={clsx("mt-1 flex flex-col gap-1 text-xs", active ? "text-white/80" : "text-steel-600")}>
                  {trim.features.map((f) => (
                    <li key={f}>· {f}</li>
                  ))}
                </ul>
              )}
            </button>
          );
        })}
      </div>
    </StepShell>
  );
}
