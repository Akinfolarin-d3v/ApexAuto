"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { clsx } from "@/lib/utils";

export default function FilterGroup({ title, options, selected, onChange, defaultOpen = true, counts = {} }) {
  const [open, setOpen] = useState(defaultOpen);

  function toggleOption(value) {
    onChange(selected.includes(value) ? selected.filter((v) => v !== value) : [...selected, value]);
  }

  return (
    <div className="border-b border-steel-200 py-5">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between text-left"
      >
        <span className="text-sm font-medium text-ink">{title}</span>
        <ChevronDown
          size={15}
          strokeWidth={1.75}
          className={clsx("text-steel-400 transition-transform duration-300", open && "rotate-180")}
        />
      </button>

      {open && (
        <div className="mt-4 flex flex-col gap-2.5">
          {options.map((option) => {
            const value = typeof option === "string" ? option : option.value;
            const label = typeof option === "string" ? option : option.label;
            const count = counts[value];
            return (
              <label
                key={value}
                className="flex cursor-pointer items-center justify-between gap-2 text-sm text-steel-600 transition-colors hover:text-ink"
              >
                <span className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={selected.includes(value)}
                    onChange={() => toggleOption(value)}
                    className="h-4 w-4 rounded border-steel-300 text-ink accent-ink"
                  />
                  {label}
                </span>
                {count !== undefined && (
                  <span className="font-mono text-xs text-steel-400">{count}</span>
                )}
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}
