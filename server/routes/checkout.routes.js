import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
const router = express.Router()
import Stripe from 'stripe'
const stripe = Stripe(process.env.STRIPE_SECRET_KEY)

router.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body
  console.log('amount: ', amount)

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      payment_method_types: ['card'],
    })

    res.status(200).json({ clientSecret: paymentIntent.client_secret })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
