"use client";

import { motion, type Variants } from "framer-motion";

const EASE = [0.2, 0.65, 0.3, 0.9] as const;

/**
 * Texto que entra palavra por palavra (fade + sobe + desfoque),
 * preservando a quebra de linha natural. `delay` adia o início.
 */
export function Words({
  text,
  className,
  delay = 0,
  stagger = 0.09,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };
  const word: Variants = {
    hidden: { opacity: 0, y: "0.5em", filter: "blur(10px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.65, ease: EASE },
    },
  };

  return (
    <motion.span
      className={className}
      variants={container}
      initial="hidden"
      animate="show"
      aria-label={text}
    >
      {text.split(" ").map((w, i) => (
        <motion.span
          // eslint-disable-next-line react/no-array-index-key
          key={`${w}-${i}`}
          variants={word}
          className="mr-[0.25em] inline-block"
          aria-hidden
        >
          {w}
        </motion.span>
      ))}
    </motion.span>
  );
}
