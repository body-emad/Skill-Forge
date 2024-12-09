import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'
import { axiosInstance } from '../../Helpers/axiosInstance'

const initialState = {
  coursesData: [],
  totalPages: 0,
  currentPage: 1,
  totalCourses: 0,
  loading: false,
  error: null,
}

// ....get all courses....
export const getAllCourses = createAsyncThunk(
  '/courses/get',
  async (queries = {}, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get('/courses', { params: queries })
      return res?.data
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to fetch courses')
      return rejectWithValue(error?.response?.data)
    }
  }
)

// ....create course....
export const createNewCourse = createAsyncThunk(
  '/courses/create',
  async (data) => {
    const loadingMessage = toast.loading('Creating course...')
    try {
      const res = await axiosInstance.post('/courses', data)
      toast.success(res?.data?.message, { id: loadingMessage })
      return res?.data
    } catch (error) {
      toast.error(error?.response?.data?.message, { id: loadingMessage })
      throw error
    }
  }
)

// ....delete course......
export const deleteCourse = createAsyncThunk('/course/delete', async (id) => {
  const loadingId = toast.loading('deleting course ...')
  try {
    const response = await axiosInstance.delete(`/courses/${id}`)
    toast.success('Courses deleted successfully', { id: loadingId })
    return response?.data
  } catch (error) {
    toast.error('Failed to delete course', { id: loadingId })
    throw error
  }
})

const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handling the pending state
      .addCase(getAllCourses.pending, (state) => {
        state.loading = true
        state.error = null
      })
      // Handling the fulfilled state
      .addCase(getAllCourses.fulfilled, (state, action) => {
        state.loading = false
        state.coursesData = action.payload.courses
        state.totalPages = action.payload.totalPages
        state.currentPage = action.payload.currentPage
        state.totalCourses = action.payload.totalCourses
      })
      // Handling the rejected state
      .addCase(getAllCourses.rejected, (state, action) => {
        state.loading = false
        state.error =
          action.payload || 'An error occurred while fetching courses.'
      })
  },
})

export default courseSlice.reducer
