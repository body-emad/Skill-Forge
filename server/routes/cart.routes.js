import express from 'express'

const router = express.Router()
import {
  getCart,
  addToCart,
  removeFromCart,
} from '../controllers/cart.controller.js'

import { isLoggedIn } from '../middleware/auth.middleware.js'

router.get('/', isLoggedIn, getCart)
router.post('/add', isLoggedIn, addToCart)
router.delete('/remove/:courseId', isLoggedIn, removeFromCart)

export default router
