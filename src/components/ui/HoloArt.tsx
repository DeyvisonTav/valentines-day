"use client";

import { motion } from "framer-motion";

export type HoloKind =
  | "headphone"
  | "wardrobe"
  | "english"
  | "breakfast"
  | "book";

/** Formas específicas de cada presente (preenchidas pelo gradiente holográfico). */
function Shapes({ kind }: { kind: HoloKind }) {
  const fill = "url(#holo)";
  const dark = "#0b0510";

  switch (kind) {
    case "headphone":
      return (
        <>
          <path
            d="M42 150 C 42 38, 198 38, 198 150"
            fill="none"
            stroke={fill}
            strokeWidth="15"
            strokeLinecap="round"
          />
          <rect x="24" y="128" width="46" height="80" rx="22" fill={fill} />
          <rect x="170" y="128" width="46" height="80" rx="22" fill={fill} />
          <rect x="33" y="142" width="28" height="52" rx="14" fill={dark} opacity="0.55" />
          <rect x="179" y="142" width="28" height="52" rx="14" fill={dark} opacity="0.55" />
        </>
      );

    case "wardrobe":
      return (
        <>
          {/* vestido */}
          <path
            d="M100 96 L140 96 L158 126 L140 134 L152 188 Q120 202 88 188 L100 134 L82 126 Z"
            fill={fill}
          />
          {/* cabide: gancho + barra dos ombros */}
          <path
            d="M120 96 L120 72 Q120 54 104 54 Q92 54 92 64"
            fill="none"
            stroke={fill}
            strokeWidth="7"
            strokeLinecap="round"
          />
          <path
            d="M120 80 L98 98 L142 98 Z"
            fill="none"
            stroke={fill}
            strokeWidth="7"
            strokeLinejoin="round"
          />
        </>
      );

    case "english":
      return (
        <>
          {/* balão grande */}
          <rect x="36" y="52" width="126" height="82" rx="26" fill={fill} />
          <path d="M66 130 L66 162 L94 132 Z" fill={fill} />
          <circle cx="78" cy="93" r="8" fill={dark} opacity="0.55" />
          <circle cx="100" cy="93" r="8" fill={dark} opacity="0.55" />
          <circle cx="122" cy="93" r="8" fill={dark} opacity="0.55" />
          {/* balão menor */}
          <rect x="140" y="120" width="74" height="56" rx="20" fill={fill} />
          <path d="M192 172 L192 198 L172 174 Z" fill={fill} />
        </>
      );

    case "breakfast":
      return (
        <>
          {/* pires */}
          <ellipse cx="120" cy="198" rx="74" ry="9" fill={fill} opacity="0.55" />
          {/* xícara */}
          <path
            d="M70 112 L170 112 L160 184 Q158 196 146 196 L94 196 Q82 196 80 184 Z"
            fill={fill}
          />
          {/* alça */}
          <path
            d="M170 126 Q206 130 206 156 Q206 182 170 180"
            fill="none"
            stroke={fill}
            strokeWidth="12"
          />
          {/* coraçãozinho na xícara */}
          <path
            d="M120 150 q -10 -14 -22 -6 q -10 8 0 20 l 22 18 l 22 -18 q 10 -12 0 -20 q -12 -8 -22 6 Z"
            fill={dark}
            opacity="0.5"
          />
          {/* vapor subindo */}
          <motion.path
            d="M104 96 q -12 -14 0 -28 q 12 -14 0 -28"
            fill="none"
            stroke={fill}
            strokeWidth="6"
            strokeLinecap="round"
            animate={{ opacity: [0.2, 0.8, 0.2], y: [0, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.path
            d="M138 96 q -12 -14 0 -28 q 12 -14 0 -28"
            fill="none"
            stroke={fill}
            strokeWidth="6"
            strokeLinecap="round"
            animate={{ opacity: [0.2, 0.8, 0.2], y: [0, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
          />
        </>
      );

    case "book":
      return (
        <>
          {/* livro aberto: duas páginas */}
          <path
            d="M120 78 C 96 66, 64 66, 44 78 L44 166 C64 154, 96 154, 120 166 Z"
            fill={fill}
          />
          <path
            d="M120 78 C 144 66, 176 66, 196 78 L196 166 C176 154, 144 154, 120 166 Z"
            fill={fill}
          />
          {/* lombada */}
          <rect x="117" y="78" width="6" height="88" fill={dark} opacity="0.45" />
          {/* linhas de texto */}
          <g stroke={dark} strokeWidth="4" opacity="0.45" strokeLinecap="round">
            <line x1="58" y1="96" x2="104" y2="90" />
            <line x1="58" y1="110" x2="104" y2="104" />
            <line x1="58" y1="124" x2="104" y2="118" />
            <line x1="136" y1="90" x2="182" y2="96" />
            <line x1="136" y1="104" x2="182" y2="110" />
            <line x1="136" y1="118" x2="182" y2="124" />
          </g>
        </>
      );
  }
}

/**
 * Arte decorativa holográfica atrás do card: gradiente iridescente girando,
 * brilho neon, flutuação suave e um reflexo que desliza. A forma vem de `kind`.
 */
export function HoloArt({ kind }: { kind: HoloKind }) {
  return (
    <motion.div
      className="pointer-events-none absolute inset-0 flex items-center justify-center"
      aria-hidden
      initial={{ opacity: 0, scale: 0.85, y: 14 }}
      animate={{ opacity: 0.42, scale: 1, y: [0, -10, 0] }}
      transition={{
        opacity: { duration: 1, delay: 0.2 },
        scale: { type: "spring", stiffness: 140, damping: 18, delay: 0.2 },
        y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
      }}
    >
      <motion.svg
        viewBox="0 0 240 220"
        className="h-[80%] w-[80%]"
        style={{ filter: "drop-shadow(0 0 24px rgba(255,126,192,0.5))" }}
        animate={{ rotate: [-4, 4, -4] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      >
        <defs>
          <linearGradient id="holo" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ff7ec0" />
            <stop offset="28%" stopColor="#b06bff" />
            <stop offset="52%" stopColor="#7ad7ff" />
            <stop offset="74%" stopColor="#ff9fd0" />
            <stop offset="100%" stopColor="#c79bff" />
            <animateTransform
              attributeName="gradientTransform"
              type="rotate"
              from="0 0.5 0.5"
              to="360 0.5 0.5"
              dur="7s"
              repeatCount="indefinite"
            />
          </linearGradient>
        </defs>

        <Shapes kind={kind} />

        {/* reflexo holográfico que desliza */}
        <motion.rect
          x="0"
          y="0"
          width="60"
          height="220"
          fill="#ffffff"
          opacity="0.18"
          style={{ mixBlendMode: "overlay" }}
          animate={{ x: [-80, 280] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.5 }}
        />
      </motion.svg>
    </motion.div>
  );
}
