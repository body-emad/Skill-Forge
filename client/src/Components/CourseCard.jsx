import { useNavigate } from 'react-router-dom'
import FullStar from '../assets/images/fullStar.svg'

export default function CourseCard({ data }) {
  const navigate = useNavigate()

  return (
    <div
      className="md:w-[22rem] w-[95%] md:max-h-[500px] pb-6 h-[500px] shadow-custom dark:shadow-lg cursor-pointer group overflow-hidden bg-white dark:bg-[#141414]"
      onClick={() => navigate('/courses/description/', { state: { ...data } })}
    >
      <div className="relative overflow-hidden">
        <img
          className="max-h-[270px] w-full object-cover"
          src={data?.thumbnail?.secure_url}
          alt="course thumbnail"
        />
      </div>
      <div className="p-4 md:space-y-2 space-y-3 text-gray-800 dark:text-white">
        <h2 className="text-2xl font-semibold">{data?.title}</h2>
        <div className="flex items-center space-x-2">
          <p className="text-[#6C6464]">{data?.createdBy}</p>
        </div>
        <div className="flex items-center justify-start gap-[1.2 px]">
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
        <button className="btn-primary text-[13px] px-2">Bestseller</button>
      </div>
    </div>
  )
}
