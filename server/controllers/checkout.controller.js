import Course from '../models/course.model.js'
import userModel from '../models/user.model.js'
import mongoose from 'mongoose'

const handleSuccessfulPurchase = async (userId, courseId) => {
  const session = await mongoose.startSession()
  session.startTransaction()
  try {
    // Update the user's enrolled courses
    const user = await userModel.findByIdAndUpdate(
      userId,
      { $addToSet: { enrolledCourses: courseId } },
      { new: true, session }
    )

    if (!user) throw new Error('User not found')

    // Update the course's enrollment count
    const course = await Course.findByIdAndUpdate(
      courseId,
      {
        $inc: { enrollmentCount: 1 },
        $addToSet: { enrolledUsers: userId },
      },
      { new: true, session }
    )

    if (!course) throw new Error('Course not found')

    await session.commitTransaction()
    session.endSession()
    console.log('Transaction succeeded')
    return course
  } catch (error) {
    await session.abortTransaction()
    session.endSession()
    console.error('Transaction failed:', error.message)
    throw error
  }
}

/**
 * Controller for handling successful payment and enrollment
 */
export const handleSuccessfulPayment = async (req, res) => {
  const { userId, courseId, paymentStatus } = req.body

  if (paymentStatus !== 'paid') {
    return res.status(400).json({ success: false, message: 'Payment failed' })
  }

  try {
    // Process the purchase: update user's enrollment and course stats
    const course = await handleSuccessfulPurchase(userId, courseId)

    // Send a confirmation response to the client
    return res.status(200).json({
      success: true,
      message: 'Course purchased and access granted',
      courseTitle: course.title,
    })
  } catch (error) {
    console.error('Error processing payment:', error.message)
    return res.status(500).json({ success: false, message: 'Server error' })
  }
}
