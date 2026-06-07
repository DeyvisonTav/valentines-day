"use client";

import { Sparkles } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { useMemo } from "react";
import { GIFTS } from "@/lib/gifts";
import { useReveal } from "@/store/useReveal";
import { GiftBox } from "./GiftBox";
import { Rig } from "./Rig";

/** Conteúdo da cena (dentro do Canvas, pode usar hooks do r3f). */
function Scene() {
  const { viewport } = useThree();
  const opened = useReveal((s) => s.opened);
  const activeGift = useReveal((s) => s.activeGift);
  const open = useReveal((s) => s.open);

  // Reescala o arco de caixas pra caber na viewport (mobile inclui).
  const scale = useMemo(
    () => Math.min(1, (viewport.width * 0.94) / 7.6),
    [viewport.width],
  );

  return (
    <>
      <color attach="background" args={["#0b0510"]} />
      <fog attach="fog" args={["#0b0510", 8, 18]} />

      <ambientLight intensity={0.35} />
      <hemisphereLight args={["#c79bff", "#1a0a26", 0.6]} />
      <pointLight position={[-5, 4, 5]} intensity={60} color="#ff7ec0" />
      <pointLight position={[5, 3, 4]} intensity={55} color="#b06bff" />
      <pointLight position={[0, -3, 3]} intensity={20} color="#ff9fd0" />

      <group scale={scale}>
        {GIFTS.map((gift) => (
          <GiftBox
            key={gift.id}
            gift={gift}
            opened={opened.has(gift.id)}
            busy={activeGift !== null}
            onOpen={open}
          />
        ))}
      </group>

      {/* Poeira de brilho rosa/roxo no fundo */}
      <Sparkles
        count={90}
        scale={[16, 9, 7]}
        position={[0, 0.5, -2]}
        size={3}
        speed={0.25}
        opacity={0.7}
        color="#ff9fd0"
      />
      <Sparkles
        count={70}
        scale={[14, 8, 6]}
        position={[0, 0.5, -1]}
        size={2}
        speed={0.18}
        opacity={0.6}
        color="#c79bff"
      />

      <Rig />

      <EffectComposer>
        <Bloom
          mipmapBlur
          intensity={1.25}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          radius={0.8}
        />
      </EffectComposer>
    </>
  );
}

export function Experience() {
  return (
    <Canvas
      className="!fixed inset-0"
      dpr={[1, 2]}
      camera={{ position: [0, 0.4, 6.2], fov: 45 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
    >
      <Scene />
    </Canvas>
  );
}
