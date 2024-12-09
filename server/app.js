import { configDotenv } from 'dotenv'
configDotenv()
import cors from 'cors'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import userRoutes from './routes/user.routes.js'
import courseRoutes from './routes/course.routes.js'
import cartRoutes from './routes/cart.routes.js'
import wishlistRoutes from './routes/wishlist.routes.js'
import reviewsRoutes from './routes/review.routes.js'
import checkoutRoutes from './routes/checkout.routes.js'
import miscellaneousRoutes from './routes/miscellaneous.routes.js'
import express from 'express'
import connectToDb from './config/db.config.js'
import errorMiddleware from './middleware/error.middleware.js'

const app = express()

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(morgan('dev'))
app.use(cors({ origin: 'http://localhost:5173', credentials: true }))

app.use('/api/v1/user', userRoutes)
app.use('/api/v1/courses', courseRoutes)
app.use('/api/v1/checkouts', checkoutRoutes)
app.use('/api/v1/cart', cartRoutes)
app.use('/api/v1/wishlist', wishlistRoutes)
app.use('/api/v1/reviews', reviewsRoutes)
app.use('/api/v1/', miscellaneousRoutes)

app.all('*', (req, res) => {
  res.status(404).send('OOPS!! 404 page not found')
})

app.use(errorMiddleware)

// db init
connectToDb()

export default app
