"use client";

export default function RangeFilter({ title, min, max, value, onChange, format = (v) => v }) {
  return (
    <div className="border-b border-steel-200 py-5">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-ink">{title}</span>
        <span className="font-mono text-xs text-steel-500">{format(value)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-4 w-full accent-ink"
      />
      <div className="mt-1 flex justify-between font-mono text-[10px] text-steel-400">
        <span>{format(min)}</span>
        <span>{format(max)}</span>
      </div>
    </div>
  );
}
