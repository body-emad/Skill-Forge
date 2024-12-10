import { apiSlice } from './apiSlice'

export const reviewsSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch reviews for a course
    getAllReviews: builder.query({
      query: (courseId) => `/reviews/${courseId}`,
      transformResponse: (response) => response.reviews,
      providesTags: (result, error, courseId) => [
        { type: 'Reviews', id: courseId },
      ],
    }),

    // Create a new review
    createReview: builder.mutation({
      query: ({ courseId, rating, comment }) => ({
        url: `/reviews/${courseId}`,
        method: 'POST',
        body: { rating, comment },
        credentials: 'include',
      }),
      invalidatesTags: (result, error, { courseId }) => [
        { type: 'Reviews', id: courseId },
      ],
    }),

    // Delete a review
    deleteReview: builder.mutation({
      query: ({ reviewId }) => ({
        url: `/reviews/${reviewId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Reviews', id: 'LIST' }],
    }),
  }),
})

export const {
  useGetAllReviewsQuery,
  useCreateReviewMutation,
  useDeleteReviewMutation,
} = reviewsSlice
