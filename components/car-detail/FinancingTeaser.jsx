"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { estimateMonthlyPayment, FINANCE_DEFAULTS, TERM_OPTIONS } from "@/lib/finance";

export default function FinancingTeaser({ car }) {
  const [downPayment, setDownPayment] = useState(Math.round(car.price * FINANCE_DEFAULTS.downPaymentRate));
  const [termMonths, setTermMonths] = useState(FINANCE_DEFAULTS.termMonths);

  const monthly = estimateMonthlyPayment({
    price: car.price,
    downPayment,
    apr: FINANCE_DEFAULTS.apr,
    termMonths,
  });

  return (
    <div className="rounded-2xl border border-steel-200 p-6">
      <div className="flex items-baseline justify-between">
        <p className="text-xs font-bold uppercase tracking-wide text-trust">Est. Financing</p>
        <span className="font-mono text-[11px] text-steel-400">{FINANCE_DEFAULTS.apr}% APR est.</span>
      </div>
      <p className="mt-2 font-display text-3xl tracking-tightest">
        {formatCurrency(Math.round(monthly))}<span className="text-base font-normal text-steel-500">/mo</span>
      </p>

      <div className="mt-5 flex flex-col gap-4">
        <div>
          <div className="flex justify-between text-xs text-steel-500">
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
          <span className="text-xs text-steel-500">Term</span>
          <div className="mt-2 flex flex-wrap gap-2">
            {TERM_OPTIONS.map((term) => (
              <button
                key={term}
                type="button"
                onClick={() => setTermMonths(term)}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors duration-300 ${
                  termMonths === term ? "border-ink bg-ink text-canvas" : "border-steel-200 text-steel-600 hover:border-ink"
                }`}
              >
                {term} mo
              </button>
            ))}
          </div>
        </div>
      </div>

      <Link
        href={`/financing?carId=${car.id}`}
        className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-trust hover:underline"
      >
        Open full payment calculator <ArrowRight size={14} strokeWidth={2} />
      </Link>
    </div>
  );
}
