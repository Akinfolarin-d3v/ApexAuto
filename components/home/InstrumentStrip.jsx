"use client";

import { useEffect, useRef, useState } from "react";
import { animate } from "framer-motion";
import { ShieldCheck, Star, Car, Clock } from "lucide-react";
import { clsx } from "@/lib/utils";

const STATS = [
  { icon: ShieldCheck, label: "Point Inspection", value: 150, suffix: "+", accent: "bg-trust-tint text-trust" },
  { icon: Star, label: "Customer Rating", value: 4.9, decimals: 1, suffix: "/5", accent: "bg-signal-tint text-signal-dim" },
  { icon: Car, label: "Vehicles In Stock", value: 214, accent: "bg-steel-100 text-ink" },
  { icon: Clock, label: "Day Avg. Handoff", value: 3, accent: "bg-trust-tint text-trust" },
];

function Readout({ icon: Icon, label, value, suffix = "", decimals = 0, accent }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const controls = animate(0, value, {
      duration: 1.6,
      delay: 0.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [value]);

  return (
    <div className="flex items-center gap-3 border-l-2 border-steel-200 px-6 first:border-l-0 first:pl-0">
      <span className={clsx("flex h-10 w-10 shrink-0 items-center justify-center rounded-full", accent)}>
        <Icon size={18} strokeWidth={2} />
      </span>
      <div className="flex flex-col">
        <span className="font-display text-xl font-bold text-ink md:text-2xl">
          {display.toLocaleString("en-US", {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          })}
          {suffix}
        </span>
        <span className="text-[11px] font-bold uppercase tracking-wide text-steel-500">{label}</span>
      </div>
    </div>
  );
}

export default function InstrumentStrip() {
  return (
    <div className="relative overflow-hidden rounded-3xl border-2 border-steel-200 bg-canvas/80 backdrop-blur-md">
      <div className="container-page relative flex flex-wrap items-center gap-x-6 gap-y-5 py-6">
        {STATS.map((stat) => (
          <Readout key={stat.label} {...stat} />
        ))}
      </div>
    </div>
  );
}
