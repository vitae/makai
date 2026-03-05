import { useState } from 'react'
import { motion } from 'framer-motion'
import { tagColors } from '../data/products'

export default function ProductCard({ product, onBuyNow, index }) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[2] || product.sizes[0])
  const [imgError, setImgError] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const tagColor = product.tag ? tagColors[product.tag] : null

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="glass-card flex flex-col transition-all duration-400 group"
      style={{
        transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
        transition: 'transform 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease',
      }}
    >
      {/* Tag badge */}
      {product.tag && tagColor && (
        <span
          className={`tag-pill bg-gradient-to-r ${tagColor} text-white`}
        >
          {product.tag}
        </span>
      )}

      {/* Product Image */}
      <div className="relative overflow-hidden rounded-t-3xl bg-gradient-to-b from-ocean-mid/60 to-ocean-deep/80" style={{ aspectRatio: '1/1' }}>
        {!imgError ? (
          <motion.img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-108"
            style={{ transform: isHovered ? 'scale(1.08)' : 'scale(1)', transition: 'transform 0.5s ease' }}
            onError={() => setImgError(true)}
            loading="lazy"
          />
        ) : (
          // Fallback placeholder
          <div className="w-full h-full flex flex-col items-center justify-center gap-3 opacity-40">
            <span className="text-5xl">👕</span>
            <span className="text-xs text-sand-light/60 text-center px-4">{product.name}</span>
          </div>
        )}

        {/* Image overlay shimmer on hover */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-t-3xl"
          animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            background: 'linear-gradient(135deg, rgba(255,179,71,0.08) 0%, transparent 60%)',
          }}
        />
      </div>

      {/* Card Body */}
      <div className="flex flex-col flex-1 p-5 gap-4">
        {/* Category chip */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-sunset-gold/70 font-semibold tracking-widest uppercase">
            {product.category}
          </span>
          <span className="font-heading font-black text-xl text-sand-light">
            ${product.price}
          </span>
        </div>

        {/* Name */}
        <h3 className="font-heading font-bold text-base text-sand-light leading-tight">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-sand-light/55 text-xs leading-relaxed flex-1 line-clamp-3">
          {product.description}
        </p>

        {/* Size selector */}
        <div>
          <p className="text-sand-light/40 text-xs font-medium tracking-widest uppercase mb-2">
            Size — <span className="text-sunset-gold/80">{selectedSize}</span>
          </p>
          <div className="flex flex-wrap gap-1.5">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className="px-2.5 py-1 rounded-lg text-xs font-semibold transition-all duration-200"
                style={
                  selectedSize === size
                    ? {
                        background: 'rgba(255,107,53,0.25)',
                        border: '1px solid rgba(255,107,53,0.6)',
                        color: '#FF6B35',
                      }
                    : {
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        color: 'rgba(255,249,240,0.5)',
                      }
                }
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Buy Now button */}
        <motion.button
          onClick={() => onBuyNow({ ...product, selectedSize })}
          className="btn-buy mt-auto"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
        >
          <span className="flex items-center justify-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            Buy Now — ${product.price}
          </span>
        </motion.button>
      </div>
    </motion.div>
  )
}
