"use client";

import { clsx } from "@/lib/utils";
import { CATEGORIES } from "@/lib/cars";

const TABS = [{ slug: "all", label: "All Inventory" }, ...CATEGORIES];

export default function CategoryTabs({ value, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {TABS.map((tab) => (
        <button
          key={tab.slug}
          type="button"
          onClick={() => onChange(tab.slug)}
          className={clsx(
            "rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-300",
            value === tab.slug
              ? "border-ink bg-ink text-canvas"
              : "border-steel-200 text-steel-600 hover:border-ink hover:text-ink"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
