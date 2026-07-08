"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { clsx } from "@/lib/utils";

export default function FAQAccordion({ items }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="flex flex-col divide-y divide-steel-200 rounded-2xl border border-steel-200">
      {items.map((item, i) => {
        const open = openIndex === i;
        return (
          <div key={item.q}>
            <button
              type="button"
              onClick={() => setOpenIndex(open ? -1 : i)}
              className="flex w-full items-center justify-between gap-4 p-5 text-left"
              aria-expanded={open}
            >
              <span className="text-sm font-medium text-ink">{item.q}</span>
              <ChevronDown
                size={16}
                strokeWidth={1.75}
                className={clsx("shrink-0 text-steel-400 transition-transform duration-300", open && "rotate-180")}
              />
            </button>
            <div
              className={clsx(
                "grid overflow-hidden transition-all duration-300 ease-signature",
                open ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"
              )}
            >
              <div className="min-h-0 overflow-hidden px-5">
                <p className="text-sm leading-relaxed text-steel-600">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
