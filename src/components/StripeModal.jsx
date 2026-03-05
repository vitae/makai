import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'

// Inner form component — must be inside <Elements> provider
function CheckoutForm({ product, onClose, onSuccess }) {
  const stripe = useStripe()
  const elements = useElements()
  const [isProcessing, setIsProcessing] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [isComplete, setIsComplete] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!stripe || !elements) return

    setIsProcessing(true)
    setErrorMessage(null)

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin,
        payment_method_data: {
          billing_details: {
            name: e.target.cardholderName?.value || '',
          },
        },
      },
      redirect: 'if_required',
    })

    if (error) {
      setErrorMessage(error.message)
      setIsProcessing(false)
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      setIsComplete(true)
      setTimeout(() => onSuccess?.(), 2500)
    }
  }

  if (isComplete) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="flex flex-col items-center justify-center py-12 text-center gap-4"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, delay: 0.2 }}
          className="w-20 h-20 rounded-full flex items-center justify-center text-3xl"
          style={{ background: 'linear-gradient(135deg, #FF6B35, #FFB347)' }}
        >
          🌺
        </motion.div>
        <h3 className="font-heading font-black text-2xl heading-gradient">Mahalo!</h3>
        <p className="text-sand-light/70 text-sm max-w-xs">
          Your order is confirmed. Aloha is on its way to you.
        </p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Cardholder name */}
      <div>
        <label className="block text-sand-light/60 text-xs font-semibold tracking-widest uppercase mb-2">
          Cardholder Name
        </label>
        <input
          name="cardholderName"
          type="text"
          placeholder="Your full name"
          className="w-full px-4 py-3 rounded-xl text-sand-light text-sm placeholder:text-sand-light/25 outline-none transition-all duration-200"
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.12)',
          }}
          onFocus={(e) => {
            e.target.style.border = '1px solid rgba(255,107,53,0.5)'
            e.target.style.boxShadow = '0 0 0 3px rgba(255,107,53,0.12)'
          }}
          onBlur={(e) => {
            e.target.style.border = '1px solid rgba(255,255,255,0.12)'
            e.target.style.boxShadow = 'none'
          }}
        />
      </div>

      {/* Stripe PaymentElement */}
      <div className="stripe-form-container">
        <label className="block text-sand-light/60 text-xs font-semibold tracking-widest uppercase mb-2">
          Payment Details
        </label>
        <div
          className="p-4 rounded-xl"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <PaymentElement
            options={{
              layout: { type: 'tabs', defaultCollapsed: false },
              fields: { billingDetails: { name: 'never' } },
            }}
          />
        </div>
      </div>

      {/* Error message */}
      <AnimatePresence>
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm text-sunset-coral"
            style={{ background: 'rgba(255,95,126,0.1)', border: '1px solid rgba(255,95,126,0.2)' }}
          >
            <span>⚠️</span>
            {errorMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Submit button */}
      <motion.button
        type="submit"
        disabled={isProcessing || !stripe || !elements}
        className="btn-sunset w-full py-4 text-base font-bold disabled:opacity-50 disabled:cursor-not-allowed"
        whileHover={!isProcessing ? { scale: 1.02 } : {}}
        whileTap={!isProcessing ? { scale: 0.98 } : {}}
      >
        {isProcessing ? (
          <span className="flex items-center justify-center gap-3">
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
            />
            Processing...
          </span>
        ) : (
          `Pay $${product.price}.00`
        )}
      </motion.button>

      <p className="text-center text-sand-light/30 text-xs flex items-center justify-center gap-1.5">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
        </svg>
        Secured by Stripe · SSL Encrypted
      </p>
    </form>
  )
}

// Demo mode form — shown when Stripe keys aren't configured
function DemoForm({ product, onClose }) {
  return (
    <div className="space-y-5">
      <div
        className="flex items-start gap-3 px-4 py-4 rounded-xl text-sm"
        style={{ background: 'rgba(255,179,71,0.1)', border: '1px solid rgba(255,179,71,0.25)' }}
      >
        <span className="text-xl">🔑</span>
        <div>
          <p className="text-sunset-gold font-semibold text-xs mb-1">Stripe Keys Not Configured</p>
          <p className="text-sand-light/65 text-xs leading-relaxed">
            Add your Stripe API keys to <code className="text-sunset-gold">.env</code> to enable live payments.
            See <code className="text-sunset-gold">.env.example</code> for setup instructions.
          </p>
        </div>
      </div>

      <div className="space-y-3 opacity-50 pointer-events-none">
        <div className="h-12 rounded-xl" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }} />
        <div className="h-36 rounded-xl" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }} />
      </div>

      <button
        onClick={onClose}
        className="btn-glass w-full text-sm text-sand-light/70 py-3"
      >
        Close Preview
      </button>
    </div>
  )
}

// Main Modal wrapper
export default function StripeModal({ product, clientSecret, isLoading, onClose }) {
  const isDemo = !clientSecret || clientSecret === 'demo_mode'

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
        {/* Backdrop blur */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
        />

        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 20 }}
          transition={{ type: 'spring', stiffness: 350, damping: 30 }}
          className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-3xl"
          style={{
            background: 'rgba(10, 22, 40, 0.92)',
            backdropFilter: 'blur(40px) saturate(180%)',
            WebkitBackdropFilter: 'blur(40px) saturate(180%)',
            border: '1px solid rgba(255,255,255,0.12)',
            boxShadow: '0 30px 80px rgba(0,0,0,0.7), 0 0 60px rgba(255,107,53,0.12)',
          }}
        >
          {/* Glow top */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(255,179,71,0.6), transparent)' }}
          />

          <div className="p-7">
            {/* Header */}
            <div className="flex items-start justify-between mb-7">
              <div className="flex gap-4 items-center">
                {/* Product thumbnail */}
                <div
                  className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain p-1"
                  />
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

              {/* Close button */}
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="w-9 h-9 rounded-full flex items-center justify-center text-sand-light/50 hover:text-sand-light flex-shrink-0"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  transition: 'color 0.2s',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 6 6 18M6 6l12 12"/>
                </svg>
              </motion.button>
            </div>

            {/* Size badge */}
            {product.selectedSize && (
              <div
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-6"
                style={{
                  background: 'rgba(255,107,53,0.12)',
                  border: '1px solid rgba(255,107,53,0.25)',
                  color: '#FF6B35',
                }}
              >
                Size: {product.selectedSize}
              </div>
            )}

            {/* Divider */}
            <div className="h-px mb-6" style={{ background: 'rgba(255,255,255,0.07)' }} />

            {/* Form content */}
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-12 gap-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
                  className="w-10 h-10 rounded-full border-2 border-sunset-orange/20 border-t-sunset-orange"
                />
                <p className="text-sand-light/50 text-sm">Setting up secure payment...</p>
              </div>
            ) : isDemo ? (
              <DemoForm product={product} onClose={onClose} />
            ) : (
              <CheckoutForm
                product={product}
                onClose={onClose}
                onSuccess={onClose}
              />
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
