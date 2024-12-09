import { useRemoveFromCartMutation } from '../Redux/apis/CartSlice'
import { useState } from 'react'
import Select from 'react-select'
import Loader from './Loader'

const CartItem = ({ course, cartId }) => {
  const [removeFromCart, { isLoading: isRemovingFromCart }] =
    useRemoveFromCartMutation()

  const [selectedQuantity, setSelectedQuantity] = useState(course.quantity || 1)

  const courseId = course.courseId?._id

  const handleRemoveFromCart = async () => {
    try {
      await removeFromCart({ courseId }).unwrap()

      console.log('Removed From Cart')
    } catch (error) {
      console.log('Error Removing From Cart: ', error)
    }
  }

  // Quantity options for the dropdown
  const quantityOptions = Array.from({ length: 10 }, (_, i) => ({
    value: i + 1,
    label: `${i + 1}`,
  }))

  const handleQuantityChange = (selectedOption) => {
    setSelectedQuantity(selectedOption.value)
    console.log(`Quantity updated to: ${selectedOption.value}`)
    // Here you can call an API or dispatch a Redux action to update the cart quantity on the server
  }

  return (
    <div className="flex items-center justify-between w-[50rem] bg-white dark:bg-gray-800 shadow-lg rounded-lg p-2 my-2 pr-6">
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

        {/* Quantity Dropdown */}
        <div className="mt-3 w-1/4">
          <label
            htmlFor="quantity"
            className="block text-md font-medium text-gray-700 dark:text-gray-300"
          >
            Quantity:
          </label>
          <Select
            id="quantity"
            options={quantityOptions}
            value={quantityOptions.find(
              (option) => option.value === selectedQuantity
            )}
            onChange={handleQuantityChange}
            className="mt-1"
          />
        </div>
      </div>

      {/* Remove Button */}
      <button
        disabled={isRemovingFromCart}
        className="bg-red-700 text-white font-semibold text-sm px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handleRemoveFromCart}
      >
        {isRemovingFromCart ? (
          <Loader width="17px" height="17px" color="#ffffff" />
        ) : (
          'Remove'
        )}
      </button>
    </div>
  )
}

export default CartItem
