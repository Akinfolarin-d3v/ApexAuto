"use client";

import { ChevronDown } from "lucide-react";
import { SORT_OPTIONS } from "@/constants/filters";

export default function SortSelect({ value, onChange }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none rounded-full border border-steel-200 bg-canvas py-2.5 pl-4 pr-9 text-sm text-ink focus:border-ink focus:outline-none"
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            Sort: {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown size={14} strokeWidth={1.75} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-steel-400" />
    </div>
  );
}
