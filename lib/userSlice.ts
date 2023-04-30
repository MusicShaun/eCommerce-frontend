import { RootState } from './store'
import { ClotheType } from './clothesSlice'
import { apiSlice } from './apiSlice'
import { LocalUser } from './authSlice'
import { createEntityAdapter, createSelector } from '@reduxjs/toolkit'

export interface Signup {
  email: string
  password: string
  passwordConfirm: string
  gender: string
  given_name: string
  surname: string 
  dob: string
}

interface Status {
  status: string
}
type AddItem = Pick<LocalUser, 'cart'> | Pick<LocalUser, 'wishlist'>

const usersAdapter = createEntityAdapter({
    selectId: (user: LocalUser) => 'userId',
    }
)
const initialState = usersAdapter.getInitialState()


export const extendedUserSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<'', { email: string, password: string }>({
      query: (body) => ({
        url: '/users/login',
        method: 'POST',
        body,
        
      }),
    }),
    
    getUser: builder.query<any, void>({
      query: () => `/users`,

      transformResponse: (user: LocalUser) => {
        localStorage.setItem('key', JSON.stringify({ ...user }))
        console.log('transform responese')
        console.log(usersAdapter.setAll(initialState, [user]))
        return usersAdapter.setAll(initialState, [user])
      },
      providesTags: (result, error, arg) => [
        { type: 'Auth', id: "userId" }
      ],
      
    }),

    logout: builder.mutation<Status, void>({
      query: () => ({
        url: '/users/logout',
        method: 'POST',
      }),
      invalidatesTags: ['Auth'],
    }),
  
    register: builder.mutation<Status, Signup>({
      query: (body) => ({
        url: '/users/signup',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Auth'],
    }),


    guest: builder.mutation<Status, AddItem>({
      query: (body) => ({
        url: '/users/guest',
        method: 'POST',
        body,
      }),
      // invalidatesTags: ['Auth'],
    }),
    
    addWishListItem: builder.mutation<Status, LocalUser>({
      query: (body) => ({
        url: `/users/`,
        method: 'PUT',
        body,
      }), 
      onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const putResult = dispatch(
          extendedUserSlice.util.updateQueryData('getUser', undefined, (draft) => {
            Object.assign(draft, arg)
          })
        )
        queryFulfilled.catch(putResult.undo)
      },
      invalidatesTags: ['Auth']
    }),


    addCartItem: builder.mutation<Status, LocalUser>({
      query: (body) => ({
        url: `/users/`,
        method: 'PUT',
        body: body,
      }),
      onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const putResult = dispatch(
          extendedUserSlice.util.updateQueryData('getUser', undefined, (draft) => {
            Object.assign(draft, arg)
          })
        )
        queryFulfilled.catch(putResult.undo)
      },
      invalidatesTags: ['Auth']
    }),


    updateUser: builder.mutation<Status, LocalUser>({
      query: (body) => ({
        url: `/users/`,
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
    
  }),
  overrideExisting: true,
})

export const {
  useLoginMutation,
  useGetUserQuery,
  useLogoutMutation,
  useRegisterMutation,
  useAddWishListItemMutation,
  useAddCartItemMutation,
  useGuestMutation,
  useUpdateUserMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = extendedUserSlice

// return the query result object from  getUser 
export const selectUserResult = extendedUserSlice.endpoints.getUser.select()

// create the dumb memozied selector
const selectUserData = createSelector(
  selectUserResult,
  userResult => userResult.data // this is the normalised state object with ids& entities // not that i need it 
)

// create the smart selector
export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
} = usersAdapter.getSelectors<RootState>(state => selectUserData(state) ?? initialState)

