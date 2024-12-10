import { useForm, Controller } from 'react-hook-form'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
import Layout from '../../Layout/Layout'
import Loader from '../../Components/Loader'
import {
  useClearCartMutation,
  useGetCartQuery,
} from '../../Redux/apis/CartSlice'
import { useDispatch, useSelector } from 'react-redux'
import { updateUserEnrollment } from '../../Redux/Slices/UserSlice'

const Pay = () => {
  const stripe = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState(false)
  const { handleSubmit, control } = useForm()
  const navigate = useNavigate()
  const location = useLocation()
  const amount = location?.state
  const [clearCart] = useClearCartMutation()

  const user = useSelector((state) => state.auth.data)
  const dispatch = useDispatch()

  const { data: cart } = useGetCartQuery()
  const courses = cart?.cart?.courses
  const courseId = courses.map((course) => course.courseId._id)[0]
  console.log('courseId: ', courseId)

  const onSubmit = async (data) => {
    if (!stripe || !elements) {
      console.error('Stripe.js has not loaded yet.')
      return
    }

    const cardElement = elements.getElement(CardElement)

    try {
      setLoading(true)

      // Step 1: Request Payment Intent from the backend
      const {
        data: { clientSecret },
      } = await axios.post(
        'http://localhost:5000/api/v1/checkouts/create-payment-intent',
        {
          amount: Math.round(amount * 100), // Convert to cents
          email: data.email,
          address: data.address,
          phone: data.phone,
          description: `Payment for order #${Math.random()
            .toString(36)
            .substr(2, 9)}`,
        }
      )

      // Step 2: Confirm the Payment Intent with the clientSecret
      const { paymentIntent, error } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: data.name,
              email: data.email,
              address: {
                line1: data.address,
              },
            },
          },
        }
      )
      const userId = user._id
      if (error) {
        console.error('Payment failed:', error.message)
        setLoading(false)
      } else if (paymentIntent.status === 'succeeded') {
        try {
          await dispatch(updateUserEnrollment({ userId, courseId }))
          console.log('User successfully enrolled in the courses')
          await clearCart()
        } catch (error) {
          console.error('Error updating user enrollment:', error)
        }
        console.log('Payment successful:', paymentIntent)
        navigate('/checkout/success')
      }
    } catch (error) {
      console.error(
        'Error processing payment:',
        error.response?.data || error.message
      )
      navigate('/checkout/fail')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      <form
        className="flex flex-col items-center justify-center p-8 sm:p-10 bg-white dark:bg-gray-800 shadow-md rounded-lg mx-auto max-w-md space-y-6 mt-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Name on Card */}
        <div className="flex flex-col w-full space-y-2">
          <label
            htmlFor="name"
            className="text-sm font-semibold text-gray-700 dark:text-gray-300"
          >
            Name on Card
          </label>
          <input
            className="w-full px-4 py-2 border rounded-md text-gray-800 dark:text-gray-100 bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Enter name on card"
            id="name"
            name="name"
            {...control.register('name', { required: true })}
          />
        </div>

        {/* Email */}
        <div className="flex flex-col w-full space-y-2">
          <label
            htmlFor="email"
            className="text-sm font-semibold text-gray-700 dark:text-gray-300"
          >
            Email
          </label>
          <input
            className="w-full px-4 py-2 border rounded-md text-gray-800 dark:text-gray-100 bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Enter email"
            id="email"
            name="email"
            {...control.register('email', { required: true })}
          />
        </div>

        {/* Address */}
        <div className="flex flex-col w-full space-y-2">
          <label
            htmlFor="address"
            className="text-sm font-semibold text-gray-700 dark:text-gray-300"
          >
            Address
          </label>
          <input
            className="w-full px-4 py-2 border rounded-md text-gray-800 dark:text-gray-100 bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Enter address"
            id="address"
            name="address"
            {...control.register('address', { required: true })}
          />
        </div>

        {/* Phone */}
        <div className="flex flex-col w-full space-y-2">
          <label
            htmlFor="phone"
            className="text-sm font-semibold text-gray-700 dark:text-gray-300"
          >
            Phone
          </label>
          <input
            className="w-full px-4 py-2 border rounded-md text-gray-800 dark:text-gray-100 bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Enter phone number"
            id="phone"
            name="phone"
            {...control.register('phone', { required: true })}
          />
        </div>

        {/* Card Element */}
        <div className="flex flex-col w-full space-y-2">
          <label
            htmlFor="card"
            className="text-sm font-semibold text-gray-700 dark:text-gray-300"
          >
            Card Details
          </label>
          <Controller
            name="card"
            control={control}
            render={({ field }) => (
              <CardElement
                className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                id="card"
                options={{
                  style: {
                    base: {
                      iconColor: '#A78BFA',
                      fontWeight: '500',
                      color: '#111827',
                      fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
                      fontSize: '16px',
                      fontSmoothing: 'antialiased',
                      '::placeholder': { color: '#9CA3AF' },
                    },
                    invalid: {
                      iconColor: '#EF4444',
                      color: '#EF4444',
                    },
                  },
                }}
                onChange={(event) => field.onChange(event.complete)}
              />
            )}
          />
        </div>

        {/* Submit Button */}
        <button
          disabled={loading}
          className="w-full text-center items-center py-3 text-sm font-semibold text-white bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          {loading ? <Loader width="20px" height="20px" color="#fff" /> : 'Pay'}
        </button>
      </form>
    </Layout>
  )
}

export default Pay
