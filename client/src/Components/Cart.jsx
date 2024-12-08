import { useGetCartQuery } from '../Redux/apis/CartSlice'

const Cart = () => {
  const { data: cart, isLoading, isError } = useGetCartQuery()

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error loading cart</p>

  return (
    <div>
      <h2 className="text-black dark:text-white">Your Cart</h2>
      {cart?.courses.map((course) => (
        <div key={course._id}>
          <h3>{course.title}</h3>
          <p>{course.description}</p>
          <p>Price: {course.price}</p>
        </div>
      ))}
    </div>
  )
}

export default Cart
