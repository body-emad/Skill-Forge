import { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../Redux/Slices/AuthSlice'
import { useClearCartMutation } from '../Redux/apis/CartSlice'

const UserMenu = () => {
  const user = useSelector((state) => state.auth.data)
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const dispatch = useDispatch()
  const [clearCart] = useClearCartMutation()

  const onLogout = async function () {
    try {
      await dispatch(logout()).unwrap()
      await clearCart().unwrap()
      navigate('/')
    } catch (error) {
      console.log('Error Logging Out: ', error)
    }
  }

  // Toggle the menu visibility
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev)
  }

  // Close the menu when clicking outside
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false)
    }
  }

  // Attach/detach event listener for clicks outside
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const formattedName = user?.fullName?.split(' ')[0]

  return (
    <div className="relative inline-block top-0 right-0" ref={menuRef}>
      <button
        className="bg-secondary text-[14px] dark:bg-primary text-white px-8 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
        onClick={toggleMenu}
      >
        Menu
      </button>
      {isMenuOpen && (
        <div
          className="flex flex-col py-3 items-center justify-center absolute  top-[3rem] right-0
                mt-3 min-w-fit px-8 min-h-fit border bg-[#fffbfb] dark:bg-[#1f1f1f] border-gray-200 dark:border-[#343333] rounded-md shadow-lg z-[1000]"
        >
          <h1 className="text-[17px] pb-2 border-b-2 border-gray-300 border-opacity-70">
            Hey,
            <span className="text-secondary dark:text-primary ml-2 capitalize">
              {formattedName}
            </span>
          </h1>

          {user?.role === 'ADMIN' && (
            <>
              <Link
                onClick={toggleMenu}
                to="/admin/dashboard"
                className="block px-8 py-2 mt-3 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-md transition whitespace-nowrap"
              >
                Dashboard
              </Link>
              <Link
                onClick={toggleMenu}
                to="/course/create"
                className="block capitalize px-8 py-2 mt-3 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-md transition whitespace-nowrap"
              >
                Create course
              </Link>
            </>
          )}
          <Link
            onClick={toggleMenu}
            to="/user/profile"
            className="block px-8 py-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-md transition whitespace-nowrap mt-2"
          >
            Profile
          </Link>
          {user?.role !== 'ADMIN' && (
            <Link
              className="capitalize block px-8 py-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-md transition whitespace-nowrap my-2"
              to={'/enrolled-courses'}
            >
              My courses
            </Link>
          )}
          {isLoggedIn ? (
            <button
              onClick={onLogout}
              className="block px-8 py-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-md transition whitespace-nowrap"
            >
              Log out
            </button>
          ) : (
            <Link
              to={'/login'}
              className="block px-8 py-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-md transition"
            >
              Log in
            </Link>
          )}
        </div>
      )}
    </div>
  )
}

export default UserMenu
