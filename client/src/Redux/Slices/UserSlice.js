import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { axiosInstance } from '../../Helpers/axiosInstance'

export const updateUserEnrollment = createAsyncThunk(
  'user/updateUserEnrollment',
  async ({ userId, courseId }, { rejectWithValue }) => {
    console.log('rtk userId: ', userId)
    console.log('courseId: ', courseId)
    try {
      const response = await axiosInstance.post(
        `http://localhost:5000/api/v1/checkouts/${userId}/enroll`,

        {
          courseId,
        }
      )
      console.log('response: ', response)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: null,
    error: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateUserEnrollment.pending, (state) => {
      state.loading = true // Optionally handle loading state
    })

    builder.addCase(updateUserEnrollment.fulfilled, (state, action) => {
      state.loading = false
      state.data = action.payload
    })

    builder.addCase(updateUserEnrollment.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload || 'An error occurred'
    })
  },
})

export default userSlice.reducer
