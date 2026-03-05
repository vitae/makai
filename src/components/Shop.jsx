import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { products, categories } from '../data/products'
import ProductCard from './ProductCard'

export default function Shop({ onBuyNow }) {
  const [activeCategory, setActiveCategory] = useState('All')
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true })

  const filtered = activeCategory === 'All'
    ? products
    : products.filter((p) => p.category === activeCategory)

  return (
    <div
      ref={ref}
      className="relative py-28 px-6 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #020B18 0%, #0D1F38 50%, #020B18 100%)',
      }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 40% at 50% 0%, rgba(255,107,53,0.07) 0%, transparent 100%)',
        }}
      />

      {/* Decorative wave top */}
      <div className="absolute top-0 left-0 right-0 h-px shimmer-line opacity-30" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Section Header */}
        <div className="text-center mb-5">
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="text-sunset-gold/70 text-xs font-semibold tracking-[0.3em] uppercase"
          >
            — The Collection —
          </motion.span>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-heading font-black text-center mb-4"
          style={{ fontSize: 'clamp(2.2rem, 4.5vw, 4rem)' }}
        >
          <span className="heading-gradient">Shop the Islands</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-center text-sand-light/60 text-base mb-12 max-w-md mx-auto"
        >
          {products.length} designs. One island. Infinite aloha.
        </motion.p>

        {/* Category Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-14"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative px-5 py-2 rounded-full text-sm font-semibold tracking-wide transition-all duration-250"
              style={
                activeCategory === cat
                  ? {
                      background: 'linear-gradient(135deg, rgba(255,107,53,0.3), rgba(255,179,71,0.2))',
                      border: '1px solid rgba(255,107,53,0.5)',
                      color: '#FFB347',
                      boxShadow: '0 0 20px rgba(255,107,53,0.2)',
                    }
                  : {
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: 'rgba(255,249,240,0.55)',
                    }
              }
            >
              {cat}
              {activeCategory === cat && (
                <motion.span
                  layoutId="category-indicator"
                  className="absolute inset-0 rounded-full"
                  style={{ background: 'rgba(255,107,53,0.05)' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Product Count indicator */}
        <motion.p
          key={activeCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-sand-light/35 text-xs tracking-widest uppercase mb-8"
        >
          Showing {filtered.length} item{filtered.length !== 1 ? 's' : ''}
        </motion.p>

        {/* Product Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          >
            {filtered.map((product, i) => (
              <ProductCard
                key={product.id}
                product={product}
                index={i}
                onBuyNow={onBuyNow}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-sand-light/40 text-sm mb-4">
            Can't find your size or want something unique?
          </p>
          <motion.button
            onClick={() => document.getElementById('customs')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-glass text-sm text-sand-light/80"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            Request a Custom Order →
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}
