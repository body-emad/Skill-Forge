import { useDispatch, useSelector } from 'react-redux'
import Layout from '../../Layout/Layout'
import { useEffect } from 'react'
import { getUserData } from '../../Redux/Slices/AuthSlice'
import { Link } from 'react-router-dom'
import useCurrencyFormatter from '../../hooks/useCurrencyFormatter'

const EnrolledCourses = () => {
  const dispatch = useDispatch()

  // Fetch user data on component mount
  useEffect(() => {
    dispatch(getUserData())
  }, [dispatch])

  // Get user data and enrolled courses
  const user = useSelector((state) => state.auth.data)
  const { enrolledCourses } = user
  const prices = enrolledCourses.map((course) => course.price)
  const formattedPrice = useCurrencyFormatter(prices)

  return (
    <Layout>
      <div className="container mx-auto px-[30px] py-[20px]">
        <h2 className="text-3xl font-semibold mb-6">Enrolled Courses</h2>

        {/* If there are no enrolled courses */}
        {enrolledCourses?.length === 0 ? (
          <p className="text-xl">You have not enrolled in any courses yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {enrolledCourses.map((course) => (
              <div
                key={course._id}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 relative"
              >
                {/* Course Thumbnail */}
                {course.thumbnail?.secure_url && (
                  <img
                    src={course.thumbnail.secure_url}
                    alt={course.title}
                    className="w-full h-[220px] object-cover rounded-lg mb-4"
                  />
                )}

                {/* Course Title */}
                <h3 className="text-xl font-semibold text-gray-800">
                  {course.title}
                </h3>

                {/* Course Description */}
                <p className="text-gray-600 mt-2">{course.description}</p>

                {/* Course Category */}
                <p className="text-sm text-gray-500 mt-2">
                  Category: {course.category}
                </p>

                <div className="flex items-center justify-start gap-2 py-2">
                  {/* Course Price */}
                  <p className="text-lg font-semibold text-gray-800 capitalize">
                    Price:{' '}
                    <span className="text-secondary">{formattedPrice}</span>
                  </p>
                  <p className="capitalize bg-primary px-4 py-1 text-white rounded-sm text-[13px] ml-5 font-bold  ">
                    Status: paid
                  </p>
                </div>

                {/* Course Rating */}
                <div className="mt-2 flex items-center">
                  <span className="text-yellow-500">⭐</span>
                  <span className="ml-1 text-gray-600">
                    {course?.averageRating?.toFixed(1)} (
                    {course?.numberOfRatings} ratings)
                  </span>
                </div>

                {/* View Lectures Button */}
                <div className="mt-4 flex gap-2">
                  <Link
                    to={`/course/displaylectures`}
                    state={course}
                    className="inline-block bg-primary text-white py-2 px-4 rounded-sm hover:bg-opacity-90 transition text-[14px]"
                  >
                    View Lectures
                  </Link>
                  <Link
                    to={`/review-course`}
                    state={course}
                    className="inline-block bg-secondary text-white py-2 px-4 rounded-sm hover:bg-opacity-90 transition capitalize text-[14px]"
                  >
                    Review the course
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  )
}

export default EnrolledCourses
