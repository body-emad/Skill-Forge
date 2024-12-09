import express from 'express'

import {
  createReview,
  deleteReview,
  getAllReviews,
} from '../controllers/review.controller.js'

import { isLoggedIn } from '../middleware/auth.middleware.js'

const router = express.Router()

router.get('/:courseId', getAllReviews)
router.post('/:courseId', isLoggedIn, createReview)
router.delete('/:reviewId', isLoggedIn, deleteReview)

export default router
