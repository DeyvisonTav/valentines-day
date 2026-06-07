"use client";

import { AnimatePresence, motion, type Variants } from "framer-motion";
import { INCOMING_GIFT } from "@/lib/gifts";
import { useReveal } from "@/store/useReveal";
import { HoloArt } from "./HoloArt";

const g = INCOMING_GIFT;

// Paradas do rastreio (posição em % ao longo do trilho).
const TRACK_START = 6;
const TRACK_END = 94;
const STOPS: { label: string; pos: number; dest?: boolean }[] = [
  { label: "Pedido feito", pos: 6 },
  { label: "Enviado", pos: 35.3 },
  { label: "A caminho", pos: 64.6 },
  { label: "Chega 16 jun", pos: 94, dest: true },
];

// Pacote (e preenchimento) param onde está "A caminho".
const PACKAGE_POS = 64.6;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.25 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: [0.2, 0.65, 0.3, 0.9] },
  },
};

export function IncomingGift() {
  const stage = useReveal((s) => s.stage);
  const finish = useReveal((s) => s.finish);

  return (
    <AnimatePresence>
      {stage === "incoming" && (
        <motion.div
          className="fixed inset-0 z-40 flex items-center justify-center p-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          <motion.div
            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 p-8 text-center"
            style={{
              background:
                "linear-gradient(160deg, rgba(32,16,46,0.94), rgba(11,5,16,0.94))",
              boxShadow: `0 30px 80px -20px ${g.color}55, inset 0 1px 0 rgba(255,255,255,0.08)`,
            }}
            initial={{ opacity: 0, y: 40, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 240, damping: 26 }}
          >
            <HoloArt kind={g.art} />

            <motion.div
              className="relative flex flex-col"
              variants={container}
              initial="hidden"
              animate="show"
            >
              <motion.span
                variants={item}
                className="relative inline-block self-center rounded-full border px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em]"
                style={{
                  color: g.glow,
                  borderColor: `${g.color}55`,
                  background: `${g.color}14`,
                }}
              >
                {g.tag} 😉
              </motion.span>

              <motion.h2
                variants={item}
                className="font-display relative mt-5 text-3xl font-medium leading-tight text-white"
              >
                {g.title}
              </motion.h2>

              <motion.p
                variants={item}
                className="relative mt-1 text-sm italic text-[var(--color-muted)]"
              >
                {g.author}
              </motion.p>

              <motion.p
                variants={item}
                className="relative mt-4 text-base leading-relaxed text-[#ddd0f0]"
              >
                {g.message}
              </motion.p>

              {/* Rastreio animado */}
              <motion.div variants={item} className="relative mt-8 h-24">
                {/* trilho base */}
                <div
                  className="absolute top-3 h-[3px] rounded-full bg-white/15"
                  style={{ left: `${TRACK_START}%`, right: `${100 - TRACK_END}%` }}
                />
                {/* preenchimento */}
                <motion.div
                  className="absolute top-3 h-[3px] rounded-full"
                  style={{
                    left: `${TRACK_START}%`,
                    background: `linear-gradient(90deg, ${g.color}, ${g.glow})`,
                    boxShadow: `0 0 12px ${g.color}`,
                  }}
                  initial={{ width: "0%" }}
                  animate={{ width: `${PACKAGE_POS - TRACK_START}%` }}
                  transition={{ delay: 0.7, duration: 1.6, ease: "easeInOut" }}
                />

                {/* pacote viajando */}
                <motion.div
                  className="absolute top-3 -translate-x-1/2 -translate-y-1/2 text-xl"
                  style={{ filter: `drop-shadow(0 0 8px ${g.color})` }}
                  initial={{ left: `${TRACK_START}%` }}
                  animate={{ left: `${PACKAGE_POS}%` }}
                  transition={{ delay: 0.7, duration: 1.6, ease: "easeInOut" }}
                >
                  📦
                </motion.div>

                {/* paradas */}
                {STOPS.map((s, i) => {
                  const reached = s.pos <= PACKAGE_POS;
                  return (
                    <div
                      key={s.label}
                      className="absolute top-3 -translate-x-1/2 -translate-y-1/2"
                      style={{ left: `${s.pos}%` }}
                    >
                      <motion.span
                        className="block h-3.5 w-3.5 rounded-full border-2"
                        style={{
                          borderColor: reached ? g.color : "rgba(255,255,255,0.3)",
                          background: reached ? g.color : "transparent",
                          boxShadow: reached ? `0 0 10px ${g.color}` : "none",
                        }}
                        initial={{ scale: 0 }}
                        animate={
                          s.dest
                            ? { scale: [1, 1.35, 1] }
                            : { scale: reached ? [0, 1.3, 1] : 1 }
                        }
                        transition={
                          s.dest
                            ? { duration: 1.6, repeat: Infinity, ease: "easeInOut" }
                            : { delay: 0.7 + (i / STOPS.length) * 1.6, duration: 0.4 }
                        }
                      />
                      <span
                        className="absolute left-1/2 top-6 w-20 -translate-x-1/2 text-[11px] leading-tight"
                        style={{
                          color: s.dest ? g.glow : reached ? "#e9d6ff" : "rgba(200,182,224,0.6)",
                          fontWeight: s.dest ? 700 : 500,
                        }}
                      >
                        {s.label}
                      </span>
                    </div>
                  );
                })}
              </motion.div>

              <motion.div variants={item} className="relative mt-4 flex flex-col gap-3">
                <span
                  className="mx-auto rounded-full px-4 py-1.5 text-sm font-semibold"
                  style={{ color: g.glow, background: `${g.color}1f` }}
                >
                  ⏳ {g.eta} — vale a espera
                </span>
                <button
                  type="button"
                  onClick={finish}
                  className="rounded-full px-6 py-3 text-base font-semibold text-[#1a0a26] transition-transform hover:scale-[1.03]"
                  style={{
                    background: `linear-gradient(90deg, ${g.color}, ${g.glow})`,
                  }}
                >
                  Ver mensagem final →
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
