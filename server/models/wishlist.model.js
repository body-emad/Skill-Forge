import mongoose from 'mongoose'

const wishlistSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  courses: [
    {
      courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    },
  ],
})

const Wishlist = mongoose.model('Wishlist', wishlistSchema)

export default Wishlist
