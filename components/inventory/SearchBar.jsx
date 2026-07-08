"use client";

import { Search, X } from "lucide-react";

export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative w-full sm:w-72">
      <Search size={16} strokeWidth={1.75} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-steel-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search make, model, or trim"
        className="w-full rounded-full border border-steel-200 bg-canvas py-2.5 pl-10 pr-9 text-sm text-ink placeholder:text-steel-400 focus:border-ink focus:outline-none"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-steel-400 hover:text-ink"
        >
          <X size={14} strokeWidth={1.75} />
        </button>
      )}
    </div>
  );
}
