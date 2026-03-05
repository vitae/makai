import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import OceanParticles from './OceanParticles'

// Haleakalā sunset image — swap with your own HQ photo if desired
const HALEAKALA_BG =
  'https://images.unsplash.com/photo-1542897274-a6e5ae3de428?auto=format&fit=crop&w=2560&q=90'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] },
})

export default function Hero({ onShopNow }) {
  const bgRef = useRef(null)

  // Subtle parallax on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (bgRef.current) {
        bgRef.current.style.transform = `translateY(${window.scrollY * 0.35}px)`
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">

      {/* ── Background Image ── */}
      <div ref={bgRef} className="absolute inset-0 -top-16 scale-110 will-change-transform">
        <img
          src={HALEAKALA_BG}
          alt="Haleakalā Sunset — Maui"
          className="w-full h-full object-cover"
          loading="eager"
        />
      </div>

      {/* ── Gradient Overlays ── */}
      {/* Bottom-to-top fade for section blend */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(1,6,14,0.15) 0%, rgba(1,6,14,0.1) 50%, rgba(1,6,14,0.85) 100%)',
        }}
      />
      {/* Sunset color cast */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 60%, rgba(255,107,53,0.18) 0%, rgba(255,179,71,0.08) 50%, transparent 100%)',
        }}
      />

      {/* ── Three.js Particle Canvas ── */}
      <OceanParticles />

      {/* ── Floating Glow Orbs ── */}
      <div
        className="absolute w-96 h-96 rounded-full pointer-events-none animate-glowPulse"
        style={{
          top: '20%', left: '10%',
          background: 'radial-gradient(circle, rgba(255,107,53,0.25) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      <div
        className="absolute w-80 h-80 rounded-full pointer-events-none animate-glowPulse"
        style={{
          top: '35%', right: '8%',
          background: 'radial-gradient(circle, rgba(255,179,71,0.2) 0%, transparent 70%)',
          filter: 'blur(50px)',
          animationDelay: '2s',
        }}
      />

      {/* ── Hero Content ── */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">

        {/* Eyebrow tag */}
        <motion.div
          {...fadeUp(0.2)}
          className="inline-flex items-center gap-2 mb-8"
        >
          <span
            className="px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase text-sunset-gold"
            style={{
              background: 'rgba(255,179,71,0.12)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,179,71,0.25)',
            }}
          >
            🌺 Handcrafted in Maui, Hawaiʻi
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          {...fadeUp(0.35)}
          className="font-heading font-black mb-6"
          style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', lineHeight: 1.0 }}
        >
          <span className="block heading-gradient drop-shadow-2xl">MAKAI</span>
          <span className="block text-sand-light/95 drop-shadow-xl">GOODS CO.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          {...fadeUp(0.5)}
          className="text-sand-light/80 text-lg md:text-2xl font-light tracking-wide mb-12 max-w-xl mx-auto"
          style={{ textShadow: '0 2px 20px rgba(0,0,0,0.6)' }}
        >
          Made in Maui to wear around the world.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          {...fadeUp(0.65)}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            onClick={onShopNow}
            className="btn-sunset text-base px-10 py-4"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
          >
            Shop the Collection
          </motion.button>
          <motion.button
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-glass text-base text-sand-light px-8 py-4"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            Our Story
          </motion.button>
        </motion.div>

        {/* Instagram handle */}
        <motion.a
          {...fadeUp(0.8)}
          href="https://instagram.com/makaigoodsco"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 mt-10 text-sand-light/50 text-sm hover:text-sunset-gold transition-colors duration-200"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
          @makaigoodsco
        </motion.a>
      </div>

      {/* ── Scroll Indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-sand-light/40 text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-10 rounded-full"
          style={{
            background: 'linear-gradient(180deg, rgba(255,179,71,0.8), transparent)',
          }}
        />
      </motion.div>
    </div>
  )
}
