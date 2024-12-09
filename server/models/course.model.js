import { model, Schema } from 'mongoose'

const courseSchema = new Schema(
  {
    title: {
      type: String,
      unique: true,
      required: [true, 'Title is required'],
      minLength: [8, 'Title must be at least 8 character'],
      maxLength: [59, 'Title should be less than 60 character'],
      trim: true,
    },
    description: {
      type: String,
      required: true,
      minLength: [8, 'Description must be at least 8 character'],
      maxLength: [500, 'Description should be less than 500 character'],
    },
    price: {
      type: Number,
      default: 0,
      min: [0, 'Price must be greater than 0'],
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isBestSeller: {
      type: Boolean,
      default: false,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
    },
    thumbnail: {
      public_id: {
        type: String,
      },
      secure_url: {
        type: String,
      },
    },
    lectures: [
      {
        title: String,
        description: String,
        lecture: {
          public_id: {
            type: String,
          },
          secure_url: {
            type: String,
          },
        },
      },
    ],
    numberOfLectures: {
      type: Number,
      default: 0,
    },
    numberOfRatings: {
      type: Number,
      default: 0,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    enrolledUsers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    enrollmentCount: {
      type: Number,
      default: 0,
    },

    createdBy: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Course = model('Course', courseSchema)

export default Course
