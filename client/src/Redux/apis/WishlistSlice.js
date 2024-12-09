import { apiSlice } from './apiSlice'

export const wishlistSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWishlist: builder.query({
      query: () => ({
        url: 'wishlist',
        method: 'GET',
        credentials: 'include',
      }),

      providesTags: (result, error, arg) =>
        result ? [{ type: 'Wishlist', id: 'USER_WISHLIST' }] : [],
    }),
    addToWishlist: builder.mutation({
      query: ({ courseId }) => ({
        url: 'wishlist/add',
        method: 'POST',
        body: { courseId },
        credentials: 'include',
      }),
      invalidatesTags: [{ type: 'Wishlist', id: 'USER_WISHLIST' }],
    }),
    removeFromWishlist: builder.mutation({
      query: ({ courseId }) => ({
        url: `wishlist/remove/${courseId}`,
        method: 'DELETE',
        credentials: 'include',
      }),
      invalidatesTags: [{ type: 'Wishlist', id: 'USER_WISHLIST' }],
    }),
  }),
})

export const {
  useGetWishlistQuery,
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
} = wishlistSlice
