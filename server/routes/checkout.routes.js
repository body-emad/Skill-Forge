import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import Stripe from 'stripe'
import { updateUserEnrollment } from '../controllers/user.controller.js'
import { isLoggedIn } from '../middleware/auth.middleware.js'

const stripe = Stripe(process.env.STRIPE_SECRET_KEY)
const router = express.Router()

router.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body

  try {
    // Create a PaymentIntent with the order amount and currency
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

router.post('/:userId/enroll', isLoggedIn, updateUserEnrollment)

export default router
