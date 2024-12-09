import mongoose from 'mongoose'

const purchaseSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    price: { type: Number, required: true },
    paymentStatus: { type: String, enum: ['paid', 'failed'], required: true },
    paymentMethod: { type: String, required: true },
    purchasedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
)

const Purchase = mongoose.model('Purchase', purchaseSchema)
export default Purchase
