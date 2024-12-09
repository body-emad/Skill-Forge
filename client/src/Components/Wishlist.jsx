import Layout from '../Layout/Layout'
import { useGetWishlistQuery } from '../Redux/apis/WishlistSlice'
import WishlistItem from './WishlistItem'

const Wishlist = () => {
  const { data: wishlist, isLoading, isError } = useGetWishlistQuery()

  if (isLoading) return <p className="text-center text-gray-500">Loading...</p>
  if (isError)
    return <p className="text-center text-red-500">Error loading wishlist</p>

  const courses = wishlist?.wishlist?.courses || [] // Adjust based on the structure of your wishlist data

  return (
    <Layout>
      <section className="min-h-screen p-6 bg-gray-100 dark:bg-gray-800">
        <h2 className="text-[30px] font-bold text-gray-800 dark:text-gray-100 mb-6">
          Wishlist
        </h2>

        {/* Show message if the wishlist is empty */}
        {courses.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-300 text-lg">
            Your wishlist is empty.
          </p>
        ) : (
          <div className="flex flex-col md:flex-row justify-between">
            {/* Wishlist Items */}
            <div className="flex-1 md:mr-8">
              {courses.map((course) => (
                <WishlistItem
                  course={course}
                  key={course._id}
                  wishlistId={wishlist._id}
                />
              ))}
            </div>

            {/* Summary Section (optional) */}
            <div className="w-full md:w-1/3 flex flex-col items-center justify-center bg-white dark:bg-gray-900 shadow-lg rounded-lg p-6 mt-6 md:mt-0">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
                Wishlist Summary
              </h3>

              <button
                className=" text-[14px] bg-secondary text-white text-md font-semibold py-2 px-10 rounded-md transition"
                onClick={() => console.log('Proceed to checkout')}
              >
                Move to Cart
              </button>
            </div>
          </div>
        )}
      </section>
    </Layout>
  )
}

export default Wishlist
