import { useState } from 'react'
import { useParams } from 'react-router-dom'
import StarIcon from '../assets/star.png'
import toast from 'react-hot-toast'
import Loader from '../../Components/Loader'

// Import RTK Query hooks
import {
  useGetReviewsQuery,
  useCreateReviewMutation,
  useDeleteReviewMutation,
} from '../../Redux/apis/ReviewSlice'

const Reviews = () => {
  const { courseId } = useParams() // Get courseId from URL params
  const [rating, setRating] = useState(0) // State for the review rating
  const [comment, setComment] = useState('') // State for the review comment
  const [isReviewing, setIsReviewing] = useState(false) // State to toggle review form visibility

  // RTK Query hooks
  const { data: reviews, isLoading } = useGetReviewsQuery(courseId) // Fetch reviews for the course
  const [createReview] = useCreateReviewMutation() // Mutation to create a new review
  const [deleteReview] = useDeleteReviewMutation() // Mutation to delete a review

  const handleReviewSubmit = async (e) => {
    e.preventDefault()
    if (!rating || !comment) return // validation

    try {
      await createReview({ courseId, rating, comment }).unwrap()
      setRating(0)
      setComment('')
      setIsReviewing(false)
    } catch (err) {
      console.error('Failed to submit review', err)
    }
  }

  const handleDelete = async (reviewId) => {
    try {
      await deleteReview({ reviewId }).unwrap()
      toast.success('Review deleted successfully')
    } catch (err) {
      console.error('Failed to delete review', err)
    }
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className="w-1/4">
      {reviews && reviews.length > 0 ? (
        reviews.map((review) => (
          <div
            key={review._id}
            className="p-5 mb-5 shadow-sm flex flex-col items-start justify-start"
          >
            <div className="flex items-start justify-between gap-3 mb-3 w-full">
              <div className="w-[70px] h-[70px] rounded-full bg-gray-300"></div>
              <h3 className="text-[25px] capitalize font-semibold ">
                {review.user.name}
              </h3>
              <button
                onClick={() => handleDelete(review._id)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Delete
              </button>
            </div>
            <div className="flex items-start justify-start mb-3 gap-[3px]">
              {Array.from({ length: review.rating }, (_, index) => (
                <img
                  key={index}
                  src={StarIcon}
                  alt="Star icon"
                  className="w-[20px] h-[20px] object-cover"
                />
              ))}
            </div>
            <p className="capitalize text-gray">{review.comment}</p>
          </div>
        ))
      ) : (
        <div className="flex items-center justify-center gap-5">
          <p className="text-center text-lg text-gray-600">
            No reviews for this course yet.
          </p>

          <button
            className="text-white bg-black hover:bg-gray-950 focus:ring-2 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            onClick={() => setIsReviewing((prev) => !prev)}
          >
            Add Review
          </button>
        </div>
      )}

      {isReviewing && (
        <form
          onSubmit={handleReviewSubmit}
          className="mt-5 p-10 w-full border border-[#dddfe1] dark:border-[#2f2f2f] rounded-lg shadow-sm"
        >
          <h3 className="text-lg font-semibold mb-4">Write a Review</h3>

          <div className="mb-4">
            <label htmlFor="rating" className="">
              Rating
            </label>
            <select
              id="rating"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="mt-2 w-full p-2 border border-[#dddfe1] dark:border-[#2f2f2f] rounded-md bg-transparent"
            >
              <option className="text-black" value={0}>
                Select Rating
              </option>
              {[1, 2, 3, 4, 5].map((rate) => (
                <option className="text-black" key={rate} value={rate}>
                  {rate} Stars
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="comment" className="">
              Comment
            </label>
            <textarea
              id="comment"
              value={comment}
              placeholder="Write your review here..."
              onChange={(e) => setComment(e.target.value)}
              className="mt-2 w-full p-2 border rounded-md bg-transparent border-[#dddfe1] dark:border-[#2f2f2f]"
              rows={4}
            />
          </div>

          <button type="submit" className="bg-primary py-2 px-5 rounded-md">
            Submit Review
          </button>
        </form>
      )}
    </div>
  )
}

export default Reviews
