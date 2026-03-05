import express from 'express'
import cors from 'cors'
import Stripe from 'stripe'

const app = express()
const PORT = process.env.PORT || 3001

// Initialize Stripe with secret key
const stripeKey = process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder'
const stripe = new Stripe(stripeKey)

app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:4173'] }))
app.use(express.json())

/**
 * POST /api/create-payment-intent
 * Creates a Stripe PaymentIntent for a product purchase
 * Body: { amount: number (dollars), currency: string, productName: string }
 * Returns: { clientSecret: string }
 */
app.post('/api/create-payment-intent', async (req, res) => {
  const { amount, currency = 'usd', productName, productId } = req.body

  if (!amount || isNaN(amount) || amount <= 0) {
    return res.status(400).json({ error: 'Invalid amount' })
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert dollars to cents
      currency,
      metadata: {
        productName: productName || 'Makai Goods Co. Product',
        productId: productId || '',
        store: 'Makai Goods Co.',
      },
      automatic_payment_methods: { enabled: true },
      description: `Purchase: ${productName || 'Product'} — Makai Goods Co.`,
    })

    res.json({ clientSecret: paymentIntent.client_secret })
  } catch (error) {
    console.error('Stripe error:', error.message)
    res.status(500).json({ error: error.message })
  }
})

/**
 * GET /api/health
 * Health check endpoint
 */
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.listen(PORT, () => {
  console.log(`\n🌊 Makai Goods Co. API server running on http://localhost:${PORT}`)
  console.log(`   Stripe mode: ${stripeKey.startsWith('sk_live') ? '🔴 LIVE' : '🟡 TEST'}\n`)
})
