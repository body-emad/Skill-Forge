import Cart from '../models/cart.model.js'

const getCart = async (req, res) => {
  try {
    const { id: userId } = req.user // Extract userId
    const cart = await Cart.findOne({ userId }).populate(
      'courses',
      'title description price'
    )
    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' })
    }
    res.status(200).json({ success: true, cart })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

const addToCart = async (req, res) => {
  try {
    const { id: userId } = req.user
    console.log('req.user: ', req.user)
    const { courseId } = req.body

    console.log('userId: ', userId)
    console.log('courseId: ', courseId)

    // Find the cart by userId
    let cart = await Cart.findOne({ userId })

    if (!cart) {
      // If no cart exists, create one
      cart = new Cart({ userId, courses: [courseId] }) // Use userId here
    } else {
      if (!cart.courses.includes(courseId)) {
        cart.courses.push(courseId)
      } else {
        return res
          .status(400)
          .json({ success: false, message: 'Course already in cart' })
      }
    }

    await cart.save()
    res.status(200).json({ success: true, cart })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// Remove Course from Cart
const removeFromCart = async (req, res) => {
  try {
    const { id } = req.user
    const { courseId } = req.params

    const cart = await Cart.findOne({ id })

    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' })
    }

    // Remove the course from the cart
    cart.courses = cart.courses.filter(
      (course) => course.toString() !== courseId
    )

    await cart.save()
    res.status(200).json({ success: true, cart })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export { getCart, addToCart, removeFromCart }
