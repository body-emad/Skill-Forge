import { useEffect, useState } from 'react'
import { FaSun, FaMoon } from 'react-icons/fa'
import { Link, NavLink } from 'react-router-dom'
import { FaCartShopping } from 'react-icons/fa6'
import { useGetCartQuery } from '../Redux/apis/CartSlice'

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('theme') === 'dark'
  )
  const { data: cart, isLoading, isError } = useGetCartQuery()

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
      <div className="relative">
        <Link to={'/cart'}>
          <FaCartShopping className="text-[28px] text-black dark:text-white" />
          {!isLoading && !isError && cart?.cart?.courses?.length > 0 && (
            <span className="absolute top-[-13px] right-[-10px] w-[22px] h-[22px] bg-red-500 text-white font-semibold text-xs rounded-full flex items-center justify-center">
              {cart.cart.courses.length}
            </span>
          )}
        </Link>
      </div>
      <button className="rounded-full text-lg font-semibold ml-[4%] mr-[7%]">
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
    </nav>
  )
}
