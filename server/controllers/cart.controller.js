import Cart from '../models/cart.model.js'

const getCart = async (req, res) => {
  try {
    const { id: userId } = req.user
    const cart = await Cart.findOne({ userId }).populate({
      path: 'courses.courseId',
      model: 'Course',
    })
    console.log('CART: ', cart)
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
    const { courseId, quantity = 1 } = req.body

    // Find the cart by userId
    let cart = await Cart.findOne({ userId })

    if (!cart) {
      // If no cart exists, create one
      cart = new Cart({ userId, courses: [{ courseId, quantity }] })
    } else {
      console.log('cart courses: ', cart.courses)
      // in case cart exists
      const existingCourseIndex = cart.courses.findIndex(
        (course) => course.courseId && course.courseId.toString() === courseId
      )

      // if course exists
      if (existingCourseIndex !== -1) {
        console.log('existing course index: ', existingCourseIndex)
        cart.courses[existingCourseIndex].quantity += quantity
      } else {
        cart.courses.push({ courseId, quantity })
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
    const { id: userId } = req.user // Use userId from the logged-in user
    const { courseId } = req.params

    // Find the cart by userId
    const cart = await Cart.findOne({ userId })
    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' })
    }

    // Remove the course from the cart
    cart.courses = cart.courses.filter(
      (course) => course.courseId.toString() !== courseId
    )

    await cart.save()
    res.status(200).json({ success: true, cart })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

const clearCart = async (req, res) => {
  try {
    const { id: userId } = req.user

    const cart = await Cart.findOne({ userId })

    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' })
    }

    cart.courses = []
    await cart.save()

    res
      .status(200)
      .json({ success: true, message: 'Cart cleared successfully', cart })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export { getCart, addToCart, removeFromCart, clearCart }
