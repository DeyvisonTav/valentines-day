"use client";

import { AnimatePresence, motion } from "framer-motion";
import { GIFT_COUNT, GIFTS } from "@/lib/gifts";
import { useReveal } from "@/store/useReveal";

export function Hud() {
  const stage = useReveal((s) => s.stage);
  const opened = useReveal((s) => s.opened);

  return (
    <AnimatePresence>
      {stage === "exploring" && (
        <motion.div
          className="fixed inset-x-0 top-0 z-20 flex flex-col items-center gap-3 px-6 pt-6"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-muted)]">
            {opened.size} de {GIFT_COUNT} presentes
          </p>
          <div className="flex gap-2" aria-hidden>
            {GIFTS.map((g) => {
              const done = opened.has(g.id);
              return (
                <motion.span
                  key={g.id}
                  className="h-1.5 w-8 rounded-full"
                  animate={{
                    backgroundColor: done ? g.color : "rgba(255,255,255,0.14)",
                    boxShadow: done ? `0 0 12px ${g.color}` : "0 0 0px transparent",
                    scaleX: done ? [1, 1.35, 1] : 1,
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
