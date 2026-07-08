"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowRight } from "lucide-react";
import TradeInForm from "@/components/checkout/TradeInForm";
import Button from "@/components/ui/Button";

export default function TradeInPageView() {
  const searchParams = useSearchParams();
  const applyToCarId = searchParams.get("applyToCarId");
  const [hasEstimate, setHasEstimate] = useState(false);

  return (
    <div className="container-page py-10">
      <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
        <div>
          <p className="eyebrow bg-trust-tint text-trust-dim">Trade-in</p>
          <h1 className="mt-2 font-display text-4xl tracking-tightest md:text-5xl">
            What's your car worth?
          </h1>
          <p className="mt-4 max-w-md text-steel-600">
            Answer a few questions for an instant estimate. Apply it toward
            anything in stock, or just see where you stand.
          </p>

          {applyToCarId && (
            <div className="mt-6 rounded-xl bg-steel-50 p-4 text-sm text-steel-600">
              We'll apply this estimate toward your selected vehicle once
              you continue to checkout.
            </div>
          )}

          <div className="mt-10 hidden lg:block">
            <div className="grid gap-4">
              {["Tell us about your car", "Get an instant estimate", "Apply it toward your next purchase"].map(
                (step, i) => (
                  <div key={step} className="flex items-center gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink font-mono text-xs text-canvas">
                      {i + 1}
                    </span>
                    <span className="text-sm text-steel-600">{step}</span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-steel-200 p-6 sm:p-8">
          <TradeInForm onEstimate={() => setHasEstimate(true)} />

          {hasEstimate && (
            <Button
              as={Link}
              href={applyToCarId ? `/checkout?carId=${applyToCarId}` : "/inventory"}
              className="mt-6 w-full"
            >
              {applyToCarId ? "Continue to Checkout" : "Browse Inventory"} <ArrowRight size={15} strokeWidth={2} />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
