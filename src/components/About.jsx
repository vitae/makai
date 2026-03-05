import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'

const stats = [
  { value: '100%', label: 'Maui-Made' },
  { value: 'Hand', label: 'Illustrated' },
  { value: 'Zero', label: 'Compromise' },
  { value: 'Pure', label: 'Aloha Spirit' },
]

const values = [
  {
    icon: '🌊',
    title: 'Born from the Sea',
    body: 'Every design starts at the shoreline. Our artists draw inspiration from Maui\'s reefs, waves, and coastal life — then bring it to fabric.',
  },
  {
    icon: '✍️',
    title: 'Hand-Illustrated',
    body: 'No AI, no stock vectors. Every graphic is hand-drawn by local Maui artists who live and breathe aloha.',
  },
  {
    icon: '🌺',
    title: 'Island Quality',
    body: 'Premium ring-spun cotton, garment-dyed with intention. Each tee is built to outlast a hundred sunsets.',
  },
]

function AnimatedSection({ children, delay = 0 }) {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

export default function About() {
  const { ref: sectionRef, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <div
      ref={sectionRef}
      className="relative py-32 px-6 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #01060E 0%, #0A1628 50%, #020B18 100%)',
      }}
    >
      {/* Background decoration */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(255,107,53,0.06) 0%, transparent 100%)',
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Section label */}
        <AnimatedSection>
          <div className="text-center mb-5">
            <span className="text-sunset-gold/70 text-xs font-semibold tracking-[0.3em] uppercase">
              — Who We Are —
            </span>
          </div>
        </AnimatedSection>

        {/* Headline */}
        <AnimatedSection delay={0.1}>
          <h2 className="font-heading font-black text-center mb-6" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
            <span className="heading-gradient">Made in Maui</span>
            <br />
            <span className="text-sand-light/90">to wear around the world.</span>
          </h2>
        </AnimatedSection>

        {/* Divider shimmer line */}
        <AnimatedSection delay={0.2}>
          <div className="flex justify-center mb-12">
            <div className="h-px w-48 shimmer-line opacity-60" />
          </div>
        </AnimatedSection>

        {/* Main story */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
          <AnimatedSection delay={0.2}>
            <div className="space-y-6">
              <p className="text-sand-light/80 text-lg leading-relaxed">
                Makai Goods Co. was born from a love of the ocean and a deep respect for the island of Maui.
                <em className="text-sunset-gold not-italic"> Makai</em> — the Hawaiian word for
                "toward the sea" — is our compass, our calling, and our craft.
              </p>
              <p className="text-sand-light/65 text-base leading-relaxed">
                We design wearable art that carries the spirit of the islands wherever life takes you.
                From the summit of Haleakalā to the shores of Ho'okipa, every piece is a love letter
                to the most beautiful place on earth.
              </p>
              <p className="text-sand-light/65 text-base leading-relaxed">
                Each tee is locally hand-illustrated, ethically made, and designed to be worn forever —
                because aloha doesn't have a season.
              </p>
              <motion.a
                href="https://instagram.com/makaigoodsco"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-glass inline-flex text-sm text-sand-light/80"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                Follow on Instagram →
              </motion.a>
            </div>
          </AnimatedSection>

          {/* Stats grid */}
          <AnimatedSection delay={0.35}>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="glass-card p-6 text-center"
                >
                  <div className="heading-gradient font-heading font-black text-3xl md:text-4xl mb-1">
                    {s.value}
                  </div>
                  <div className="text-sand-light/60 text-sm tracking-wide">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>

        {/* Values row */}
        <div className="grid md:grid-cols-3 gap-6">
          {values.map((v, i) => (
            <AnimatedSection key={v.title} delay={0.15 * i}>
              <div className="glass-card p-8 h-full transition-transform duration-300 hover:-translate-y-2">
                <div className="text-4xl mb-4">{v.icon}</div>
                <h3 className="font-heading font-bold text-lg text-sand-light mb-3">{v.title}</h3>
                <p className="text-sand-light/65 text-sm leading-relaxed">{v.body}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  )
}
