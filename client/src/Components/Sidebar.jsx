import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../Redux/Slices/AuthSlice'
import { Link, useNavigate } from 'react-router-dom'
import { AiFillCloseCircle } from 'react-icons/ai'
import { FiMenu } from 'react-icons/fi'
import {
  FaHome,
  FaUserCircle,
  FaPlus,
  FaList,
  FaInfoCircle,
  FaPhone,
} from 'react-icons/fa'

export default function Sidebar({ hideBar = false }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const { isLoggedIn, role, data } = useSelector((state) => state.auth)

  const onLogout = async function () {
    await dispatch(logout())
    navigate('/')
  }

  function changeWidth() {
    const drawerSide = document.getElementsByClassName('drawer-side')
    drawerSide[0].style.width = 'auto'
  }

  function hideDrawer() {
    const element = document.getElementsByClassName('drawer-toggle')
    element[0].checked = false

    const drawerSide = document.getElementsByClassName('drawer-side')
    drawerSide[0].style.width = '0'
  }

  if (!hideBar) {
    return (
      <div className="drawer absolute right-5 z-50 w-fit">
        <input className="drawer-toggle" id="my-drawer" type="checkbox" />
        <div className="drawer-content  ">
          <label
            htmlFor="my-drawer"
            className="cursor-pointer fixed top-5 right-[3rem]"
          >
            <FiMenu
              onClick={changeWidth}
              size={'32px'}
              className="font-bold text-base-200 dark:text-white"
            />
          </label>
        </div>
        <div className="drawer-side  w-0 shadow-custom dark:shadow-lg">
          <label
            htmlFor="my-drawer"
            className="drawer-overlay w-screen"
          ></label>
          <ul className="menu  p-4 pt-7 h-[100%] min-w-[250px] max-w-[350px]  bg-white dark:bg-[#29303ea3] backdrop-blur-[8px] text-gray-500 font-inter dark:text-slate-50 md:text-[17px] text-base font-[600] relative">
            <li className="w-fit absolute top-0 right-0 z-50 text-red-500">
              <button onClick={hideDrawer}>
                <AiFillCloseCircle size={28} />
              </button>
            </li>
            <h1 className="text-center text-black font-black text-[25px] capitalize mt-8 dark:text-white">
              Skill forge
            </h1>

            {role === 'ADMIN' && (
              <li>
                <Link
                  to="/admin/dashboard"
                  className="flex gap-4 items-center mt-6"
                >
                  <FaUserCircle
                    size={18}
                    className="text-gray-500 dark:text-slate-100"
                  />
                  Admin DashBoard
                </Link>
              </li>
            )}

            {role === 'ADMIN' && (
              <li>
                <Link to="/course/create" className="flex gap-4 items-center">
                  <FaPlus
                    size={18}
                    className="text-gray-500 dark:text-slate-100"
                  />
                  Create new course
                </Link>
              </li>
            )}

            {isLoggedIn ? (
              <li className="absolute bottom-4 w-[90%]">
                <div className="w-full flex md:flex-row flex-col gap-2 items-center justify-center">
                  <button className="btn-primary px-[22px] py-[11px]">
                    <Link to="/user/profile">Profile</Link>
                  </button>
                  <button
                    className="btn-secondary px-[22px] py-[11px]"
                    onClick={onLogout}
                    disabled={isLoading}
                  >
                    <Link>{isLoading ? 'Logout...' : 'Logout'}</Link>
                  </button>
                </div>
              </li>
            ) : (
              <li className="absolute bottom-4 w-[90%]">
                <div className="w-full flex items-center justify-center">
                  <button className="btn-primary px-3.5 py-2.5 font-semibold rounded-md w-full">
                    <Link to="/login">Login</Link>
                  </button>
                  <button className="btn-secondary px-3.5 py-2.5 font-semibold rounded-md w-full">
                    <Link to="/signup">Signup</Link>
                  </button>
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
    )
  }
}
