"use client";

import confetti from "canvas-confetti";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { useReveal } from "@/store/useReveal";

const COLORS = ["#ff7ec0", "#b06bff", "#ff9fd0", "#c79bff", "#fff0fa"];

// Corações que sobem no fundo (posições fixas pra não variar a cada render).
const HEARTS = [
  { emoji: "💜", left: "8%", delay: 0, dur: 9, size: 22 },
  { emoji: "💖", left: "20%", delay: 1.6, dur: 11, size: 16 },
  { emoji: "💗", left: "33%", delay: 0.8, dur: 8, size: 28 },
  { emoji: "💜", left: "48%", delay: 2.4, dur: 12, size: 18 },
  { emoji: "💖", left: "62%", delay: 0.4, dur: 10, size: 24 },
  { emoji: "💗", left: "76%", delay: 1.9, dur: 9.5, size: 14 },
  { emoji: "💜", left: "88%", delay: 1.1, dur: 11.5, size: 20 },
];

function celebrate() {
  const end = Date.now() + 1400;
  const frame = () => {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 60,
      origin: { x: 0, y: 0.7 },
      colors: COLORS,
      disableForReducedMotion: true,
    });
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 60,
      origin: { x: 1, y: 0.7 },
      colors: COLORS,
      disableForReducedMotion: true,
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  };
  frame();
}

export function FinalScreen() {
  const stage = useReveal((s) => s.stage);

  useEffect(() => {
    if (stage === "final") {
      const t = setTimeout(celebrate, 250);
      return () => clearTimeout(t);
    }
  }, [stage]);

  return (
    <AnimatePresence>
      {stage === "final" && (
        <motion.div
          className="fixed inset-0 z-30 flex flex-col items-center justify-center px-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute inset-0 bg-black/45 backdrop-blur-[2px]" />

          {/* Corações subindo no fundo */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
            {HEARTS.map((h, i) => (
              <motion.span
                // eslint-disable-next-line react/no-array-index-key
                key={i}
                className="absolute bottom-[-10%]"
                style={{ left: h.left, fontSize: h.size }}
                initial={{ y: 0, opacity: 0 }}
                animate={{ y: "-115vh", opacity: [0, 0.9, 0.9, 0], x: [0, 14, -10, 0] }}
                transition={{
                  duration: h.dur,
                  delay: h.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {h.emoji}
              </motion.span>
            ))}
          </div>

          <motion.div
            className="relative"
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.18, delayChildren: 0.35 } },
            }}
          >
            <motion.p
              className="mb-4 text-sm font-semibold uppercase tracking-[0.4em] text-[#e9d6ff]"
              style={{ textShadow: "0 2px 16px rgba(0,0,0,0.85)" }}
              variants={{
                hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
                show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6 } },
              }}
            >
              São todos seus
            </motion.p>
            <motion.h2
              className="font-display text-5xl font-semibold leading-tight text-white sm:text-6xl"
              style={{ textShadow: "0 4px 30px rgba(0,0,0,0.85)" }}
              variants={{
                hidden: { opacity: 0, y: 24, filter: "blur(10px)", scale: 0.96 },
                show: {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  scale: 1,
                  transition: { type: "spring", stiffness: 200, damping: 22 },
                },
              }}
            >
              Feliz Dia dos
              <br />
              <motion.span
                className="bg-gradient-to-r from-[#ff8fc8] via-[#ffb3e0] to-[#c79bff] bg-clip-text italic text-transparent"
                style={{ backgroundSize: "220% auto" }}
                animate={{ backgroundPositionX: ["0%", "220%"] }}
                transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
              >
                Namorados, Meu amor da minha vida!
              </motion.span>{" "}
              <motion.span
                className="inline-block"
                animate={{ scale: [1, 1.25, 1], rotate: [0, -8, 8, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              >
                💜
              </motion.span>
            </motion.h2>
            <motion.p
              className="mx-auto mt-6 max-w-md text-base leading-relaxed text-[#ddd0f0]"
              style={{ textShadow: "0 2px 14px rgba(0,0,0,0.85)" }}
              variants={{
                hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
                show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6 } },
              }}
            >
              Quatro presentes, mas nenhum chega perto do que é te ter por
              perto. Te amo — hoje e em todos os dias depois deste.
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
