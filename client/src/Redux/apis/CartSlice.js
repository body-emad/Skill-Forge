import { apiSlice } from './apiSlice'

export const cartSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query({
      query: () => ({
        url: 'cart',
        method: 'GET',
        credentials: 'include',
      }),
      providesTags: (result, error, arg) =>
        result ? [{ type: 'Cart', id: 'USER_CART' }] : [],
    }),
    addToCart: builder.mutation({
      query: ({ courseId, quantity }) => ({
        url: 'cart/add',
        method: 'POST',
        body: { courseId, quantity },
        credentials: 'include',
      }),
      invalidatesTags: [{ type: 'Cart', id: 'USER_CART' }],
    }),
    removeFromCart: builder.mutation({
      query: ({ courseId }) => ({
        url: `cart/remove/${courseId}`,
        method: 'DELETE',
        credentials: 'include',
      }),
      invalidatesTags: [{ type: 'Cart', id: 'USER_CART' }],
    }),
    clearCart: builder.mutation({
      query: () => ({
        url: 'cart/clear',
        method: 'DELETE',
        credentials: 'include',
      }),
      invalidatesTags: [{ type: 'Cart', id: 'USER_CART' }],
    }),
  }),
})

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useClearCartMutation,
} = cartSlice
