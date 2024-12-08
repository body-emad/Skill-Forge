import { configureStore } from '@reduxjs/toolkit'
import AuthSliceReducer from './Slices/AuthSlice'
import CourseSliceReducer from './Slices/CourseSlice'
import RazorpaySliceReducer from './Slices/RazorpaySlice'
import LectureSliceReducer from './Slices/LectureSlice'
import StatSliceReducer from './Slices/StatSlice'
import { apiSlice } from './apis/apiSlice'

const store = configureStore({
  reducer: {
    auth: AuthSliceReducer,
    course: CourseSliceReducer,
    razorpay: RazorpaySliceReducer,
    lecture: LectureSliceReducer,
    stat: StatSliceReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiSlice.middleware),
})

export default store