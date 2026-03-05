import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

// Generates random sphere positions
function spherePoints(count, radius) {
  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    const r = radius * Math.cbrt(Math.random())
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
    positions[i * 3 + 2] = r * Math.cos(phi)
  }
  return positions
}

function GoldenParticles({ count = 1800 }) {
  const ref = useRef()
  const positions = useMemo(() => spherePoints(count, 2.5), [count])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    ref.current.rotation.y = t * 0.04
    ref.current.rotation.x = Math.sin(t * 0.025) * 0.18
    ref.current.rotation.z = Math.cos(t * 0.018) * 0.08
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#FFB347"
        size={0.018}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.85}
      />
    </Points>
  )
}

function CoralParticles({ count = 900 }) {
  const ref = useRef()
  const positions = useMemo(() => spherePoints(count, 3.8), [count])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    ref.current.rotation.y = -t * 0.025
    ref.current.rotation.x = Math.cos(t * 0.03) * 0.12
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#FF6B35"
        size={0.012}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.6}
      />
    </Points>
  )
}

function OceanBlueParticles({ count = 700 }) {
  const ref = useRef()
  const positions = useMemo(() => spherePoints(count, 4.5), [count])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    ref.current.rotation.y = t * 0.015
    ref.current.rotation.z = Math.sin(t * 0.02) * 0.06
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#4ECDC4"
        size={0.008}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.45}
      />
    </Points>
  )
}

// Large ambient glow orb
function GlowOrb({ position, color, scale = 1 }) {
  const ref = useRef()
  useFrame((state) => {
    const t = state.clock.elapsedTime
    ref.current.scale.setScalar(scale * (1 + 0.15 * Math.sin(t * 0.8)))
    ref.current.material.opacity = 0.12 + 0.06 * Math.sin(t * 0.9)
  })
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[1.5, 16, 16]} />
      <meshBasicMaterial color={color} transparent opacity={0.12} depthWrite={false} />
    </mesh>
  )
}

export default function OceanParticles() {
  return (
    <Canvas
      camera={{ position: [0, 0, 1], fov: 75 }}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
      }}
      gl={{ antialias: false, alpha: true }}
      dpr={[1, 1.5]}
    >
      <GoldenParticles />
      <CoralParticles />
      <OceanBlueParticles />
      <GlowOrb position={[-1.5, 0.5, -1]} color="#FF6B35" scale={1.2} />
      <GlowOrb position={[2, -0.8, -2]} color="#FFB347" scale={0.8} />
      <GlowOrb position={[0, 1.5, -3]} color="#4ECDC4" scale={0.6} />
    </Canvas>
  )
}
