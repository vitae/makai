import { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Shop from './components/Shop'
import Customs from './components/Customs'
import Connect from './components/Connect'
import StripeModal from './components/StripeModal'

// Initialize Stripe — replace VITE_STRIPE_PUBLISHABLE_KEY in your .env file
const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_placeholder'
)

const stripeAppearance = {
  theme: 'night',
  variables: {
    colorPrimary: '#FF6B35',
    colorBackground: '#0A1628',
    colorText: '#FFF9F0',
    colorDanger: '#FF5F7E',
    fontFamily: '"Inter", system-ui, sans-serif',
    borderRadius: '12px',
    spacingUnit: '5px',
  },
  rules: {
    '.Input': {
      border: '1px solid rgba(255,255,255,0.15)',
      backgroundColor: 'rgba(255,255,255,0.05)',
    },
    '.Input:focus': {
      border: '1px solid #FF6B35',
      boxShadow: '0 0 0 3px rgba(255,107,53,0.2)',
    },
    '.Label': {
      color: 'rgba(255,249,240,0.7)',
      fontSize: '13px',
    },
  },
}

export default function App() {
  const [modalProduct, setModalProduct] = useState(null)
  const [clientSecret, setClientSecret] = useState(null)
  const [isLoadingPayment, setIsLoadingPayment] = useState(false)

  const openCheckout = async (product) => {
    setModalProduct(product)
    setIsLoadingPayment(true)
    setClientSecret(null)

    try {
      const res = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: product.price,
          currency: 'usd',
          productName: product.name,
          productId: product.id,
        }),
      })

      if (!res.ok) throw new Error('Failed to create payment intent')
      const data = await res.json()
      setClientSecret(data.clientSecret)
    } catch (err) {
      console.error('Payment setup error:', err)
      // Show modal anyway — user will see a graceful error state
      setClientSecret('demo_mode')
    } finally {
      setIsLoadingPayment(false)
    }
  }

  const closeCheckout = () => {
    setModalProduct(null)
    setClientSecret(null)
    setIsLoadingPayment(false)
  }

  return (
    <div className="relative min-h-screen">
      <Navbar />

      <main>
        <section id="home">
          <Hero onShopNow={() => document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })} />
        </section>

        <section id="about">
          <About />
        </section>

        <section id="shop">
          <Shop onBuyNow={openCheckout} />
        </section>

        <section id="customs">
          <Customs />
        </section>

        <section id="connect">
          <Connect />
        </section>
      </main>

      {/* Stripe Checkout Modal */}
      {modalProduct && (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret: clientSecret && clientSecret !== 'demo_mode' ? clientSecret : undefined,
            appearance: stripeAppearance,
          }}
        >
          <StripeModal
            product={modalProduct}
            clientSecret={clientSecret}
            isLoading={isLoadingPayment}
            onClose={closeCheckout}
          />
        </Elements>
      )}
    </div>
  )
}
