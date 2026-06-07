"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

/**
 * Parallax suave de câmera seguindo o ponteiro (mouse ou toque).
 * Mantém a câmera olhando pro centro da cena.
 */
export function Rig() {
  const { pointer, camera } = useThree();
  const target = useRef(new THREE.Vector3());

  useFrame(() => {
    // Deslocamento pequeno pra dar profundidade sem enjoar.
    target.current.set(pointer.x * 1.1, 0.4 + pointer.y * 0.6, 6.2);
    camera.position.lerp(target.current, 0.05);
    camera.lookAt(0, 0, 0);
  });

  return null;
}
