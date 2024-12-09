import Review from '../models/review.model.js'
import Course from '../models/course.model.js'

// Create a review
export const createReview = async (req, res) => {
  try {
    const { courseId } = req.params
    console.log('courseId: ', courseId)
    const { rating, comment } = req.body
    console.log('rating: ', rating)
    console.log('comment: ', comment)

    // Check if the user has already reviewed this course
    const existingReview = await Review.findOne({
      course: courseId,
      user: req.user._id,
    })
    if (existingReview) {
      return res
        .status(400)
        .json({ message: 'You have already reviewed this course.' })
    }

    // Create a new review
    const review = new Review({
      course: courseId,
      user: req.user._id,
      rating,
      comment,
    })

    await review.save()

    // Update the course's average rating and number of reviews
    const course = await Course.findById(courseId)
    course.averageRating =
      (course.averageRating * course.numberOfRatings + rating) /
      (course.numberOfRatings + 1)
    course.numberOfRatings += 1 // Increment the number of ratings
    await course.save()

    res.status(201).json({ message: 'Review added successfully.', review })
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong.', error })
  }
}

// Get all reviews for a course
export const getAllReviews = async (req, res) => {
  try {
    const { courseId } = req.params // Changed from productId to courseId
    console.log('courseId: ', courseId)

    const reviews = await Review.find({ course: courseId }).populate('user') // This will populate the user details

    if (!reviews || reviews.length === 0) {
      return res
        .status(404)
        .json({ message: 'No reviews found for this course.' }) // Updated message
    }

    res.json({ reviews })
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong.', error })
  }
}

// Delete a review
export const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params

    const review = await Review.findOne({ _id: reviewId, user: req.user._id })
    if (!review) {
      return res.status(404).json({ message: 'Review not found.' })
    }

    const courseId = review.course

    await review.deleteOne()

    // Update the course's average rating
    const course = await Course.findById(courseId)
    const allReviews = await Review.find({ course: course._id })
    course.averageRating =
      allReviews.length > 0
        ? allReviews.reduce((acc, curr) => acc + curr.rating, 0) /
          allReviews.length
        : 0
    course.numberOfRatings = allReviews.length
    await course.save()

    res.json({ message: 'Review deleted successfully.', reviewId })
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong.', error })
  }
}
