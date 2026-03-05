import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const customOptions = [
  { icon: '🎨', label: 'Custom Design', desc: 'Bring your own idea, our artists will hand-illustrate it.' },
  { icon: '👕', label: 'Custom Sizing', desc: 'Need a size not in stock? We cut to order.' },
  { icon: '🌺', label: 'Bulk Orders', desc: 'Events, weddings, surf teams — we do it all.' },
  { icon: '🎁', label: 'Gift Sets', desc: 'Curated Maui gift boxes with custom packaging.' },
]

function AnimatedSection({ children, delay = 0 }) {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 45 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

export default function Customs() {
  const [form, setForm] = useState({ name: '', email: '', type: '', details: '' })
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate form submission — replace with your actual form handler / Formspree / etc.
    await new Promise((r) => setTimeout(r, 1200))
    setSubmitted(true)
    setIsSubmitting(false)
  }

  const inputClass = `w-full px-4 py-3.5 rounded-xl text-sand-light text-sm
    placeholder:text-sand-light/25 outline-none transition-all duration-200`
  const inputStyle = {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
  }
  const inputFocusStyle = {
    border: '1px solid rgba(255,107,53,0.45)',
    boxShadow: '0 0 0 3px rgba(255,107,53,0.1)',
  }

  return (
    <div
      ref={ref}
      className="relative py-28 px-6 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #020B18 0%, #0A1628 60%, #020B18 100%)',
      }}
    >
      {/* Decorative ocean gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 30% 50%, rgba(46,107,158,0.12) 0%, transparent 100%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 50% 40% at 80% 50%, rgba(255,107,53,0.07) 0%, transparent 100%)',
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left — Info */}
          <div>
            <AnimatedSection>
              <span className="text-sunset-gold/70 text-xs font-semibold tracking-[0.3em] uppercase">
                — Custom Orders —
              </span>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <h2
                className="font-heading font-black mt-4 mb-6"
                style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)' }}
              >
                <span className="heading-gradient">Your Vision,</span>
                <br />
                <span className="text-sand-light/90">Our Craft.</span>
              </h2>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <p className="text-sand-light/65 text-base leading-relaxed mb-10">
                Want something truly one-of-a-kind? Our Maui artists will bring your idea to life —
                hand-illustrated and made to order. From family reunion tees to wedding gifts, if you
                can dream it, we can craft it.
              </p>
            </AnimatedSection>

            {/* Options grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {customOptions.map((opt, i) => (
                <AnimatedSection key={opt.label} delay={0.25 + i * 0.1}>
                  <div
                    className="flex items-start gap-3 p-4 rounded-2xl transition-all duration-300 hover:-translate-y-1"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                    }}
                  >
                    <span className="text-2xl flex-shrink-0">{opt.icon}</span>
                    <div>
                      <h4 className="font-heading font-bold text-sand-light text-sm mb-1">{opt.label}</h4>
                      <p className="text-sand-light/50 text-xs leading-relaxed">{opt.desc}</p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>

            <AnimatedSection delay={0.6}>
              <p className="text-sand-light/35 text-xs mt-8 leading-relaxed">
                Typical turnaround: 2–3 weeks. Rush orders available. Minimum quantities may apply
                for bulk orders. All designs are hand-illustrated by our Maui-based artists.
              </p>
            </AnimatedSection>
          </div>

          {/* Right — Form */}
          <AnimatedSection delay={0.15}>
            <div
              className="rounded-3xl p-8"
              style={{
                background: 'rgba(255,255,255,0.04)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
              }}
            >
              {submitted ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="flex flex-col items-center justify-center py-10 text-center gap-4"
                >
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center text-3xl"
                    style={{ background: 'linear-gradient(135deg, #FF6B35, #FFB347)' }}
                  >
                    🌺
                  </div>
                  <h3 className="font-heading font-black text-2xl heading-gradient">Mahalo!</h3>
                  <p className="text-sand-light/65 text-sm max-w-xs leading-relaxed">
                    Your custom request has been received. Our team will reach out within 1–2 business days.
                  </p>
                </motion.div>
              ) : (
                <>
                  <h3 className="font-heading font-bold text-sand-light text-xl mb-6">
                    Start Your Custom Order
                  </h3>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sand-light/50 text-xs font-semibold tracking-widest uppercase mb-2">
                          Your Name
                        </label>
                        <input
                          name="name"
                          type="text"
                          placeholder="First & last name"
                          value={form.name}
                          onChange={handleChange}
                          required
                          className={inputClass}
                          style={inputStyle}
                          onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                          onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                        />
                      </div>
                      <div>
                        <label className="block text-sand-light/50 text-xs font-semibold tracking-widest uppercase mb-2">
                          Email
                        </label>
                        <input
                          name="email"
                          type="email"
                          placeholder="you@example.com"
                          value={form.email}
                          onChange={handleChange}
                          required
                          className={inputClass}
                          style={inputStyle}
                          onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                          onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sand-light/50 text-xs font-semibold tracking-widest uppercase mb-2">
                        Order Type
                      </label>
                      <select
                        name="type"
                        value={form.type}
                        onChange={handleChange}
                        required
                        className={inputClass + ' cursor-pointer'}
                        style={{ ...inputStyle, color: form.type ? '#FFF9F0' : 'rgba(255,249,240,0.25)' }}
                      >
                        <option value="" disabled>Select type...</option>
                        <option value="custom-design">Custom Design</option>
                        <option value="custom-sizing">Custom Sizing</option>
                        <option value="bulk">Bulk Order (10+)</option>
                        <option value="gift-set">Gift Set</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sand-light/50 text-xs font-semibold tracking-widest uppercase mb-2">
                        Tell Us Your Vision
                      </label>
                      <textarea
                        name="details"
                        placeholder="Describe your idea, quantity needed, deadline, or anything else..."
                        value={form.details}
                        onChange={handleChange}
                        required
                        rows={4}
                        className={inputClass + ' resize-none'}
                        style={inputStyle}
                        onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                        onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-sunset w-full py-4 text-sm font-bold disabled:opacity-60"
                      whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                      whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <motion.span
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                          />
                          Sending...
                        </span>
                      ) : (
                        'Send Custom Request 🌺'
                      )}
                    </motion.button>
                  </form>
                </>
              )}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  )
}
