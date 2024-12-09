import { useForm, Controller } from 'react-hook-form'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
import Layout from '../../Layout/Layout'
import Loader from '../../Components/Loader'
import { useGetCartQuery } from '../../Redux/apis/CartSlice'
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
        className="flex flex-col items-center justify-center py-[120px] px-[60px] min-h-fit
       bg-[#ccffcc] bg-opacity-40 dark:bg-[#06402B] dark:bg-opacity-30 max-w-[30%] rounded-lg mx-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Name on Card */}
        <div className="flex flex-col items-start justify-center gap-3 w-full">
          <label htmlFor="name">Name on Card</label>
          <input
            className="w-full px-5 py-[16px] placeholder:text-[#BBB7B7] border-2 border-[#424141] rounded-[10px] bg-transparent"
            placeholder="Enter name on card"
            id="name"
            name="name"
            {...control.register('name', { required: true })}
          />
        </div>

        {/* Email */}
        <div className="flex flex-col items-start justify-center gap-3 w-full">
          <label htmlFor="email">Email</label>
          <input
            className="w-full px-5 py-[16px] placeholder:text-[#BBB7B7] border-2 border-[#424141] rounded-[10px] bg-transparent"
            placeholder="Enter email"
            id="email"
            name="email"
            {...control.register('email', { required: true })}
          />
        </div>

        {/* Address */}
        <div className="flex flex-col items-start justify-center gap-3 w-full">
          <label htmlFor="address">Address</label>
          <input
            className="w-full px-5 py-[16px] placeholder:text-[#BBB7B7] border-2 border-[#424141] rounded-[10px] bg-transparent"
            placeholder="Enter address"
            id="address"
            name="address"
            {...control.register('address', { required: true })}
          />
        </div>

        {/* Phone */}
        <div className="flex flex-col items-start justify-center gap-3 w-full">
          <label htmlFor="phone">Phone</label>
          <input
            className="w-full px-5 py-[16px] placeholder:text-[#BBB7B7] border-2 border-[#424141] rounded-[10px] bg-transparent"
            placeholder="Enter phone number"
            id="phone"
            name="phone"
            {...control.register('phone', { required: true })}
          />
        </div>

        {/* Card Element */}
        <div className="w-full flex flex-col items-start justify-center gap-3 py-10">
          <label htmlFor="card">Card Details</label>
          <Controller
            name="card"
            control={control}
            render={({ field }) => (
              <CardElement
                className="w-full"
                id="card"
                options={{
                  style: {
                    base: {
                      iconColor: '#fff',
                      fontWeight: '500',
                      color: '#fff',
                      fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
                      fontSize: '16px',
                      fontSmoothing: 'antialiased',
                      ':-webkit-autofill': {
                        color: '#fce883',
                      },
                      '::placeholder': {
                        color: '#BBB7B7',
                      },
                    },
                    invalid: {
                      iconColor: '#FFC7EE',
                      color: '#FFC7EE',
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
          className="flex items-center justify-center w-[80%] py-3 text-[16px] bg-[#146244] rounded-[5px] text-white hover:bg-opacity-90"
        >
          {loading ? (
            <Loader width={'20px'} height={'20px'} color={'#fff'} />
          ) : (
            'Pay'
          )}
        </button>
      </form>
    </Layout>
  )
}

export default Pay
