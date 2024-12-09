import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCourses } from '../../Redux/Slices/CourseSlice'
import CourseCard from '../../Components/CourseCard'
import Layout from '../../Layout/Layout'
import Queries from '../../Components/Queries/Queries'
import Pagination from '../../Components/Queries/Pagination'

export default function CourseList() {
  const dispatch = useDispatch()
  const { coursesData, totalPages } = useSelector((state) => state.course)

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [sortBy, setSortBy] = useState('default')
  const [limit, setLimit] = useState(12)
  const [currentPage, setCurrentPage] = useState(1)

  const categoryOptions = [
    { value: 'All', label: 'All' },
    { value: 'Web Development', label: 'Web Development' },
    { value: 'Graphic Design', label: 'Graphic Design' },
    { value: 'Mathmatics', label: 'Mathmatics' },
  ]

  const sortOptions = [
    { value: 'default', label: 'Default' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
  ]

  const limitOptions = [
    { value: 1, label: '1' },
    { value: 12, label: '12' },
    { value: 25, label: '25' },
    { value: 50, label: '50' },
  ]

  // Function to fetch courses based on search criteria
  const fetchCourses = () => {
    if (searchTerm.trim() === '') {
      dispatch(
        getAllCourses({
          category: selectedCategory?.value,
          sortBy,
          limit,
          page: currentPage,
        })
      )
    } else {
      dispatch(
        getAllCourses({
          title: searchTerm,
          category: selectedCategory?.value,
          sortBy,
          limit,
          page: currentPage,
        })
      )
    }
  }

  useEffect(() => {
    fetchCourses()
  }, [selectedCategory, sortBy, limit, currentPage])

  // Fetch courses when search button is clicked
  const handleSearchClick = () => {
    fetchCourses()
  }

  return (
    <Layout>
      <section className="flex flex-col gap-14 md:pb-3 md:pt-[4rem] py-5 md:px-20 px-3 min-h-screen">
        <h1 className="md:text-[35px] text-2xl w-fit text-black font-black mx-auto dark:text-white relative capitalize">
          Explore the courses made by
          <span className=" text-[#8F42DA] ml-2 font-black ">
            Industry experts
          </span>
        </h1>

        {/* Queries Section */}
        <Queries
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          sortBy={sortBy}
          setSortBy={setSortBy}
          limit={limit}
          setLimit={setLimit}
          categoryOptions={categoryOptions}
          sortOptions={sortOptions}
          limitOptions={limitOptions}
          handleSearchClick={handleSearchClick}
          courseData={coursesData}
        />

        {/* Course Container */}
        <div className="flex md:justify-start gap-3 flex-wrap">
          {coursesData?.map((element) => (
            <CourseCard key={element._id} data={element} />
          ))}
        </div>

        {/* Pagination */}
        {coursesData?.length > 0 && (
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages || 1}
          />
        )}
      </section>
    </Layout>
  )
}
