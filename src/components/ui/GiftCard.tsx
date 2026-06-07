"use client";

import confetti from "canvas-confetti";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { useEffect, useState } from "react";
import { GIFTS } from "@/lib/gifts";
import { useReveal } from "@/store/useReveal";
import { HoloArt } from "./HoloArt";

const REVEAL_DELAY_MS = 600; // deixa a tampa subir + partículas antes do card

// Cascata do conteúdo do card (entra de baixo, depois do card aparecer).
const content: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.18 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.2, 0.65, 0.3, 0.9] },
  },
};

export function GiftCard() {
  const activeGift = useReveal((s) => s.activeGift);
  const closeCard = useReveal((s) => s.closeCard);
  const [visibleId, setVisibleId] = useState<string | null>(null);

  // Mostra o card só depois da animação 3D de abertura.
  useEffect(() => {
    if (!activeGift) {
      setVisibleId(null);
      return;
    }
    const t = setTimeout(() => setVisibleId(activeGift), REVEAL_DELAY_MS);
    return () => clearTimeout(t);
  }, [activeGift]);

  // Estouro de confete na cor do presente quando o card aparece.
  useEffect(() => {
    if (!visibleId) return;
    const g = GIFTS.find((gift) => gift.id === visibleId);
    if (!g) return;
    confetti({
      particleCount: 70,
      spread: 75,
      startVelocity: 38,
      origin: { x: 0.5, y: 0.42 },
      colors: [g.color, g.glow, "#fff0fa"],
      scalar: 0.9,
      disableForReducedMotion: true,
    });
  }, [visibleId]);

  const gift = GIFTS.find((g) => g.id === visibleId) ?? null;

  return (
    <AnimatePresence>
      {gift && (
        <motion.div
          className="fixed inset-0 z-40 flex items-center justify-center p-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeCard}
          role="dialog"
          aria-modal="true"
          aria-label={gift.title}
        >
          {/* backdrop escurece a cena pra dar foco no card */}
          <div className="absolute inset-0 bg-black/55 backdrop-blur-sm" />

          <motion.div
            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 p-8 text-center"
            style={{
              background:
                "linear-gradient(160deg, rgba(32,16,46,0.92), rgba(11,5,16,0.92))",
              boxShadow: `0 30px 80px -20px ${gift.color}55, inset 0 1px 0 rgba(255,255,255,0.08)`,
            }}
            initial={{ opacity: 0, y: 40, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* halo de cor no topo */}
            <div
              className="pointer-events-none absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full opacity-50 blur-3xl"
              style={{ background: gift.color }}
              aria-hidden
            />

            {/* arte holográfica decorativa por presente */}
            {gift.art && <HoloArt kind={gift.art} />}

            <motion.div
              className="relative flex flex-col"
              variants={content}
              initial="hidden"
              animate="show"
            >
            <motion.span
              variants={item}
              className="relative inline-block self-center rounded-full border px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em]"
              style={{
                color: gift.glow,
                borderColor: `${gift.color}55`,
                background: `${gift.color}14`,
              }}
            >
              {gift.tag}
            </motion.span>

            <motion.h2
              variants={item}
              className="font-display relative mt-5 text-4xl font-medium leading-tight text-[var(--color-foreground)]"
            >
              {gift.title}
            </motion.h2>

            {gift.value && (
              <motion.p
                variants={item}
                className="relative mt-2 text-2xl font-bold"
                style={{ color: gift.glow }}
              >
                {gift.value}
              </motion.p>
            )}

            <motion.p
              variants={item}
              className="relative mt-4 text-base leading-relaxed text-[var(--color-muted)]"
            >
              {gift.message}
            </motion.p>

            <motion.div variants={item} className="relative mt-8 flex flex-col gap-3">
              {gift.action?.kind === "link" && (
                <a
                  href={gift.action.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full px-6 py-3 text-base font-semibold text-[#1a0a26] transition-transform hover:scale-[1.03]"
                  style={{
                    background: `linear-gradient(90deg, ${gift.color}, ${gift.glow})`,
                  }}
                >
                  {gift.action.label}
                </a>
              )}

              {gift.confirmation && (
                <motion.div
                  className="flex items-center justify-center gap-2 rounded-full border px-6 py-3 text-base font-semibold"
                  style={{
                    color: gift.glow,
                    borderColor: `${gift.color}55`,
                    background: `${gift.color}1f`,
                  }}
                  initial={{ scale: 0.85 }}
                  animate={{ scale: 1, boxShadow: [`0 0 0px ${gift.color}00`, `0 0 26px ${gift.color}66`, `0 0 10px ${gift.color}22`] }}
                  transition={{ duration: 1.6, ease: "easeOut" }}
                >
                  <motion.span
                    aria-hidden
                    initial={{ scale: 0, rotate: -30 }}
                    animate={{ scale: [0, 1.3, 1], rotate: 0 }}
                    transition={{ delay: 0.15, duration: 0.6, ease: "backOut" }}
                  >
                    ✓
                  </motion.span>
                  {gift.confirmation}
                </motion.div>
              )}

              <button
                type="button"
                onClick={closeCard}
                className="rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-[var(--color-muted)] transition-colors hover:bg-white/5"
              >
                Voltar pros presentes
              </button>
            </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
