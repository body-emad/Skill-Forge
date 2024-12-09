import Layout from '../Layout/Layout'
import { useGetCartQuery } from '../Redux/apis/CartSlice'
import CartItem from './CartItem'

const Cart = () => {
  const { data: cart, isLoading, isError } = useGetCartQuery()

  if (isLoading) return <p className="text-center text-gray-500">Loading...</p>
  if (isError)
    return <p className="text-center text-red-500">Error loading cart</p>

  const courses = cart?.cart?.courses || []

  // Calculate subtotal
  const subtotal = courses.reduce((acc, course) => {
    const price = course.courseId?.price || 0
    const quantity = course.quantity || 1
    return acc + price * quantity
  }, 0)

  return (
    <Layout>
      <section className="min-h-screen p-6 bg-gray-100 dark:bg-gray-800">
        <h2 className="text-[30px] font-bold text-gray-800 dark:text-gray-100 mb-6">
          Shopping Cart
        </h2>

        {/* Show message if the cart is empty */}
        {courses.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-300 text-lg">
            Your cart is empty.
          </p>
        ) : (
          <div className="flex flex-col md:flex-row justify-between">
            {/* Cart Items */}
            <div className="flex-1 md:mr-8">
              {courses.map((course) => (
                <CartItem course={course} key={course._id} cartId={cart._id} />
              ))}
            </div>

            {/* Subtotal Section */}
            <div className="w-full md:w-1/3 flex flex-col items-center justify-center  bg-white dark:bg-gray-900 shadow-lg rounded-lg p-6 mt-6 md:mt-0">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
                Summary
              </h3>
              <div className="flex justify-between items-center mb-4">
                <p className="text-md text-gray-600 dark:text-gray-300">
                  Subtotal:
                </p>
                <p className="text-md font-bold text-gray-800 dark:text-gray-100">
                  ${subtotal.toFixed(2)}
                </p>
              </div>

              <button
                className="w-1/2 text-[14px] bg-blue-600 text-white text-md font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
                onClick={() => console.log('Proceed to checkout')}
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </section>
    </Layout>
  )
}

export default Cart
