import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const socialLinks = [
  {
    name: 'Instagram',
    handle: '@makaigoodsco',
    href: 'https://instagram.com/makaigoodsco',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
    color: 'from-purple-600 to-pink-500',
    description: 'Daily island life & new drops',
  },
  {
    name: 'Email',
    handle: 'hello@makaigoodsco.com',
    href: 'mailto:hello@makaigoodsco.com',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="4" width="20" height="16" rx="2"/>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
      </svg>
    ),
    color: 'from-sunset-orange to-sunset-coral',
    description: 'Questions, collabs, aloha',
  },
]

const faqs = [
  {
    q: 'Where are your tees made?',
    a: 'Every piece is designed and finished on Maui, Hawaiʻi. Our blanks are ethically sourced and our printing is done locally.',
  },
  {
    q: 'How long does shipping take?',
    a: 'US orders: 3–7 business days. International: 7–14 business days. Free shipping on US orders over $100.',
  },
  {
    q: 'What\'s your return policy?',
    a: 'We accept returns within 30 days for unworn, unwashed items in original condition.',
  },
  {
    q: 'Do you ship internationally?',
    a: 'Yes! We ship worldwide. International customers are responsible for any duties or customs fees.',
  },
]

function FAQ({ q, a, index }) {
  const [open, setOpen] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="rounded-2xl overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-4 text-left"
      >
        <span className="text-sand-light/80 text-sm font-medium">{q}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25 }}
          className="text-sunset-gold/70 text-xl leading-none flex-shrink-0 ml-4"
        >
          +
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="overflow-hidden"
      >
        <p className="px-5 pb-4 text-sand-light/55 text-sm leading-relaxed">{a}</p>
      </motion.div>
    </motion.div>
  )
}

function AnimatedSection({ children, delay = 0 }) {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

export default function Connect() {
  const [email, setEmail] = useState('')
  const [emailSent, setEmailSent] = useState(false)
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  const handleNewsletter = (e) => {
    e.preventDefault()
    if (email) {
      setEmailSent(true)
      setEmail('')
    }
  }

  return (
    <div
      ref={ref}
      className="relative pt-28 pb-0 px-6 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #020B18 0%, #01060E 100%)',
      }}
    >
      {/* Top shimmer divider */}
      <div className="absolute top-0 left-0 right-0 h-px shimmer-line opacity-25" />

      {/* Background sunset glow */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1/2 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 40% at 50% 100%, rgba(255,107,53,0.08) 0%, transparent 100%)',
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10">

        {/* Section heading */}
        <div className="text-center mb-16">
          <AnimatedSection>
            <span className="text-sunset-gold/70 text-xs font-semibold tracking-[0.3em] uppercase">
              — Stay Connected —
            </span>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <h2
              className="font-heading font-black mt-4 mb-4"
              style={{ fontSize: 'clamp(2.2rem, 4.5vw, 4rem)' }}
            >
              <span className="heading-gradient">Ride the Wave</span>
              <br />
              <span className="text-sand-light/85">With Us.</span>
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <p className="text-sand-light/55 text-base max-w-md mx-auto">
              New drops, island stories, and exclusive offers — straight to your inbox.
            </p>
          </AnimatedSection>
        </div>

        {/* Newsletter */}
        <AnimatedSection delay={0.2}>
          <div
            className="max-w-xl mx-auto mb-20 p-1 rounded-2xl"
            style={{ background: 'linear-gradient(135deg, rgba(255,107,53,0.2), rgba(255,179,71,0.15), rgba(78,205,196,0.1))' }}
          >
            <div
              className="rounded-xl p-6"
              style={{ background: 'rgba(2,11,24,0.92)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}
            >
              {emailSent ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center py-3 space-y-2"
                >
                  <div className="text-3xl">🌊</div>
                  <p className="font-heading font-bold text-sand-light">You're in the crew!</p>
                  <p className="text-sand-light/55 text-sm">Mahalo for joining. Aloha vibes incoming.</p>
                </motion.div>
              ) : (
                <>
                  <p className="text-sand-light/80 text-sm font-medium mb-4 text-center">
                    Join the Makai Ohana — get 10% off your first order
                  </p>
                  <form onSubmit={handleNewsletter} className="flex gap-2">
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="flex-1 px-4 py-3 rounded-xl text-sand-light text-sm placeholder:text-sand-light/25 outline-none"
                      style={{
                        background: 'rgba(255,255,255,0.06)',
                        border: '1px solid rgba(255,255,255,0.1)',
                      }}
                    />
                    <motion.button
                      type="submit"
                      className="btn-sunset px-5 py-3 text-sm"
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      Join
                    </motion.button>
                  </form>
                </>
              )}
            </div>
          </div>
        </AnimatedSection>

        {/* Social links */}
        <AnimatedSection delay={0.3}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
            {socialLinks.map((s) => (
              <motion.a
                key={s.name}
                href={s.href}
                target={s.name !== 'Email' ? '_blank' : undefined}
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04, y: -4 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.09)',
                }}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br ${s.color}`}
                >
                  {s.icon}
                </div>
                <div>
                  <p className="font-semibold text-sand-light text-sm">{s.name}</p>
                  <p className="text-sand-light/50 text-xs">{s.description}</p>
                </div>
                <span className="ml-auto text-sand-light/30">→</span>
              </motion.a>
            ))}
          </div>
        </AnimatedSection>

        {/* FAQ */}
        <AnimatedSection delay={0.2}>
          <div className="mb-20">
            <h3 className="font-heading font-bold text-sand-light text-center text-xl mb-8">
              Frequently Asked Questions
            </h3>
            <div className="space-y-3 max-w-2xl mx-auto">
              {faqs.map((faq, i) => (
                <FAQ key={faq.q} {...faq} index={i} />
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Footer */}
        <div
          className="border-t py-10 text-center"
          style={{ borderColor: 'rgba(255,255,255,0.07)' }}
        >
          <p className="font-heading font-black text-2xl mb-2">
            <span className="heading-gradient">MAKAI GOODS CO.</span>
          </p>
          <p className="text-sand-light/40 text-sm mb-4 tracking-wide">
            Made in Maui to wear around the world. 🌺
          </p>
          <p className="text-sand-light/25 text-xs">
            © {new Date().getFullYear()} Makai Goods Co. All rights reserved.
          </p>
          <p className="text-sand-light/20 text-xs mt-1">
            Maui, Hawaiʻi · makaigoodsco.com
          </p>
        </div>
      </div>
    </div>
  )
}
