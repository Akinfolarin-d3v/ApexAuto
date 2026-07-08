"use client";

import { formatCurrency } from "@/lib/utils";
import StepShell from "@/components/checkout/StepShell";
import TradeInForm from "@/components/checkout/TradeInForm";
import Button from "@/components/ui/Button";

export default function TradeInStep({ tradeInValue, setTradeInValue, onBack, onNext }) {
  return (
    <StepShell
      title="Have a car to trade in?"
      description="Apply an estimated trade-in value toward this purchase — or skip this step entirely."
    >
      <div className="max-w-lg">
        <TradeInForm onEstimate={(value) => setTradeInValue(value)} />
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-steel-200 pt-6">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        {tradeInValue > 0 ? (
          <Button onClick={onNext}>
            Apply {formatCurrency(tradeInValue)} & Continue
          </Button>
        ) : (
          <Button onClick={onNext} variant="dark">
            Skip Trade-In
          </Button>
        )}
      </div>
    </StepShell>
  );
}
