import { Routes, Route } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import AboutUs from './Pages/About'
import NotFound from './Pages/NotFound'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import ChangePassword from './Pages/Password/ChangePassword'
import ForgotPassword from './Pages/Password/ForgotPassword'
import ResetPassword from './Pages/Password/ResetPassword'
import CourseList from './Pages/Course/CourseList'
import Contact from './Pages/Contact'
import Denied from './Pages/Denied'
import CourseDescription from './Pages/Course/CourseDescription'

import RequireAuth from './Components/auth/RequireAuth'
import CreateCourse from './Pages/Course/CreateCourse'
import Profile from './Pages/User/Profile'
import Checkout from './Pages/Payment/Checkout'
import CheckoutSuccess from './Pages/Payment/CheckoutSuccess'
import CheckoutFail from './Pages/Payment/CheckoutFail'
import DisplayLecture from './Pages/Dashboard/DisplayLecture'
import AddLecture from './Pages/Dashboard/AddLecture'
import AdminDashboard from './Pages/Dashboard/AdminDashboard'

import Cart from './Components/Cart'
import Wishlist from './Components/Wishlist'

import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import Pay from './Pages/Payment/Pay'
import EnrolledCourses from './Pages/Course/EnrolledCourses'

function App() {
  const stripePromise = loadStripe(
    'pk_test_51QQ75gKdeYJsEsGlUEJspCXFrMx4QWyWEAMGrAW01rokxXlvB8gOaz5bwf1chtTOvmV9MLQ1ppMKphOtIOPVbnMP00anqxqoWv'
  )
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/denied" element={<Denied />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/user/profile/reset-password"
          element={<ForgotPassword />}
        />
        <Route
          path="/user/profile/reset-password/:resetToken"
          element={<ResetPassword />}
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />

        <Route path="/courses" element={<CourseList />} />
        <Route path="/enrolled-courses" element={<EnrolledCourses />} />
        <Route
          path="/courses/description/:courseId"
          element={<CourseDescription />}
        />

        <Route element={<RequireAuth allowedRoles={['ADMIN']} />}>
          <Route path="/course/create" element={<CreateCourse />} />
          <Route path="/course/addlecture" element={<AddLecture />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>

        {/* Payment component */}
        <Route
          path={'/pay'}
          element={
            <Elements stripe={stripePromise}>
              <Pay />
            </Elements>
          }
        />

        <Route element={<RequireAuth allowedRoles={['USER', 'ADMIN']} />}>
          <Route path="/user/profile" element={<Profile />} />
          <Route
            path="/user/profile/change-password"
            element={<ChangePassword />}
          />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout/success" element={<CheckoutSuccess />} />
          <Route path="/checkout/fail" element={<CheckoutFail />} />
          <Route path="/course/displaylectures" element={<DisplayLecture />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
