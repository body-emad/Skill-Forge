export default function Pagination({
  currentPage,
  setCurrentPage,
  totalPages,
}) {
  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
  }

  return (
    <div className="flex justify-center mt-6">
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className={`px-4 py-2 border ${
          currentPage === 1
            ? 'text-gray-400 border-gray-200'
            : 'text-black border-primary border-2 border-opacity-30'
        } rounded-md mx-2`}
      >
        Prev
      </button>

      {[...Array(totalPages).keys()].map((page) => (
        <button
          key={page}
          onClick={() => setCurrentPage(page + 1)}
          className={`px-4 py-2 border ${
            page + 1 === currentPage
              ? 'bg-primary text-white'
              : 'text-black border-primary border-2 border-opacity-30'
          } rounded-md mx-2`}
        >
          {page + 1}
        </button>
      ))}

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 border ${
          currentPage === totalPages
            ? 'text-gray-400 border-gray-200'
            : 'text-black border-primary border-2 border-opacity-30'
        } rounded-md mx-2`}
      >
        Next
      </button>
    </div>
  )
}
