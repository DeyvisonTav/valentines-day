"use client";

import dynamic from "next/dynamic";
import { FinalScreen } from "@/components/ui/FinalScreen";
import { GiftCard } from "@/components/ui/GiftCard";
import { Hud } from "@/components/ui/Hud";
import { IncomingGift } from "@/components/ui/IncomingGift";
import { IntroScreen } from "@/components/ui/IntroScreen";

// Canvas WebGL só roda no cliente — sem SSR.
const Experience = dynamic(
  () => import("@/components/canvas/Experience").then((m) => m.Experience),
  {
    ssr: false,
    loading: () => (
      <div className="fixed inset-0 flex items-center justify-center">
        <span className="text-sm tracking-[0.3em] text-[var(--color-muted)] uppercase">
          carregando…
        </span>
      </div>
    ),
  },
);

export default function Home() {
  return (
    <main className="vignette grain relative h-dvh w-screen overflow-hidden">
      {/* Cena 3D ocupa o fundo inteiro */}
      <Experience />

      {/* Overlays HTML — irmãos do Canvas, position fixed */}
      <IntroScreen />
      <Hud />
      <GiftCard />
      <IncomingGift />
      <FinalScreen />
    </main>
  );
}
