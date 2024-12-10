import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import StarIcon from '../../assets/images/fullStar.png'
import toast from 'react-hot-toast'
import Loader from '../../Components/Loader'

import {
  useCreateReviewMutation,
  useDeleteReviewMutation,
  useGetAllReviewsQuery,
} from '../../Redux/apis/ReviewSlice'
import Layout from '../../Layout/Layout'

const Reviews = () => {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const { state } = useLocation()
  const courseId = state._id
  // RTK Query hooks
  const { data: reviews, isLoading, refetch } = useGetAllReviewsQuery(courseId)
  console.log('reviews: ', reviews)
  const [createReview] = useCreateReviewMutation()
  const [deleteReview] = useDeleteReviewMutation()

  const handleReviewSubmit = async (e) => {
    e.preventDefault()
    if (!rating || !comment) return

    try {
      await createReview({ courseId, rating, comment }).unwrap()
      setRating(0)
      setComment('')
    } catch (err) {
      console.error('Failed to submit review', err)
    }
  }

  const handleDelete = async (reviewId) => {
    console.log('reviewId: ', reviewId)
    try {
      await deleteReview({ reviewId }).unwrap()
      refetch()

      toast.success('Review deleted successfully')
    } catch (err) {
      console.error('Failed to delete review', err)
    }
  }

  if (isLoading) {
    return (
      <Layout>
        <Loader />
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="w-full md:w-[40%] mx-auto mt-10">
        {reviews && reviews.length > 0 ? (
          reviews.map((review) => (
            <div
              key={review._id}
              className="p-5 mb-5 shadow-sm flex flex-col items-start justify-start bg-white dark:bg-[#1f1f1f] rounded-lg"
            >
              <div className="flex items-start justify-between gap-3 mb-3 w-full">
                <div className="flex items-start justify-start gap-3 w-[70px] h-[70px]">
                  <img
                    src={review.user.avatar.secure_url || ''}
                    className="rounded-full"
                    alt="Pf"
                  />
                  <h3 className="capitalize whitespace-nowrap text-[15px] font-meduim text-gray-800 dark:text-white">
                    {review.user.fullName}
                  </h3>
                </div>

                <button
                  onClick={() => handleDelete(review._id)}
                  className="text-sm px-4 bg-red-600 py-2 text-white rounded-md"
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
              <p className="text-gray-600 dark:text-gray-300">
                {review.comment}
              </p>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center gap-5">
            <p className="text-center text-lg text-gray-600 dark:text-gray-300">
              No reviews for this course yet.
            </p>
          </div>
        )}

        {/* Review Form */}
        <form
          onSubmit={handleReviewSubmit}
          className="mt-8 p-6 bg-white dark:bg-[#2f2f2f] shadow-lg rounded-lg"
        >
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Write a Review
          </h3>

          <div className="mb-4">
            <label
              htmlFor="rating"
              className="text-gray-700 dark:text-gray-200"
            >
              Rating
            </label>
            <select
              id="rating"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="mt-2 w-full p-2 border border-gray-300 dark:border-[#444444] rounded-md bg-transparent text-gray-700 dark:text-gray-200"
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
            <label
              htmlFor="comment"
              className="text-gray-700 dark:text-gray-200"
            >
              Comment
            </label>
            <textarea
              id="comment"
              value={comment}
              placeholder="Write your review here..."
              onChange={(e) => setComment(e.target.value)}
              className="mt-2 w-full p-2 border rounded-md bg-transparent border-gray-300 dark:border-[#444444] text-gray-700 dark:text-gray-200"
              rows={4}
            />
          </div>

          <button
            type="submit"
            className="bg-secondary dark:bg-primary py-2 px-5 rounded-md text-white hover:bg-primary/90 focus:outline-none"
          >
            Submit Review
          </button>
        </form>
      </div>
    </Layout>
  )
}

export default Reviews
