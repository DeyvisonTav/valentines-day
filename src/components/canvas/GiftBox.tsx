"use client";

import { Float } from "@react-three/drei";
import { ThreeEvent, useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import type { Gift } from "@/lib/gifts";

interface GiftBoxProps {
  gift: Gift;
  opened: boolean;
  /** Há algum card aberto agora? (trava cliques nas outras caixas) */
  busy: boolean;
  onOpen: (id: string) => void;
}

/**
 * Estouro de partículas que dispara ao montar (a caixa renderiza este
 * componente só quando abre). Anima ~1.1s e some sozinho.
 */
function Burst({ color }: { color: string }) {
  const COUNT = 46;
  const points = useRef<THREE.Points>(null);
  const life = useRef(0);

  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const velocities = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const speed = 1.6 + Math.random() * 2.2;
      velocities[i * 3] = Math.sin(phi) * Math.cos(theta) * speed;
      velocities[i * 3 + 1] = Math.abs(Math.cos(phi)) * speed * 1.3 + 0.6;
      velocities[i * 3 + 2] = Math.sin(phi) * Math.sin(theta) * speed;
    }
    return { positions, velocities };
  }, []);

  useFrame((_, dt) => {
    const p = points.current;
    if (!p) return;
    life.current += dt;
    const t = life.current;
    const arr = p.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < COUNT; i++) {
      arr[i * 3] = velocities[i * 3] * t;
      arr[i * 3 + 1] = velocities[i * 3 + 1] * t - 2.4 * t * t; // gravidade
      arr[i * 3 + 2] = velocities[i * 3 + 2] * t;
    }
    p.geometry.attributes.position.needsUpdate = true;
    const mat = p.material as THREE.PointsMaterial;
    mat.opacity = Math.max(0, 1 - t / 1.1);
    p.scale.setScalar(1 + t * 0.4);
  });

  return (
    <points ref={points} position={[0, 0.5, 0]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={0.14}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        toneMapped={false}
      />
    </points>
  );
}

export function GiftBox({ gift, opened, busy, onOpen }: GiftBoxProps) {
  const lid = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Mesh>(null);
  const root = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  const color = useMemo(() => new THREE.Color(gift.color), [gift.color]);

  useFrame((_, dt) => {
    const k = Math.min(1, dt * 6); // fator de lerp estável

    // Tampa: sobe e gira ao abrir.
    if (lid.current) {
      const targetY = opened ? 1.55 : 0.46;
      const targetRot = opened ? 0.5 : 0;
      lid.current.position.y += (targetY - lid.current.position.y) * k;
      lid.current.rotation.z += (targetRot - lid.current.rotation.z) * k;
      lid.current.rotation.y += (targetRot * 1.4 - lid.current.rotation.y) * k;
    }

    // Escala no hover (feedback de clicável).
    if (root.current) {
      const s = hovered && !busy && !opened ? 1.08 : 1;
      const cur = root.current.scale.x;
      root.current.scale.setScalar(cur + (s - cur) * k);
    }

    // Anel girando quando aberto.
    if (ring.current) {
      ring.current.rotation.z += dt * 0.8;
    }
  });

  const emissiveIntensity = opened ? 1.5 : hovered ? 0.7 : 0.35;

  const handleOpen = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    if (opened || busy) return;
    onOpen(gift.id);
  };

  const setCursor = (on: boolean) => {
    setHovered(on);
    if (typeof document !== "undefined") {
      document.body.style.cursor = on && !busy && !opened ? "pointer" : "auto";
    }
  };

  return (
    <Float
      speed={1.4}
      rotationIntensity={0.25}
      floatIntensity={0.7}
      floatingRange={[-0.12, 0.12]}
    >
      <group
        ref={root}
        position={gift.position}
        onPointerDown={handleOpen}
        onPointerOver={() => setCursor(true)}
        onPointerOut={() => setCursor(false)}
      >
        {/* Base da caixa */}
        <mesh castShadow position={[0, 0, 0]}>
          <boxGeometry args={[1, 0.85, 1]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={emissiveIntensity}
            roughness={0.35}
            metalness={0.15}
            toneMapped={false}
          />
        </mesh>

        {/* Fita vertical na base (cruz) */}
        <mesh position={[0, 0, 0.001]}>
          <boxGeometry args={[0.16, 0.87, 1.02]} />
          <meshStandardMaterial
            color="#fff0fa"
            emissive={gift.glow}
            emissiveIntensity={opened ? 1.2 : 0.5}
            roughness={0.25}
            toneMapped={false}
          />
        </mesh>
        <mesh position={[0, 0, 0.001]}>
          <boxGeometry args={[1.02, 0.87, 0.16]} />
          <meshStandardMaterial
            color="#fff0fa"
            emissive={gift.glow}
            emissiveIntensity={opened ? 1.2 : 0.5}
            roughness={0.25}
            toneMapped={false}
          />
        </mesh>

        {/* Tampa + laço (anima junto) */}
        <group ref={lid} position={[0, 0.46, 0]}>
          <mesh castShadow>
            <boxGeometry args={[1.12, 0.26, 1.12]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={emissiveIntensity}
              roughness={0.3}
              metalness={0.2}
              toneMapped={false}
            />
          </mesh>
          {/* Laço: dois toros formando o nó */}
          <mesh position={[-0.16, 0.2, 0]} rotation={[0, 0, 0.5]}>
            <torusGeometry args={[0.17, 0.06, 12, 24]} />
            <meshStandardMaterial
              color="#fff0fa"
              emissive={gift.glow}
              emissiveIntensity={1}
              toneMapped={false}
            />
          </mesh>
          <mesh position={[0.16, 0.2, 0]} rotation={[0, 0, -0.5]}>
            <torusGeometry args={[0.17, 0.06, 12, 24]} />
            <meshStandardMaterial
              color="#fff0fa"
              emissive={gift.glow}
              emissiveIntensity={1}
              toneMapped={false}
            />
          </mesh>
          <mesh position={[0, 0.16, 0]}>
            <sphereGeometry args={[0.09, 16, 16]} />
            <meshStandardMaterial
              color="#fff0fa"
              emissive={gift.glow}
              emissiveIntensity={1.2}
              toneMapped={false}
            />
          </mesh>
        </group>

        {/* Anel girando + estouro: só quando aberto */}
        {opened && (
          <>
            <mesh ref={ring} rotation={[Math.PI / 2, 0, 0]} position={[0, 0.1, 0]}>
              <torusGeometry args={[1.05, 0.022, 8, 64]} />
              <meshStandardMaterial
                color={gift.glow}
                emissive={gift.glow}
                emissiveIntensity={2}
                toneMapped={false}
              />
            </mesh>
            <Burst color={gift.glow} />
          </>
        )}
      </group>
    </Float>
  );
}
