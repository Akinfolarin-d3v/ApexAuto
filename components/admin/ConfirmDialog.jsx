"use client";

import { AnimatePresence, motion } from "framer-motion";
import Button from "@/components/ui/Button";

export default function ConfirmDialog({ open, title, description, confirmLabel = "Confirm", onConfirm, onCancel, danger }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4"
          onClick={onCancel}
        >
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm rounded-2xl bg-canvas p-6"
          >
            <h3 className="font-display text-lg tracking-tightest">{title}</h3>
            {description && <p className="mt-2 text-sm text-steel-500">{description}</p>}
            <div className="mt-6 flex justify-end gap-3">
              <Button variant="outline" size="sm" onClick={onCancel}>
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={onConfirm}
                className={danger ? "bg-velocity text-canvas hover:bg-velocity-dim" : ""}
              >
                {confirmLabel}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
