import { useRemoveFromWishlistMutation } from '../Redux/apis/WishlistSlice'
import { useState } from 'react'
import Loader from './Loader'

const WishlistItem = ({ course, wishlistId }) => {
  const [removeFromWishlist, { isLoading: isRemovingFromWishlist }] =
    useRemoveFromWishlistMutation()

  const courseId = course.courseId?._id

  const handleRemoveFromWishlist = () => {
    try {
      removeFromWishlist({ courseId, wishlistId }).unwrap()
      console.log('Removed From Wishlist')
    } catch (error) {
      console.log('Error Removing From Wishlist: ', error)
    }
  }

  return (
    <div
      key={course.courseId?._id || course._id}
      className="flex items-center justify-between w-[50rem] bg-white dark:bg-gray-800 shadow-lg rounded-lg p-2 my-2 pr-6"
    >
      {/* Thumbnail */}
      <img
        src={course.courseId?.thumbnail?.secure_url || ''}
        alt="Course Thumbnail"
        className="w-24 h-24 object-cover rounded-md"
      />

      {/* Course Details */}
      <div className="flex flex-col flex-1 mx-4">
        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
          {course.courseId?.title || 'Untitled Course'}
        </h3>

        <p className="text-sm font-semibold text-primary dark:text-secondary mt-2">
          Price: ${course.courseId?.price || 'N/A'}
        </p>
      </div>

      {/* Remove Button */}
      <button
        disabled={isRemovingFromWishlist}
        className="bg-red-700 text-white font-semibold text-sm px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handleRemoveFromWishlist}
      >
        {isRemovingFromWishlist ? (
          <Loader width="17px" height="17px" color="#ffffff" />
        ) : (
          'Remove'
        )}
      </button>
    </div>
  )
}

export default WishlistItem
