import { clsx } from "@/lib/utils";

const VARIANTS = {
  available: "bg-trust-tint text-trust-dim",
  reserved: "bg-signal-tint text-signal-dim",
  sold: "bg-steel-200 text-steel-600",
  featured: "bg-ink text-signal",
  alert: "bg-velocity-tint text-velocity-dim",
};

export default function Badge({ variant = "available", className, children }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide",
        VARIANTS[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
