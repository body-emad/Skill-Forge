import { Link } from 'react-router-dom'
import FullStar from '../assets/images/fullStar.png'
import useCurrencyFormatter from '../hooks/useCurrencyFormatter'

export default function CourseCard({ data }) {
  console.log('data: ', data)
  const formattedPrice = useCurrencyFormatter(data?.price)
  const formattedTitle = data?.title.split(' ').slice(0, 3).join(' ')
  return (
    <Link
      to={`/courses/description/${data._id}`}
      state={data}
      className="md:w-[20.5rem] w-full md:max-h-[440px] shadow-md pb-6 h-[500px] shadow-custom dark:shadow-lg cursor-pointer group overflow-hidden bg-white dark:bg-[#141414]"
    >
      <div className="relative overflow-hidden">
        <img
          className="max-h-full w-full object-cover"
          src={data?.thumbnail?.secure_url}
          alt="course thumbnail"
        />
      </div>
      <div className="p-4 md:space-y-2 space-y-3 text-gray-800 dark:text-white">
        <h2 className="text-2xl font-semibold whitespace-nowrap">
          {formattedTitle}
        </h2>
        <div className="flex items-center">
          <p className="text-[#6C6464] whitespace-nowrap">{data?.createdBy}</p>
          <p className="text-black capitalize dark:text-white pl-[10px] font-medium whitespace-nowrap">
            Starting from <span className="text-primary">{formattedPrice}</span>
          </p>
        </div>
        <div className="flex items-center justify-start gap-[1.8px]">
          <p className="text-lg mr-2 font-semibold">4.5</p>
          {Array.from({ length: 4 }, (_, index) => (
            <img
              key={index}
              src={FullStar}
              className="object-cover h-[17px] w-[17px]"
              alt=""
            />
          ))}
          {data?.isBestSeller && (
            <button
              className="btn-secondary text-[13px] px-2 ml-4
          "
            >
              Bestseller
            </button>
          )}
          {data?.isFeatured && (
            <button
              className="btn-primary text-[13px] px-2 ml-4
          "
            >
              Bestseller
            </button>
          )}
        </div>
      </div>
    </Link>
  )
}
