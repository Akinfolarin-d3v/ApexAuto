"use client";

import { useState } from "react";
import { formatCurrency } from "@/lib/utils";
import StepShell from "@/components/checkout/StepShell";
import Button from "@/components/ui/Button";

export default function ReviewStep({ car, trim, payment, addons, tradeInValue, totals, onBack, onSubmit, submitting }) {
  const [confirmed, setConfirmed] = useState(false);

  return (
    <StepShell title="Review your order" description="Double check everything below before we place your order.">
      <div className="flex flex-col divide-y divide-steel-200 rounded-2xl border border-steel-200">
        <SummaryRow label="Vehicle" value={`${car.title} (${car.year})`} />
        <SummaryRow label="Trim" value={trim.label} />
        <SummaryRow label="Payment method" value={payment.method === "finance" ? "Financed" : "Paid in full"} />
        {payment.method === "finance" && (
          <SummaryRow
            label="Financing terms"
            value={`${formatCurrency(payment.downPayment)} down · ${payment.termMonths} mo · ${payment.apr}% APR est.`}
          />
        )}
        <SummaryRow
          label="Extras & protection"
          value={addons.length ? addons.map((a) => a.label).join(", ") : "None selected"}
        />
        {tradeInValue > 0 && <SummaryRow label="Trade-in credit" value={formatCurrency(tradeInValue)} />}
        <SummaryRow label={payment.method === "finance" ? "Est. monthly payment" : "Total due"} value={
          payment.method === "finance"
            ? `${formatCurrency(Math.round(totals.monthlyPayment))}/mo`
            : formatCurrency(totals.totalDue)
        } emphasis />
      </div>

      <label className="mt-6 flex cursor-pointer items-start gap-3 text-sm text-steel-600">
        <input
          type="checkbox"
          checked={confirmed}
          onChange={(e) => setConfirmed(e.target.checked)}
          className="mt-1 h-4 w-4 rounded border-steel-300 accent-ink"
        />
        I've reviewed the order details above and I'm ready to submit this order.
      </label>

      <div className="mt-8 flex items-center gap-3 border-t border-steel-200 pt-6">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onSubmit} disabled={!confirmed || submitting} className="disabled:opacity-40">
          {submitting ? "Placing order…" : "Place Order"}
        </Button>
      </div>
    </StepShell>
  );
}

function SummaryRow({ label, value, emphasis }) {
  return (
    <div className="flex items-center justify-between p-5">
      <span className="text-sm text-steel-500">{label}</span>
      <span className={emphasis ? "font-mono text-lg text-ink" : "text-sm font-medium text-ink"}>{value}</span>
    </div>
  );
}
