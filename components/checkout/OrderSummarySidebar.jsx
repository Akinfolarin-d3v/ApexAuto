"use client";

import { formatCurrency } from "@/lib/utils";
import CarMedia from "@/components/ui/CarMedia";

export default function OrderSummarySidebar({ car, totals }) {
  return (
    <div className="rounded-2xl border border-steel-200 p-6">
      <div className="flex gap-4">
        <div className="h-16 w-20 shrink-0 overflow-hidden rounded-lg">
          <CarMedia car={car} className="h-full w-full" />
        </div>
        <div>
          <p className="font-display text-base leading-tight tracking-tightest">{car.title}</p>
          <p className="mt-1 font-mono text-xs text-steel-500">{car.year} · {car.condition}</p>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 border-t border-steel-200 pt-5 text-sm">
        <Row label="Vehicle price" value={formatCurrency(totals.vehiclePrice)} />
        {totals.addonsTotal > 0 && <Row label="Extras & protection" value={formatCurrency(totals.addonsTotal)} />}
        <Row label="Est. tax" value={formatCurrency(totals.estimatedTax)} />
        <Row label="Documentation fee" value={formatCurrency(totals.docFee)} />
        {totals.tradeInValue > 0 && (
          <Row label="Trade-in credit" value={`– ${formatCurrency(totals.tradeInValue)}`} muted />
        )}
      </div>

      <div className="mt-4 flex items-baseline justify-between border-t border-steel-200 pt-4">
        <span className="text-sm font-medium text-ink">
          {totals.financed ? "Total financed price" : "Total due"}
        </span>
        <span className="font-mono text-xl text-ink">{formatCurrency(totals.totalDue)}</span>
      </div>

      {totals.financed && (
        <div className="mt-3 rounded-xl bg-steel-50 p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-trust">Est. monthly payment</p>
          <p className="mt-1 font-display text-2xl tracking-tightest">
            {formatCurrency(Math.round(totals.monthlyPayment))}
            <span className="text-sm font-normal text-steel-500">/mo</span>
          </p>
          <p className="mt-1 font-mono text-[11px] text-steel-400">
            {formatCurrency(totals.downPayment)} down · {totals.termMonths} mo · {totals.apr}% APR est.
          </p>
        </div>
      )}
    </div>
  );
}

function Row({ label, value, muted }) {
  return (
    <div className="flex justify-between">
      <span className="text-steel-500">{label}</span>
      <span className={`font-mono ${muted ? "text-trust" : "text-ink"}`}>{value}</span>
    </div>
  );
}
