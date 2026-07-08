"use client";

import { useState } from "react";
import { X } from "lucide-react";

export default function TagInput({ tags, onChange, placeholder = "Add a feature and press Enter" }) {
  const [draft, setDraft] = useState("");

  function addTag() {
    const value = draft.trim();
    if (value && !tags.includes(value)) onChange([...tags, value]);
    setDraft("");
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag();
    }
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1.5 rounded-full bg-steel-100 px-3 py-1.5 text-xs font-medium text-steel-700"
          >
            {tag}
            <button type="button" onClick={() => onChange(tags.filter((t) => t !== tag))} aria-label={`Remove ${tag}`}>
              <X size={12} strokeWidth={2} />
            </button>
          </span>
        ))}
      </div>
      <input
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={addTag}
        placeholder={placeholder}
        className="mt-2 w-full rounded-lg border border-steel-200 px-3 py-2.5 text-sm focus:border-ink focus:outline-none"
      />
    </div>
  );
}
