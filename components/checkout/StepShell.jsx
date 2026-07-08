"use client";

import { ArrowRight, ArrowLeft } from "lucide-react";
import Button from "@/components/ui/Button";

export default function StepShell({ title, description, children, onBack, onNext, nextLabel = "Continue", nextDisabled }) {
  return (
    <div>
      <h2 className="font-display text-2xl tracking-tightest">{title}</h2>
      {description && <p className="mt-2 max-w-xl text-sm leading-relaxed text-steel-500">{description}</p>}

      <div className="mt-8">{children}</div>

      {(onBack || onNext) && (
        <div className="mt-10 flex items-center gap-3 border-t border-steel-200 pt-6">
          {onBack && (
            <Button variant="outline" onClick={onBack}>
              <ArrowLeft size={15} strokeWidth={2} /> Back
            </Button>
          )}
          {onNext && (
            <Button onClick={onNext} disabled={nextDisabled} className="disabled:opacity-40">
              {nextLabel} <ArrowRight size={15} strokeWidth={2} />
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
