import { useEffect, useState } from 'react'
import Layout from '../../Layout/Layout'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import FullStar from '../../assets/images/fullStar.png'
import VideoPreview from '../../assets/images/videoPreview.svg'
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
  const location = useLocation()
  const state = location.state
  console.log('state: ', state)
  const { courseId } = useParams()
  console.log('courseId: ', courseId)
  const navigate = useNavigate()
  const [quantity, setQuantity] = useState(1)
  const [addToCart, { isLoading: isAddingToCart }] = useAddToCartMutation()
  const [addToWishlist, { isLoading: isAddingToWishlist }] =
    useAddToWishlistMutation()
  const [removeFromWishlist, { isLoading: isRemovingFromWishlist }] =
    useRemoveFromWishlistMutation() // Add remove function

  const { data: wishlist } = useGetWishlistQuery()
  console.log('wishlist: ', wishlist)
  const courses = wishlist?.wishlist?.courses
  console.log('courses: ', courses)

  const isCourseInWishlist = courses?.some(
    (course) => course.courseId._id === courseId
  )
  console.log('isCourseInWishlist: ', isCourseInWishlist)

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

  const { role, data } = useSelector((state) => state.auth)

  useEffect(() => {
    if (!state) {
      navigate('/courses')
    }
  }, [state, navigate])

  const formattedPrice = useCurrencyFormatter(state?.price)
  console.log('formattedPrice: ', formattedPrice)
  return (
    <Layout>
      <section className="min-h-screen flex flex-col  ">
        <div className="flex items-center justify-center gap-10 relative w-full pb-4">
          <div className="flex flex-col items-start justify-start gap-8 mt-[1rem]">
            <h1 className="md:text-3xl text-2xl lg:text-[36px] font-bold text-start w-fit">
              {state?.title}
            </h1>

            <p className="text-lg dark:text-[#afaeae] w-[90%] mt-[-1rem] mb-[0.5rem]">
              {state?.description}
            </p>

            <div className="flex items-center justify-start gap-6">
              <button className="bg-secondary  text-[14px] px-4 py-[4px] text-white">
                Bestseller
              </button>
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
              <p className="text-sm">(127+ ratings)</p>
              <p className="text-sm">1221 Students</p>
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

              <div className="flex flex-col items-center justify-center gap-2 absolute bottom-[1.5rem]">
                <img
                  src={VideoPreview}
                  className="w-[40px] h-[40px] object-cover "
                  alt=""
                />
                <p className="text-white">Preview this course</p>
              </div>
            </div>
            <p className="text-[23px]  font-bold">{formattedPrice}</p>
            <div className="flex items-center justify-center gap-3 mb-10">
              <button
                disabled={isAddingToCart}
                onClick={handleAddToCart}
                className="capitalize border-2 border-[#dbdada] px-14 py-2 text-[16px]  dark:"
              >
                {isAddingToCart ? (
                  <Loader width={'23px'} height={'23px'} color={'#000000'} />
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
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
