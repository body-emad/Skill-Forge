import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCourses } from '../../Redux/Slices/CourseSlice'
import CourseCard from '../../Components/CourseCard'
import Layout from '../../Layout/Layout'

export default function CourseList() {
  const dispatch = useDispatch()

  const { coursesData } = useSelector((state) => state.course)

  async function fetchCourses() {
    await dispatch(getAllCourses())
  }

  useEffect(() => {
    fetchCourses()
  }, [])

  return (
    <Layout>
      <section className="flex flex-col gap-14 md:pb-3 py-5 md:px-20 px-3 min-h-screen">
        <h1 className="md:text-[23px] text-2xl w-fit text-black dark:text-white relative ">
          Explore the courses made by
          <span className="font-semibold text-[#8F42DA] ml-2">
            Industry experts
          </span>
        </h1>
        {/* course container */}
        <div className="flex gap-12 md:justify-start justify-center flex-wrap">
          {coursesData?.map((element) => {
            return <CourseCard key={element._id} data={element} />
          })}
        </div>
      </section>
    </Layout>
  )
}
