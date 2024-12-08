import { apiSlice } from './apiSlice'

export const cartSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query({
      query: () => ({
        url: 'cart',
        method: 'GET',
      }),
      providesTags: (result, error, arg) =>
        result ? [{ type: 'Cart', id: 'USER_CART' }] : [],
    }),
    addToCart: builder.mutation({
      query: (courseId) => ({
        url: 'cart/add',
        method: 'POST',
        body: { courseId },
      }),
      invalidatesTags: [{ type: 'Cart', id: 'USER_CART' }],
    }),
    removeFromCart: builder.mutation({
      query: (courseId) => ({
        url: `cart/remove/${courseId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Cart', id: 'USER_CART' }],
    }),
  }),
})

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useRemoveFromCartMutation,
} = cartSlice
