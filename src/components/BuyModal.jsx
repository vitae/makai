import { motion, AnimatePresence } from 'framer-motion'

export default function BuyModal({ product, onClose }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        style={{ background: 'rgba(1,6,14,0.85)' }}
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
        />

        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 20 }}
          transition={{ type: 'spring', stiffness: 350, damping: 30 }}
          className="relative w-full max-w-md rounded-3xl"
          style={{
            background: 'rgba(10, 22, 40, 0.95)',
            backdropFilter: 'blur(40px) saturate(180%)',
            WebkitBackdropFilter: 'blur(40px) saturate(180%)',
            border: '1px solid rgba(255,255,255,0.12)',
            boxShadow: '0 30px 80px rgba(0,0,0,0.7), 0 0 60px rgba(255,107,53,0.12)',
          }}
        >
          {/* Top glow line */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(255,179,71,0.6), transparent)' }}
          />

          <div className="p-7">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex gap-4 items-center">
                <div
                  className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  <img src={product.image} alt={product.name} className="w-full h-full object-contain p-1" />
                </div>
                <div>
                  <p className="text-sunset-gold/70 text-xs font-semibold tracking-widest uppercase mb-0.5">
                    {product.category}
                  </p>
                  <h3 className="font-heading font-bold text-sand-light text-base leading-tight">
                    {product.name}
                  </h3>
                  <p className="text-sunset-gold font-black font-heading text-xl mt-0.5">
                    ${product.price}
                  </p>
                </div>
              </div>

              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="w-9 h-9 rounded-full flex items-center justify-center text-sand-light/50 hover:text-sand-light flex-shrink-0"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', transition: 'color 0.2s' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 6 6 18M6 6l12 12"/>
                </svg>
              </motion.button>
            </div>

            {product.selectedSize && (
              <div
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-5"
                style={{ background: 'rgba(255,107,53,0.12)', border: '1px solid rgba(255,107,53,0.25)', color: '#FF6B35' }}
              >
                Size: {product.selectedSize}
              </div>
            )}

            <div className="h-px mb-5" style={{ background: 'rgba(255,255,255,0.07)' }} />

            {/* Coming soon message */}
            <div
              className="flex items-start gap-3 px-4 py-4 rounded-2xl mb-6"
              style={{ background: 'rgba(255,179,71,0.08)', border: '1px solid rgba(255,179,71,0.2)' }}
            >
              <span className="text-2xl">🌺</span>
              <div>
                <p className="text-sunset-gold font-semibold text-sm mb-1">Online payments coming soon!</p>
                <p className="text-sand-light/60 text-xs leading-relaxed">
                  We're setting up our checkout. In the meantime, reach out directly to place your order — we'd love to help.
                </p>
              </div>
            </div>

            {/* Contact options */}
            <div className="space-y-3 mb-6">
              <a
                href={`mailto:hello@makaigoodsco.com?subject=Order: ${encodeURIComponent(product.name)}&body=Hi! I'd like to order:%0A%0AProduct: ${encodeURIComponent(product.name)}%0ASize: ${encodeURIComponent(product.selectedSize || '')}%0APrice: $${product.price}%0A%0APlease let me know how to complete my purchase. Mahalo!`}
                className="btn-sunset w-full py-3.5 text-sm font-bold text-center flex items-center justify-center gap-2"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
                Order via Email
              </a>

              <a
                href="https://instagram.com/makaigoodsco"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-glass w-full py-3.5 text-sm text-sand-light/80 text-center flex items-center justify-center gap-2"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                DM on Instagram
              </a>
            </div>

            <p className="text-center text-sand-light/25 text-xs">
              Makai Goods Co. · Maui, Hawaiʻi 🌺
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
