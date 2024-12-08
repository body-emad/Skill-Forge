import express from 'express'

import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} from '../controllers/wishlist.controller.js'

import { isLoggedIn } from '../middleware/auth.middleware.js'

const router = express.Router()

router.get('/', isLoggedIn, getWishlist)
router.post('/add', isLoggedIn, addToWishlist)
router.delete('/remove/:courseId', isLoggedIn, removeFromWishlist)

export default router
