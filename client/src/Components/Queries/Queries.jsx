import Select from 'react-select'
import useDropdownStyles from '../../hooks/useDropdownStyles'

export default function Queries({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
  limit,
  setLimit,
  categoryOptions,
  sortOptions,
  limitOptions,
  handleSearchClick,
  courseData,
}) {
  const dropdownStyles = useDropdownStyles()
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-center gap-4">
        {/* Search Bar */}
        <div className="flex items-center mx-auto justify-center relative w-full md:w-4/5 border-gray-300 dark:border-gray-500 border-2 ">
          {/* Category Dropdown */}
          <Select
            className="w-1/6"
            placeholder="Select a category"
            options={categoryOptions}
            value={selectedCategory}
            onChange={setSelectedCategory}
            styles={{
              control: (base) => ({
                ...base,
                background: 'var(--color-bg)',
                color: 'var(--color-text)',
                border: 'none',
              }),
            }}
          />
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search for a course..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className=" py-[14px] bg-transparent flex-1"
          />
          {/* Search Button */}
          <button
            className="absolute inset-y-[4px] right-[6px] flex items-center px-8 capitalize text-white bg-secondary"
            onClick={handleSearchClick}
          >
            search
          </button>
        </div>
      </div>

      {/* Limit and Sort Section */}
      {courseData?.length > 0 && (
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-[#fbf3fe] dark:bg-gray-700 p-4 rounded-sm shadow-sm">
          {/* Limit Dropdown */}
          <div className="w-full md:w-[7%]">
            <label
              htmlFor="limit"
              className="block text-sm font-medium text-black dark:text-gray-300 whitespace-nowrap pb-[6px] capitalize"
            >
              Results per page
            </label>
            <Select
              styles={dropdownStyles}
              id="limit"
              placeholder="Select limit"
              options={limitOptions}
              value={limitOptions.find((option) => option.value === limit)}
              onChange={(selectedOption) => setLimit(selectedOption.value)}
            />
          </div>

          {/* Sort Dropdown */}
          <div className="w-full md:w-[15%]">
            <label
              htmlFor="sort"
              className="block text-sm font-medium text-black dark:text-gray-300 whitespace-nowrap pb-[6px] capitalize"
            >
              Sort by
            </label>
            <Select
              styles={dropdownStyles}
              id="sort"
              placeholder="Sort by"
              options={sortOptions}
              value={sortOptions.find((option) => option.value === sortBy)}
              onChange={(selectedOption) => setSortBy(selectedOption.value)}
            />
          </div>
        </div>
      )}
    </div>
  )
}
