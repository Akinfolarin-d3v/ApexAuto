"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { MOTION } from "@/constants/theme";
import Button from "@/components/ui/Button";
import InstrumentStrip from "@/components/home/InstrumentStrip";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-canvas pb-16 pt-36">
      {/* Friendly decorative color blobs — replaces the old dark cinematic backdrop */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 top-10 h-72 w-72 animate-float rounded-full bg-signal/30 blur-3xl" />
        <div className="absolute -right-16 top-40 h-80 w-80 animate-float-delay rounded-full bg-trust/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-56 w-56 animate-float rounded-full bg-velocity/10 blur-3xl" />
      </div>

      <div className="container-page relative">
        <motion.div
          initial="hidden"
          animate="show"
          variants={MOTION.popUp}
          className="eyebrow bg-signal-tint text-signal-dim"
        >
          <Sparkles size={13} strokeWidth={2.5} />
          214 vehicles in stock · updated daily
        </motion.div>

        <motion.h1
          initial="hidden"
          animate="show"
          variants={MOTION.fadeUp}
          transition={{ delay: 0.1 }}
          className="mt-6 max-w-4xl font-display text-[clamp(2.75rem,7vw,6.5rem)] font-extrabold leading-[0.98] tracking-tightest text-ink"
        >
          Buy your next car
          <br />
          without the lot.
        </motion.h1>

        <motion.p
          initial="hidden"
          animate="show"
          variants={MOTION.fadeUp}
          transition={{ delay: 0.2 }}
          className="mt-6 max-w-lg text-lg leading-relaxed text-steel-600"
        >
          Browse, compare, finance, and trade in — every step of buying a
          car, reimagined for someone who'd rather not spend a Saturday at
          a dealership.
        </motion.p>

        <motion.div
          initial="hidden"
          animate="show"
          variants={MOTION.fadeUp}
          transition={{ delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Button as={Link} href="/inventory" size="lg">
            Browse Inventory <ArrowRight size={16} strokeWidth={2} />
          </Button>
          <Button as={Link} href="/financing" variant="secondary" size="lg">
            Calculate Payments
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
          className="mt-16"
        >
          <InstrumentStrip />
        </motion.div>
      </div>
    </section>
  );
}
