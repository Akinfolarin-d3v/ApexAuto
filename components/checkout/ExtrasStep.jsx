"use client";

import { formatCurrency, clsx } from "@/lib/utils";
import { PROTECTION_ADDONS } from "@/lib/addons";
import StepShell from "@/components/checkout/StepShell";

export default function ExtrasStep({ selectedIds, onToggle, onBack, onNext }) {
  return (
    <StepShell
      title="Add extras & protection"
      description="Optional — skip anything you don't want. Nothing here is required to continue."
      onBack={onBack}
      onNext={onNext}
      nextLabel="Continue"
    >
      <div className="flex flex-col divide-y divide-steel-200 rounded-2xl border border-steel-200">
        {PROTECTION_ADDONS.map((addon) => {
          const checked = selectedIds.includes(addon.id);
          return (
            <label
              key={addon.id}
              className="flex cursor-pointer items-start justify-between gap-4 p-5 transition-colors hover:bg-steel-50"
            >
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onToggle(addon.id)}
                  className="mt-1 h-4 w-4 rounded border-steel-300 accent-ink"
                />
                <div>
                  <p className={clsx("text-sm font-medium", checked ? "text-ink" : "text-steel-700")}>
                    {addon.label}
                  </p>
                  <p className="mt-1 max-w-md text-xs leading-relaxed text-steel-500">{addon.description}</p>
                </div>
              </div>
              <span className="whitespace-nowrap font-mono text-sm text-ink">{formatCurrency(addon.price)}</span>
            </label>
          );
        })}
      </div>
    </StepShell>
  );
}
