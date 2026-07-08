"use client";

import { useEffect, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import { useRef } from "react";

const METRICS = [
  { label: "Cars sold to date", value: 48200, suffix: "+" },
  { label: "Average customer rating", value: 4.9, decimals: 1, suffix: " / 5" },
  { label: "Avg. time to key handoff", value: 3, suffix: " days" },
  { label: "Inspection points per car", value: 150, suffix: "+" },
];

function Counter({ value, suffix = "", decimals = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref} className="font-display text-4xl tracking-tightest md:text-5xl">
      {display.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}

export default function TrustMetrics() {
  return (
    <section className="border-t-2 border-steel-200 bg-trust py-24 text-canvas">
      <div className="container-page grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {METRICS.map((metric, i) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <Counter value={metric.value} suffix={metric.suffix} decimals={metric.decimals} />
            <p className="mt-2 text-xs font-bold uppercase tracking-wide text-white/70">
              {metric.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
