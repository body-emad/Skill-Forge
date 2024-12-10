import User from '../models/user.model.js'

export const verifyEnrollment = async (req, res, next) => {
  try {
    const userId = req.user.id
    const { courseId } = req.params

    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' })
    }

    const isEnrolled = user.enrolledCourses.includes(courseId)
    console.log('isEnrolled: ', isEnrolled)
    if (!isEnrolled) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Enroll in the course first.',
      })
    }

    next()
  } catch (error) {
    console.error('Error in verifyEnrollment middleware:', error.message)
    res.status(500).json({ success: false, message: 'Server error' })
  }
}
