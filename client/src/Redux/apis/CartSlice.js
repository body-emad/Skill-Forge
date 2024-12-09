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
      query: ({ courseId, cartId }) => ({
        url: `cart/remove/${courseId}`,
        method: 'DELETE',
        credentials: 'include',
        body: { cartId },
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
