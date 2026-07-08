"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { X, ArrowRight } from "lucide-react";
import { useCompare } from "@/context/store";
import { useCars } from "@/hooks/useCars";
import CarMedia from "@/components/ui/CarMedia";

export default function CompareDock() {
  const compare = useCompare();
  const { cars } = useCars();

  const queued = cars.filter((car) => compare.ids.includes(car.id));
  const visible = compare.hydrated && queued.length >= 2;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 96, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 96, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
          className="fixed inset-x-0 bottom-5 z-30 flex justify-center px-4"
        >
          <div className="flex items-center gap-4 rounded-full border-2 border-steel-200 bg-canvas/95 px-4 py-2.5 text-ink shadow-soft backdrop-blur-xl">
            <div className="flex items-center -space-x-3">
              {queued.map((car) => (
                <div
                  key={car.id}
                  className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-canvas ring-1 ring-steel-200"
                  title={car.title}
                >
                  <CarMedia car={car} className="h-full w-full" />
                </div>
              ))}
            </div>

            <div className="hidden flex-col sm:flex">
              <span className="text-[10px] font-bold uppercase tracking-wide text-trust">
                Comparing
              </span>
              <span className="text-sm font-bold text-ink">
                {queued.length} of {compare.limit} vehicles
              </span>
            </div>

            <Link
              href="/compare"
              className="inline-flex items-center gap-1.5 rounded-full bg-signal px-4 py-2 text-sm font-bold text-ink shadow-pop transition-all duration-300 ease-bouncy hover:scale-105 hover:bg-signal-dim"
            >
              Compare <ArrowRight size={14} strokeWidth={2} />
            </Link>

            <button
              type="button"
              onClick={compare.clear}
              aria-label="Clear comparison"
              className="rounded-full p-2 text-steel-400 transition-all duration-300 ease-bouncy hover:scale-110 hover:bg-velocity-tint hover:text-velocity"
            >
              <X size={16} strokeWidth={1.75} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
