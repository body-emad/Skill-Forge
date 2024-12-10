import { useEffect, useState } from 'react'
import { FaSun, FaMoon } from 'react-icons/fa'
import { Link, NavLink } from 'react-router-dom'
import { FaCartShopping } from 'react-icons/fa6'
import { useGetCartQuery } from '../Redux/apis/CartSlice'
import { FaRegHeart } from 'react-icons/fa'
import { useGetWishlistQuery } from '../Redux/apis/WishlistSlice'
import UserMenu from './UserMenu'
import WishlistItem from './WishlistItem'

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('theme') === 'dark'
  )
  const { data: cart, isLoading, isError } = useGetCartQuery()
  const { data: wishlist, isLoading: wishlistLoading } = useGetWishlistQuery()

  const wishlistItems = wishlist?.wishlist?.courses || []
  const cartItems = cart?.cart?.courses || []

  const [showWishlist, setShowWishlist] = useState(false)
  const [showCart, setShowCart] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev)
  }

  useEffect(() => {
    const element = document.querySelector('html')
    element.classList.remove('light', 'dark')
    if (darkMode) {
      element.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      element.classList.add('light')
      localStorage.setItem('theme', 'light')
    }
  }, [darkMode])

  return (
    <nav className="sticky top-0 z-50 md:h-[72px] h-[65px] md:px-[35px] px-[15px] dark:bg-[#21242bc5] shadow-sm backdrop-blur-md flex justify-center items-center">
      <Link
        to={'/'}
        className="text-black dark:text-white text-[25px] font-bold"
      >
        Skill Forge
      </Link>
      <ul className="flex items-center justify-center gap-16 flex-1">
        <NavLink
          className={({ isActive }) =>
            isActive ? 'active-nav-link' : 'not-active-nav-link'
          }
          to={'/courses'}
        >
          browse courses
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? 'active-nav-link' : 'not-active-nav-link'
          }
          to={'/about'}
        >
          about us
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? 'active-nav-link' : 'not-active-nav-link'
          }
          to={'/contact'}
        >
          contact us
        </NavLink>
      </ul>
      <div
        className="relative"
        onMouseEnter={() => setShowWishlist(true)}
        onMouseLeave={() => setShowWishlist(false)}
      >
        <Link to={'/wishlist'}>
          <FaRegHeart className="text-[28px] text-black dark:text-white" />
          {!wishlistLoading && !isError && wishlistItems.length > 0 && (
            <span className="absolute top-[-13px] right-[-10px] w-[22px] h-[22px] bg-primary text-white font-semibold text-xs rounded-full flex items-center justify-center">
              {wishlistItems.length}
            </span>
          )}
        </Link>
        {showWishlist && (
          <div className="absolute top-full right-0 mt-2 w-[300px] bg-white dark:bg-gray-800 shadow-lg rounded-md p-4">
            <p className="font-bold mb-2">Wishlist:</p>
            {!wishlistLoading && wishlistItems.length > 0 ? (
              <ul className="space-y-4">
                {wishlistItems.map((course) => (
                  <li key={course._id} className="flex items-start space-x-3">
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 truncate">
                        {course.courseId?.title || 'Untitled Course'}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        ${course.courseId?.price?.toFixed(2) || '0.00'}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">No items in wishlist.</p>
            )}
          </div>
        )}
      </div>
      <div
        className="relative ml-[40px]"
        onMouseEnter={() => setShowCart(true)}
        onMouseLeave={() => setShowCart(false)}
      >
        <Link to={'/cart'}>
          <FaCartShopping className="text-[28px] text-black dark:text-white" />
          {!isLoading && !isError && cartItems.length > 0 && (
            <span className="absolute top-[-13px] right-[-10px] w-[22px] h-[22px] bg-primary text-white font-semibold text-xs rounded-full flex items-center justify-center">
              {cart.cart.courses.length}
            </span>
          )}
        </Link>
        {showCart && (
          <div className="absolute top-full right-0 mt-2 w-[300px] bg-white dark:bg-gray-800 shadow-lg rounded-md p-4">
            {!isLoading && cartItems.length > 0 ? (
              <>
                {cartItems.map((course) => (
                  <div
                    key={course._id}
                    className="flex items-center justify-between mb-3 border-b pb-2"
                  >
                    <div>
                      <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                        {course.courseId?.title || 'Untitled Course'}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Qty: {course.quantity || 1}
                      </p>
                    </div>
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      ${course.courseId?.price?.toFixed(2) || '0.00'}
                    </p>
                  </div>
                ))}
              </>
            ) : (
              <p className="text-sm text-gray-500">No items in cart.</p>
            )}
          </div>
        )}
      </div>
      <button className="rounded-full text-lg font-semibold ml-[3%] mr-[8%]">
        {darkMode ? (
          <FaSun size={26} className="text-white" onClick={toggleDarkMode} />
        ) : (
          <FaMoon
            size={26}
            className="text-gray-900"
            onClick={toggleDarkMode}
          />
        )}
      </button>
      <UserMenu />
    </nav>
  )
}
