import Wishlist from '../models/wishlist.model.js' // Assuming a Wishlist model exists

const getWishlist = async (req, res) => {
  try {
    const { id: userId } = req.user
    const wishlist = await Wishlist.findOne({ userId }).populate({
      path: 'courses.courseId',
      model: 'Course',
    })

    if (!wishlist) {
      return res
        .status(404)
        .json({ success: false, message: 'Wishlist not found' })
    }

    res.status(200).json({ success: true, wishlist })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

const addToWishlist = async (req, res) => {
  try {
    const { id: userId } = req.user
    const { courseId } = req.body

    // Find the wishlist by userId
    let wishlist = await Wishlist.findOne({ userId })

    if (!wishlist) {
      // If no wishlist exists, create one
      wishlist = new Wishlist({ userId, courses: [{ courseId }] })
    } else {
      // Check if the course is already in the wishlist
      const existingCourseIndex = wishlist.courses.findIndex(
        (course) => course.courseId && course.courseId.toString() === courseId
      )

      // If course exists, do nothing, else add it
      if (existingCourseIndex === -1) {
        wishlist.courses.push({ courseId })
      }
    }

    await wishlist.save()
    res.status(200).json({ success: true, wishlist })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

const removeFromWishlist = async (req, res) => {
  try {
    const { courseId } = req.params
    const { wishlistId } = req.body

    const wishlist = await Wishlist.findOne({ wishlistId })
    if (!wishlist) {
      return res
        .status(404)
        .json({ success: false, message: 'Wishlist not found' })
    }

    // Remove the course from the wishlist
    wishlist.courses = wishlist.courses.filter(
      (course) => course.courseId.toString() !== courseId
    )

    await wishlist.save()
    res.status(200).json({ success: true, wishlist })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export { getWishlist, addToWishlist, removeFromWishlist }
