import express from 'express'

import {
  createReview,
  getReviewsByCourse,
  deleteReview,
} from '../controllers/review.controller.js'

import { isLoggedIn } from '../middleware/auth.middleware.js'

const router = express.Router()

// Routes
router.post('/', isLoggedIn, createReview)
router.get('/:courseId', isLoggedIn, getReviewsByCourse)
router.delete('/:id', isLoggedIn, deleteReview)

export default router
