"use client";

import { useState } from "react";
import { formatCurrency, clsx } from "@/lib/utils";
import { estimateTradeInValue, logTradeInSubmission, CONDITION_OPTIONS, ACCIDENT_OPTIONS } from "@/lib/tradein";

const CURRENT_YEAR = new Date().getFullYear();

export default function TradeInForm({ onEstimate, initialValues, compact = false }) {
  const [form, setForm] = useState(
    initialValues || {
      make: "",
      model: "",
      year: CURRENT_YEAR - 4,
      mileage: 45000,
      condition: "good",
      accidents: "none",
    }
  );
  const [estimate, setEstimate] = useState(null);

  function update(patch) {
    setForm((prev) => ({ ...prev, ...patch }));
    setEstimate(null);
  }

  function handleEstimate(e) {
    e?.preventDefault();
    const value = estimateTradeInValue(form);
    setEstimate(value);
    onEstimate?.(value, form);
    logTradeInSubmission(form, value);
  }

  return (
    <form onSubmit={handleEstimate} className="flex flex-col gap-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="text-steel-500">Make</span>
          <input
            required
            value={form.make}
            onChange={(e) => update({ make: e.target.value })}
            placeholder="e.g. Honda"
            className="rounded-lg border border-steel-200 px-3 py-2.5 focus:border-ink focus:outline-none"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="text-steel-500">Model</span>
          <input
            required
            value={form.model}
            onChange={(e) => update({ model: e.target.value })}
            placeholder="e.g. Accord"
            className="rounded-lg border border-steel-200 px-3 py-2.5 focus:border-ink focus:outline-none"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="text-steel-500">Year</span>
          <input
            type="number"
            required
            min={1990}
            max={CURRENT_YEAR + 1}
            value={form.year}
            onChange={(e) => update({ year: e.target.value })}
            className="rounded-lg border border-steel-200 px-3 py-2.5 focus:border-ink focus:outline-none"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="text-steel-500">Mileage</span>
          <input
            type="number"
            required
            min={0}
            value={form.mileage}
            onChange={(e) => update({ mileage: e.target.value })}
            className="rounded-lg border border-steel-200 px-3 py-2.5 focus:border-ink focus:outline-none"
          />
        </label>
      </div>

      <div>
        <span className="text-sm text-steel-500">Condition</span>
        <div className="mt-2 flex flex-wrap gap-2">
          {CONDITION_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => update({ condition: opt.value })}
              className={clsx(
                "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors duration-300",
                form.condition === opt.value
                  ? "border-ink bg-ink text-canvas"
                  : "border-steel-200 text-steel-600 hover:border-ink"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <span className="text-sm text-steel-500">Accident history</span>
        <div className="mt-2 flex flex-wrap gap-2">
          {ACCIDENT_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => update({ accidents: opt.value })}
              className={clsx(
                "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors duration-300",
                form.accidents === opt.value
                  ? "border-ink bg-ink text-canvas"
                  : "border-steel-200 text-steel-600 hover:border-ink"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="mt-2 w-full rounded-full bg-signal px-6 py-3 text-sm font-medium text-ink transition-colors duration-300 hover:bg-signal-dim sm:w-fit"
      >
        Get my estimate
      </button>

      {estimate !== null && (
        <div className={clsx("rounded-2xl border border-trust bg-trust-tint p-5", compact && "p-4")}>
          <p className="text-xs font-bold uppercase tracking-wide text-trust-dim">Estimated trade-in value</p>
          <p className="mt-1 font-display text-3xl tracking-tightest text-ink">{formatCurrency(estimate)}</p>
          <p className="mt-2 text-xs leading-relaxed text-steel-600">
            This is a preliminary estimate. Final value is confirmed after a
            brief inspection at handoff.
          </p>
        </div>
      )}
    </form>
  );
}
