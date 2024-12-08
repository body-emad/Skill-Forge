import Review from '../models/review.model.js'

// Create a Review
const createReview = async (req, res) => {
  try {
    const { courseId, rating, comment } = req.body
    const userId = req.user._id

    const review = await Review.create({ courseId, userId, rating, comment })
    res.status(201).json({ success: true, review })
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
}

// Get Reviews for a Course
const getReviewsByCourse = async (req, res) => {
  try {
    const { courseId } = req.params
    const reviews = await Review.find({ courseId }).populate('userId', 'name')
    res.status(200).json({ success: true, reviews })
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
}

// Delete a Review
const deleteReview = async (req, res) => {
  try {
    const { id } = req.params

    const review = await Review.findByIdAndDelete(id)
    if (!review) {
      return res
        .status(404)
        .json({ success: false, message: 'Review not found' })
    }

    res
      .status(200)
      .json({ success: true, message: 'Review deleted successfully' })
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
}

export { createReview, getReviewsByCourse, deleteReview }
