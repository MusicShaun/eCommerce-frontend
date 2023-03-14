import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store'
import { ClotheType } from './clothesSlice'
import { apiSlice } from './apiSlice'
import { LocalUser, Profile } from './authSlice'

export interface Signup {
  email: string
  password: string
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
      invalidatesTags: ['Auth'],
    }),
    register: builder.mutation<LocalUser, Signup>({
      query: (body) => ({
        url: '/users/signup',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Auth'],
    }),
    addWishListItem: builder.mutation<LocalUser, LocalUser>({
      query: (body) => ({
        url: `/users/${body.profile._id}`,
        method: 'PUT',
        body: body,
      }),
      
      invalidatesTags: ['Auth'],
    }),
  })
})

export const { useLoginMutation,
  useRegisterMutation,
  useAddWishListItemMutation,

} = extendedUserSlice


export const selectCurrentUser = (state: RootState) => state.user.key
export const selectWishlist = (state: RootState): ClotheType[] => state.user.key?.profile.wishlist ?? []
