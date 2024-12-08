import { useEffect } from 'react'
import Layout from '../../Layout/Layout'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import FullStar from '../../assets/images/fullStar.svg'
import VideoPreview from '../../assets/images/videoPreview.svg'
import { FaRegHeart } from 'react-icons/fa'
import { useAddToCartMutation } from '../../Redux/apis/CartSlice'

export default function CourseDescription() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const [addToCart] = useAddToCartMutation()
  const courseId = state?._id

  const handleAddToCart = async () => {
    try {
      await addToCart(courseId).unwrap()
      console.log('Added To Cart')
    } catch (error) {
      console.log('Error Adding To Cart: ', error)
    }
  }

  const { role, data } = useSelector((state) => state.auth)

  useEffect(() => {
    if (!state) {
      navigate('/courses')
    }
  }, [])

  return (
    <Layout>
      <section className="min-h-screen md:pt-8 pt-2 px-4 lg:px-20 flex flex-col text-gray-800 dark:text-white">
        <div className="flex items-center justify-center gap-10 relative">
          <div className="flex flex-col items-start justify-start gap-8 mt-[3rem] ">
            <h1 className="md:text-3xl text-2xl lg:text-[36px] font-bold text-start w-fit ">
              {state?.title}
            </h1>

            <p className="text-lg text-[#2C2A2A] dark:text-[#afaeae] w-[90%] mt-[-1rem] mb-[0.5rem]">
              {state?.description}
            </p>

            <div className="flex items-center justify-start gap-6">
              <button className="bg-secondary text-white text-[14px] px-4 py-[4px] ">
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
            {/* 
            {role === 'ADMIN' || data?.subscription?.status === 'active' ? (
              <button
                onClick={() =>
                  navigate('/course/displaylectures', { state: { ...state } })
                }
                className="bg-primary text-white text-[16px] rounded-md font-bold px-5 py-3"
              >
                Watch lectures
              </button>
            ) : (
              <button
                onClick={() => navigate('/checkout')}
                className="bg-primary text-white text-[16px] rounded-md font-bold px-5 py-3"
              >
                Subscribe
              </button>
            )} */}
          </div>

          <div className="flex flex-col w-1/2 items-center justify-center gap-5 ">
            <div className="flex flex-col items-center justify-center gap-4 pt-[5rem] w-full relative ">
              <img
                className="md:w-1/2 w-full lg:min-h-fit object-cover mx-auto"
                alt="thumbnail"
                src={state?.thumbnail?.secure_url}
              />

              <div className="flex flex-col items-center justify-center gap-2 absolute bottom-[1.5rem] ">
                <img
                  src={VideoPreview}
                  className="w-[40px] h-[40px] object-cover "
                  alt=""
                />
                <p className="text-white">Preview this course</p>
              </div>
            </div>
            <p className="text-[23px] text-black font-bold">EGP 1,200.99</p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={handleAddToCart}
                className="capitalize border-2 border-black border-opacity-90 px-14 py-2 text-[16px] text-black dark:text-white"
              >
                Add to cart
              </button>
              <div className="border-2 border-black border-opacity-90 px-4 py-[8px]">
                <FaRegHeart className="text-[24px] hover:opacity-80 hover:cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
