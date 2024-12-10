import { useEffect, useState } from 'react'
import Layout from '../../Layout/Layout'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import FullStar from '../../assets/images/fullStar.png'
import { FaRegHeart, FaHeart } from 'react-icons/fa' // Import filled heart
import { useAddToCartMutation } from '../../Redux/apis/CartSlice'
import Loader from '../../Components/Loader'
import {
  useAddToWishlistMutation,
  useGetWishlistQuery,
  useRemoveFromWishlistMutation, // Import mutation to remove from wishlist
} from '../../Redux/apis/WishlistSlice'
import useCurrencyFormatter from '../../hooks/useCurrencyFormatter'

export default function CourseDescription() {
  const user = useSelector((state) => state.auth.data)
  const location = useLocation()
  const state = location.state
  console.log('state: ', state)
  const { courseId } = useParams()
  const navigate = useNavigate()
  const [quantity, setQuantity] = useState(1)

  const [addToCart, { isLoading: isAddingToCart }] = useAddToCartMutation()
  const [addToWishlist, { isLoading: isAddingToWishlist }] =
    useAddToWishlistMutation()
  const [removeFromWishlist, { isLoading: isRemovingFromWishlist }] =
    useRemoveFromWishlistMutation() // Add remove function

  const { data: wishlist } = useGetWishlistQuery()
  const courses = wishlist?.wishlist?.courses

  const isCourseInWishlist = courses?.some(
    (course) => course.courseId._id === courseId
  )

  const [wishlistStatus, setWishlistStatus] = useState(isCourseInWishlist)

  const handleAddToCart = async () => {
    if (!courseId) {
      console.log('Course Id is not defined')
      return
    }
    try {
      await addToCart({ courseId, quantity }).unwrap()
      console.log('Added To Cart')
    } catch (error) {
      console.log('Error Adding To Cart: ', error)
    }
  }

  const handleAddToWishlist = async () => {
    if (!courseId) {
      console.log('Course Id is not defined')
      return
    }

    try {
      if (isCourseInWishlist) {
        // If course is already in wishlist, remove it
        await removeFromWishlist({ courseId }).unwrap()
        setWishlistStatus(false) // Set status to false when removed
        console.log('Removed From Wishlist')
      } else {
        // If course is not in wishlist, add it
        await addToWishlist({ courseId, quantity }).unwrap()
        setWishlistStatus(true) // Set status to true when added
        console.log('Added To Wishlist')
      }
    } catch (error) {
      console.log('Error Handling Wishlist: ', error)
    }
  }

  useEffect(() => {
    if (!state) {
      navigate('/courses')
    }
  }, [state, navigate])

  const formattedPrice = useCurrencyFormatter(state?.price)

  const LoggedInUserId = user?._id
  const totalStudents = state?.enrolledUsers
  const isEnrolled = state?.enrolledUsers?.includes(LoggedInUserId)

  return (
    <Layout>
      <section className="min-h-screen flex flex-col w-full px-[90px] my-auto mx-auto  ">
        <div className="flex items-center justify-center gap-10 relative w-full pb-4">
          <div className="flex flex-col items-start justify-start gap-8 mt-[1rem]">
            <h1 className="md:text-3xl text-2xl lg:text-[36px] font-bold text-start w-fit">
              {state?.title}
            </h1>

            <p className="text-lg dark:text-[#afaeae] w-[90%] mt-[-1rem] mb-[0.5rem]">
              {state?.description}
            </p>

            <div className="flex items-center justify-start gap-6">
              {state?.isBestSeller && (
                <button className="bg-primary  text-[14px] px-4 py-[4px] text-white">
                  Bestseller
                </button>
              )}
              {state?.isFeatured && (
                <button className="bg-secondary  text-[14px] px-4 py-[4px] text-white">
                  Featured
                </button>
              )}
              <div className="flex items-center justify-center gap-[1px]">
                <p className="text-lg mr-2 font-semibold">4.5</p>
                {Array.from({ length: 4 }, (_, index) => (
                  <img
                    key={index}
                    src={FullStar}
                    className="object-cover h-[20px] w-[20px]"
                    alt=""
                  />
                ))}
              </div>
              <p className="text-sm">{state?.numberOfRatings} Ratings</p>
              <p className="text-sm"> {totalStudents?.length} Students</p>
            </div>
            <p className="capitalize">
              created by
              <button className="ml-2 text-secondary hover:underline underline-offset-[4px] hover:cursor-pointer ">
                {state?.createdBy}
              </button>
            </p>
          </div>

          <div className="flex flex-col w-1/2 items-center justify-center gap-5">
            <div className="flex flex-col items-center justify-center gap-4 pt-[5rem] w-full relative">
              <img
                className="md:w-1/2 w-full lg:min-h-fit object-cover mx-auto rounded-md"
                alt="thumbnail"
                src={state?.thumbnail?.secure_url}
              />
            </div>
            <p className="text-[23px]  font-bold">
              {!isEnrolled && formattedPrice}
            </p>
            <div className="flex items-center justify-center gap-3 mb-10">
              {isEnrolled ? (
                <div className="flex flex-col items-center justify-center gap-4">
                  <h1 className="capitalize font-semibold text-xl text-gray-600">
                    You are already enrolled in this course!
                  </h1>
                  <div className="flex gap-2">
                    <Link
                      to={'/course/displayLectures'}
                      state={state}
                      className="capitalize bg-secondary text-white px-6 rounded-md py-2 text-[16px]  dark:"
                    >
                      Start learning
                    </Link>
                    <Link
                      to={'/review-course'}
                      state={state}
                      className="capitalize bg-primary text-white px-6 rounded-md py-2 text-[16px]  dark:"
                    >
                      Review course
                    </Link>
                  </div>
                </div>
              ) : (
                <>
                  <button
                    disabled={isAddingToCart}
                    onClick={handleAddToCart}
                    className="capitalize border-2 border-[#dbdada] px-14 py-2 text-[16px]  dark:"
                  >
                    {isAddingToCart ? (
                      <Loader
                        width={'23px'}
                        height={'23px'}
                        color={'#000000'}
                      />
                    ) : (
                      'Add to cart'
                    )}
                  </button>
                  <button
                    onClick={handleAddToWishlist}
                    disabled={isAddingToWishlist || isRemovingFromWishlist}
                    className="border-2 border-[#dbdada] px-4 py-[8px]"
                  >
                    {wishlistStatus ? (
                      <FaHeart className=" text-[24px]" />
                    ) : (
                      <FaRegHeart className="text-[24px] hover:opacity-80 hover:cursor-pointer" />
                    )}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
