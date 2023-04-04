import { RootState } from './store'
import { ClotheType } from './clothesSlice'
import { apiSlice } from './apiSlice'
import { LocalUser, Profile } from './authSlice'

export interface Signup {
  email: string
  password: string
  passwordConfirm: string
  gender: string
  given_name: string
  surname: string 
  dob: string
}

export const extendedUserSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LocalUser, { email: string, password: string }>({
      query: (body) => ({
        url: '/users/login',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Auth'], // Should these be provides tags? 
    }),
    register: builder.mutation<LocalUser, Signup>({
      query: (body) => ({
        url: '/users/signup',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Auth'],
    }),
    guest: builder.mutation<any, any>({
      query: (body) => ({
        url: '/users/guest',
        method: 'POST',
        body,
      }),
      // invalidatesTags: ['Auth'],
    }),
    addWishListItem: builder.mutation<LocalUser, LocalUser>({
      query: (body) => ({
        url: `/users/${body.profile._id}`,
        method: 'PUT',
        body: body,
      }),
      
      invalidatesTags: ['Auth'],
    }),
    addCartItem: builder.mutation<LocalUser, LocalUser>({
      query: (body) => ({
        url: `/users/${body.profile._id}`,
        method: 'PUT',
        body: body,
      }),
      
      invalidatesTags: ['Auth'],
    }),
    updateUser: builder.mutation<LocalUser, Profile>({
      query: (body) => ({
        url: `/users/${body._id}`,
        method: 'PUT',
        body: body
      }),
      invalidatesTags: ['Auth']
    }),
    forgotPassword: builder.mutation<any, any>({//! fix the any any types 
      query: (body) => ({
        url: '/users/forgotPassword',
        method: 'POST',
        body, 
      }),
    }),
    resetPassword: builder.mutation<any, any>({
      query: (body) => ({
        url: `/users/resetPassword/${body.accessToken}`,
        method: 'PATCH',
        body,
      }),
    }),
  })
})

export const { useLoginMutation,
  useRegisterMutation,
  useAddWishListItemMutation,
  useAddCartItemMutation,
  useGuestMutation,
  useUpdateUserMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = extendedUserSlice


export const selectCurrentUser = (state: RootState) => state.user.key
export const selectWishlist = (state: RootState): ClotheType[] => state.user.key?.profile.wishlist ?? []
export const selectCart = (state: RootState): ClotheType[] => state.user.key?.profile.cart ?? []