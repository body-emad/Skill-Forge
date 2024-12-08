import Wishlist from '../models/wishlist.model.js'

// Get Wishlist for a User
const getWishlist = async (req, res) => {
  try {
    const userId = req.user._id
    const wishlist = await Wishlist.findOne({ userId }).populate(
      'courses',
      'title description'
    )
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

// Add Course to Wishlist
const addToWishlist = async (req, res) => {
  try {
    const userId = req.user._id
    const { courseId } = req.body

    let wishlist = await Wishlist.findOne({ userId })

    if (!wishlist) {
      // If no wishlist exists, create one
      wishlist = new Wishlist({ userId, courses: [courseId] })
    } else {
      // Add course if it's not already in the wishlist
      if (!wishlist.courses.includes(courseId)) {
        wishlist.courses.push(courseId)
      } else {
        return res
          .status(400)
          .json({ success: false, message: 'Course already in wishlist' })
      }
    }

    await wishlist.save()
    res.status(200).json({ success: true, wishlist })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// Remove Course from Wishlist
const removeFromWishlist = async (req, res) => {
  try {
    const userId = req.user._id
    const { courseId } = req.params

    const wishlist = await Wishlist.findOne({ userId })

    if (!wishlist) {
      return res
        .status(404)
        .json({ success: false, message: 'Wishlist not found' })
    }

    // Remove the course from the wishlist
    wishlist.courses = wishlist.courses.filter(
      (course) => course.toString() !== courseId
    )

    await wishlist.save()
    res.status(200).json({ success: true, wishlist })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export { getWishlist, addToWishlist, removeFromWishlist }
