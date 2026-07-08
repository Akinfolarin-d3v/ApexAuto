"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { X } from "lucide-react";
import { NAV_LINKS } from "@/constants/nav";
import Button from "@/components/ui/Button";

export default function MobileMenu({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex flex-col bg-trust text-canvas md:hidden"
        >
          <div className="container-page flex h-20 items-center justify-between">
            <span className="flex items-center font-display text-xl tracking-tightest">
              LOISN
              <span className="ml-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-signal text-sm text-ink">
                X
              </span>
            </span>
            <button
              aria-label="Close menu"
              onClick={onClose}
              className="rounded-full p-2 transition-transform duration-300 ease-bouncy hover:scale-110 hover:bg-white/10"
            >
              <X size={22} strokeWidth={1.75} />
            </button>
          </div>

          <motion.nav
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } } }}
            className="container-page mt-6 flex flex-1 flex-col gap-2"
          >
            {NAV_LINKS.map((link) => (
              <motion.div
                key={link.href}
                variants={{
                  hidden: { opacity: 0, x: -16 },
                  show: { opacity: 1, x: 0 },
                }}
              >
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="block border-b border-white/15 py-4 font-display text-3xl tracking-tightest"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </motion.nav>

          <div className="container-page mb-10 flex flex-col gap-3">
            <Button as={Link} href="/inventory" onClick={onClose} className="w-full" size="lg">
              Browse Inventory
            </Button>
            <Button
              as={Link}
              href="/wishlist"
              onClick={onClose}
              variant="outline"
              className="w-full border-white text-canvas hover:bg-white hover:text-trust"
              size="lg"
            >
              Saved Cars
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
