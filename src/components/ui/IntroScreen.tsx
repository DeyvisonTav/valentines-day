"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useReveal } from "@/store/useReveal";
import { Words } from "./AnimatedText";

export function IntroScreen() {
  const stage = useReveal((s) => s.stage);
  const start = useReveal((s) => s.start);

  return (
    <AnimatePresence>
      {stage === "intro" && (
        <motion.div
          className="fixed inset-0 z-20 flex flex-col items-center justify-center px-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.06, filter: "blur(6px)", transition: { duration: 0.7, ease: "easeInOut" } }}
        >
          {/* Scrim: escurece o fundo 3D atrás do texto pra garantir leitura */}
          <motion.div
            className="pointer-events-none absolute inset-0"
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            style={{
              background:
                "radial-gradient(60% 55% at 50% 50%, rgba(7,3,13,0.92), rgba(7,3,13,0.7) 45%, rgba(7,3,13,0) 80%)",
            }}
          />

          {/* Brilho que respira atrás do título */}
          <motion.div
            className="pointer-events-none absolute h-64 w-64 rounded-full blur-3xl"
            aria-hidden
            style={{ background: "rgba(255,126,192,0.22)" }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: [0.35, 0.6, 0.35], scale: [0.95, 1.1, 0.95] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative flex flex-col items-center">
            <motion.p
              className="mb-4 text-sm font-semibold uppercase tracking-[0.4em] text-[#e9d6ff]"
              style={{ textShadow: "0 2px 16px rgba(0,0,0,0.8)" }}
              initial={{ opacity: 0, y: 12, letterSpacing: "0.6em" }}
              animate={{ opacity: 1, y: 0, letterSpacing: "0.4em" }}
              transition={{ delay: 0.2, duration: 0.9, ease: "easeOut" }}
            >
              Feliz Dia dos Namorados
            </motion.p>

            <h1
              className="font-display text-5xl font-semibold leading-tight text-white sm:text-7xl"
              style={{ textShadow: "0 4px 30px rgba(0,0,0,0.85)" }}
            >
              <Words text="Meu amor da minha vida!!" delay={0.45} className="block" />
              <motion.span
                className="block bg-gradient-to-r from-[#ff8fc8] via-[#ffb3e0] to-[#c79bff] bg-clip-text italic text-transparent"
                style={{ backgroundSize: "220% auto", filter: "drop-shadow(0 2px 18px rgba(255,126,192,0.45))" }}
                initial={{ opacity: 0, y: 18, filter: "blur(12px)" }}
                animate={{
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  backgroundPositionX: ["0%", "220%"],
                }}
                transition={{
                  opacity: { delay: 1.1, duration: 0.7 },
                  y: { delay: 1.1, duration: 0.7, ease: "easeOut" },
                  filter: { delay: 1.1, duration: 0.7 },
                  backgroundPositionX: { duration: 7, repeat: Infinity, ease: "linear" },
                }}
              >
                tem algo pra você
              </motion.span>
            </h1>

            <motion.p
              className="mt-6 max-w-md text-lg leading-relaxed text-[#ddd0f0]"
              style={{ textShadow: "0 2px 14px rgba(0,0,0,0.85)" }}
              initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 1.5, duration: 0.7 }}
            >
              Quatro presentes flutuam aí no escuro. Toque em cada um pra
              descobrir, um de cada vez.
            </motion.p>

            <motion.button
              type="button"
              onClick={start}
              className="group mt-10 rounded-full border border-[#ff7ec0]/50 bg-black/40 px-9 py-3.5 text-base font-semibold text-white backdrop-blur-md"
              initial={{ opacity: 0, y: 18 }}
              animate={{
                opacity: 1,
                y: 0,
                boxShadow: [
                  "0 0 24px rgba(255,126,192,0.3)",
                  "0 0 44px rgba(255,126,192,0.6)",
                  "0 0 24px rgba(255,126,192,0.3)",
                ],
              }}
              transition={{
                opacity: { delay: 1.85, duration: 0.6 },
                y: { delay: 1.85, duration: 0.6, ease: "easeOut" },
                boxShadow: { delay: 1.85, duration: 2.6, repeat: Infinity, ease: "easeInOut" },
              }}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(0,0,0,0.6)" }}
              whileTap={{ scale: 0.96 }}
            >
              Começar a revelar
              <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">
                →
              </span>
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
