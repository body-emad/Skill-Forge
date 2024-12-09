import { HiViewList } from 'react-icons/hi'
import { IoGrid } from 'react-icons/io5'
import Select from 'react-select'
import { useAppSelector } from '../hooks/useAppSelector'
import {
  fetchAllCourses,
  setLimit,
  setPage,
  setSortBy,
} from '../slices/coursesSlice'
import { useAppDispatch } from '../hooks/useAppDispatch'
import useDropDownStyles from '../hooks/useDropDownStyles'
import { useCoursesView } from '../context/CoursesViewContext'

const FilterBar = () => {
  const { totalResults, results, sortBy, limit, currentPage } = useAppSelector(
    (state) => state.courses
  )
  const { setCoursesView, coursesView } = useCoursesView()

  // Calculate the range
  const startResult = (currentPage - 1) * limit + 1
  const endResult = Math.min(currentPage * limit, totalResults)

  const sortOptions = [
    { value: 'default', label: 'Default' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
  ]

  const limitOptions = [
    { value: 10, label: '10' },
    { value: 12, label: '12' },
    { value: 25, label: '25' },
    { value: 50, label: '50' },
  ]

  const dispatch = useAppDispatch()

  const handleSortChange = (newValue) => {
    if (newValue) {
      dispatch(setSortBy(newValue.value))
      dispatch(setPage(1))
      dispatch(fetchAllCourses({ page: 1, limit, sortBy: newValue.value }))
    }
  }

  const handleLimitChange = (newValue) => {
    if (newValue) {
      dispatch(setLimit(newValue.value))
      dispatch(setPage(1))
      dispatch(fetchAllCourses({ page: 1, limit: newValue.value, sortBy }))
    }
  }

  const { customStyles } = useDropDownStyles()

  const toggleView = () => {
    setCoursesView((prev) => (prev === 'grid' ? 'list' : 'grid'))
  }

  return (
    <div className="w-full max-h-fit py-5 flex items-center justify-between gap-5 bg-[#f6ffb0] dark:bg-[#0c1e11] bg-opacity-[15%] dark:bg-opacity-[55%] rounded-sm px-8">
      <div className="flex items-center justify-center gap-12">
        {coursesView === 'grid' ? (
          <HiViewList onClick={toggleView} className="text-[25px]" />
        ) : (
          <IoGrid onClick={toggleView} className="text-[25px]" />
        )}

        <h1>{`Showing ${results} results`}</h1>
      </div>

      <div className="flex items-center justify-center gap-2">
        <div className="flex items-center justify-center">
          <p> Results per page: </p>
          <Select
            className="max-w-fit text-white"
            isSearchable={false}
            placeholder={limit}
            options={limitOptions}
            onChange={handleLimitChange}
            styles={customStyles}
          />
        </div>
        <div className="flex items-center justify-center">
          <p> Sort by: </p>
          <Select
            className="max-w-fit text-white"
            isSearchable={false}
            placeholder="Default"
            options={sortOptions}
            value={sortOptions.find((option) => option.value === sortBy)}
            onChange={handleSortChange}
            styles={customStyles}
          />
        </div>
      </div>
    </div>
  )
}

export default FilterBar
