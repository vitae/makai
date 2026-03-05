"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import * as THREE from "three";

/* ─── Animated ocean wave ribbon ─── */
function WaveRibbon({
  y,
  color,
  amplitude,
  speed,
  segments = 120,
}: {
  y: number;
  color: string;
  amplitude: number;
  speed: number;
  segments?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime() * speed;
    const geo = meshRef.current.geometry as THREE.BufferGeometry;
    const pos = geo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i <= segments; i++) {
      const x = (i / segments) * 20 - 10;
      const waveY =
        Math.sin(x * 0.8 + t) * amplitude +
        Math.sin(x * 1.4 + t * 1.3) * amplitude * 0.5;
      const idx = i * 2;
      pos.setXYZ(idx, x, y + waveY, 0);
      pos.setXYZ(idx + 1, x, y + waveY - 0.25, 0);
    }
    pos.needsUpdate = true;
  });

  const { geometry } = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const count = (segments + 1) * 2;
    const positions = new Float32Array(count * 3);
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const indices: number[] = [];
    for (let i = 0; i < segments; i++) {
      const a = i * 2;
      indices.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
    }
    geo.setIndex(indices);
    return { geometry: geo };
  }, [segments]);

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshBasicMaterial
        color={color}
        side={THREE.DoubleSide}
        transparent
        opacity={0.55}
      />
    </mesh>
  );
}

/* ─── Shark fin silhouette ─── */
function SharkFin({ position }: { position: [number, number, number] }) {
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0, 0);
    s.lineTo(-0.5, 0.8);
    s.bezierCurveTo(-0.3, 1.2, 0.1, 1.3, 0.3, 0.9);
    s.lineTo(0.5, 0);
    s.closePath();
    return s;
  }, []);

  return (
    <Float speed={1.5} rotationIntensity={0} floatIntensity={0.4}>
      <mesh position={position}>
        <shapeGeometry args={[shape]} />
        <meshBasicMaterial color="#1a3a4a" transparent opacity={0.7} />
      </mesh>
    </Float>
  );
}

/* ─── Yin-Yang symbol ─── */
function YinYang({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = clock.getElapsedTime() * 0.3;
    }
  });

  const { darkShape, lightShape } = useMemo(() => {
    const R = 0.5;
    const r = R / 2;

    // Dark half (left semicircle + top small circle - bottom small circle)
    const dark = new THREE.Shape();
    dark.absarc(0, 0, R, Math.PI / 2, (3 * Math.PI) / 2, false);
    dark.absarc(0, r, r, (3 * Math.PI) / 2, Math.PI / 2, true);
    dark.absarc(0, -r, r, Math.PI / 2, (3 * Math.PI) / 2, false);

    // Light half (right semicircle)
    const light = new THREE.Shape();
    light.absarc(0, 0, R, Math.PI / 2, (3 * Math.PI) / 2, true);
    light.absarc(0, r, r, (3 * Math.PI) / 2, Math.PI / 2, false);
    light.absarc(0, -r, r, Math.PI / 2, (3 * Math.PI) / 2, true);

    return { darkShape: dark, lightShape: light };
  }, []);

  return (
    <group ref={groupRef} position={position}>
      <mesh>
        <shapeGeometry args={[darkShape]} />
        <meshBasicMaterial color="#1a1a2e" transparent opacity={0.65} />
      </mesh>
      <mesh>
        <shapeGeometry args={[lightShape]} />
        <meshBasicMaterial color="#ffd54f" transparent opacity={0.65} />
      </mesh>
    </group>
  );
}

/* ─── Sun disc ─── */
function SunDisc() {
  return (
    <Float speed={0.5} floatIntensity={0.2}>
      <mesh position={[0, 2.5, -2]}>
        <circleGeometry args={[1.2, 64]} />
        <meshBasicMaterial color="#ffd54f" transparent opacity={0.9} />
      </mesh>
    </Float>
  );
}

/* ─── Palm tree silhouette ─── */
function PalmTree({ position }: { position: [number, number, number] }) {
  const trunkShape = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(-0.08, 0);
    s.lineTo(-0.12, 2.5);
    s.lineTo(0.12, 2.5);
    s.lineTo(0.08, 0);
    s.closePath();
    return s;
  }, []);

  const leafPositions: Array<[number, number, number, number]> = [
    [0, 2.5, 0, 0],
    [-0.4, 2.3, 0, 0.5],
    [0.4, 2.3, 0, -0.5],
    [-0.7, 2.0, 0, 0.8],
    [0.7, 2.0, 0, -0.8],
  ];

  return (
    <group position={position}>
      <mesh>
        <shapeGeometry args={[trunkShape]} />
        <meshBasicMaterial color="#3e2723" transparent opacity={0.8} />
      </mesh>
      {leafPositions.map(([lx, ly, lz, rot], i) => (
        <mesh key={i} position={[lx, ly, lz]} rotation={[0, 0, rot]} scale={[1, 0.24, 1]}>
          <circleGeometry args={[0.5, 12]} />
          <meshBasicMaterial color="#1b5e20" transparent opacity={0.8} />
        </mesh>
      ))}
    </group>
  );
}

/* ─── Main scene ─── */
function Scene() {
  return (
    <>
      <Stars radius={50} depth={30} count={600} factor={3} saturation={0.5} fade speed={0.5} />
      <SunDisc />

      {/* Ocean waves at different depths */}
      <WaveRibbon y={-1.5} color="#006064" amplitude={0.18} speed={0.6} />
      <WaveRibbon y={-2.0} color="#00838f" amplitude={0.22} speed={0.8} />
      <WaveRibbon y={-2.5} color="#0097a7" amplitude={0.15} speed={1.0} />
      <WaveRibbon y={-3.0} color="#00bcd4" amplitude={0.20} speed={0.7} />

      {/* Shark fins */}
      <SharkFin position={[-3.5, -1.8, 0]} />
      <SharkFin position={[2.8, -2.1, 0]} />
      <SharkFin position={[-1.0, -1.6, 0.5]} />

      {/* Yin-yang symbols */}
      <YinYang position={[-4.5, 1.5, -1]} />
      <YinYang position={[4.5, 0.5, -1]} />

      {/* Palm trees */}
      <PalmTree position={[-5, -3.5, 0]} />
      <PalmTree position={[4.5, -3.5, 0]} />
    </>
  );
}

/* ─── Exported canvas wrapper ─── */
export default function BackgroundScene() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
