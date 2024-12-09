import { Link } from 'react-router-dom'
import FullStar from '../assets/images/fullStar.png'
import useCurrencyFormatter from '../hooks/useCurrencyFormatter'

export default function CourseCard({ data }) {
  const formattedPrice = useCurrencyFormatter(data?.price)

  return (
    <Link
      to={`/courses/description/${data._id}`}
      state={data}
      className="md:w-[20rem] w-full mx-auto md:max-h-[500px] pb-6 h-[500px] shadow-custom dark:shadow-lg cursor-pointer group overflow-hidden bg-white dark:bg-[#141414]"
    >
      <div className="relative overflow-hidden">
        <img
          className="max-h-full w-full object-cover"
          src={data?.thumbnail?.secure_url}
          alt="course thumbnail"
        />
      </div>
      <div className="p-4 md:space-y-2 space-y-3 text-gray-800 dark:text-white">
        <h2 className="text-2xl font-semibold">{data?.title}</h2>
        <div className="flex items-center space-x-2">
          <p className="text-[#6C6464]">{data?.createdBy}</p>
          <p className="text-black capitalize dark:text-white pl-[1.5rem] font-medium">
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
        </div>
        <button className="btn-primary text-[13px] px-2">Bestseller</button>
      </div>
    </Link>
  )
}
