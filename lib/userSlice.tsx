import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";

interface User  { //! MAKE A USER WITH REQUIRED MIXED WITH A PARTIAL
  status: string
  firstName: string
  lastName: string
  email: string
  password: string
  dob: string
  interest: string
  token: string
  wishlist: []
  cart: []
  _id: string
}
type PartialUser = Partial<User>
type LoginUser = Pick<User, 'email' | 'password'>
type RegisterUser = Pick<User, 'firstName' | 'lastName' | 'email' | 'password' | 'dob' | 'interest'>

const UserAdapter = createEntityAdapter({})

const initialState = UserAdapter.getInitialState() //! what does this do

export const extendedUserSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({

    addUser: builder.mutation<PartialUser, RegisterUser>({
      query: initialPost => ({
        url: '/users/signup',
        method: 'POST',
        body: {
          ...initialPost
        }
      }),
      invalidatesTags: ['User']
    }),

    loginUser: builder.mutation<void, LoginUser >({ //* THE MUTATION ARGUMENTS GO AS FOLLOWS <WHAT YOU WANT BACK, WHAT YOU SEND TO GET IT>
      query: initialPost => ({
        url: 'users/login',
        method: 'POST',
        body: {
          ...initialPost
        }
      }),
      invalidatesTags: ['User']
    }),

    addWishListItem: builder.mutation<PartialUser, PartialUser>({
      query(data) {
        console.log('addWishListItem: userSlice')
        console.log(data)
        const { _id, ...body } = data
        return {
          url: `users/${_id}`,
          method: 'PUT',
          body,
        }
      },
      //! Do you need to learn onQueryStarted 
      //! Omit token 
      // Invalidates all queries that subscribe to this Post `id` only. //! do i getUser or leave it? Seems like a waste
      // In this case, `getPost` will be re-run. `getPosts` *might*  rerun, if this id was under its results.
      invalidatesTags: (result, error, { _id }) => [{ type: 'User', _id }],
    }),

  })
})

export const {
  useAddUserMutation,
  useLoginUserMutation,
  useAddWishListItemMutation,
} = extendedUserSlice