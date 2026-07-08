"use client";

import { Check } from "lucide-react";
import { clsx } from "@/lib/utils";

export default function StepIndicator({ steps, activeIndex }) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2">
      {steps.map((step, i) => {
        const state = i < activeIndex ? "done" : i === activeIndex ? "active" : "upcoming";
        return (
          <div key={step} className="flex shrink-0 items-center gap-2">
            <div
              className={clsx(
                "flex h-7 w-7 items-center justify-center rounded-full font-mono text-xs",
                state === "done" && "bg-trust text-canvas",
                state === "active" && "bg-ink text-canvas",
                state === "upcoming" && "bg-steel-100 text-steel-400"
              )}
            >
              {state === "done" ? <Check size={13} strokeWidth={2.5} /> : i + 1}
            </div>
            <span
              className={clsx(
                "whitespace-nowrap text-sm",
                state === "upcoming" ? "text-steel-400" : "text-ink font-medium"
              )}
            >
              {step}
            </span>
            {i < steps.length - 1 && <div className="mx-1 h-px w-6 bg-steel-200 sm:w-10" />}
          </div>
        );
      })}
    </div>
  );
}
