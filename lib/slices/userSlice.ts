import { RootState } from '../store'
import { apiSlice } from './apiSlice'
import { LocalUser } from './authSlice'
import { getAuthEmail } from '../selectors';
export interface Signup {
  email: string
  cognitoId: string
}
interface Status {
  status: string
}
type AddItem = Pick<LocalUser, 'cart'> | Pick<LocalUser, 'wishlist'>


// const usersAdapter = createEntityAdapter({
//     selectId: (user: LocalUser) => 'userId',
//     }
// )
// const initialState = usersAdapter.getInitialState()


export const extendedUserSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<'', { email: string, password: string }>({
      query: (body) => ({
        url: '/users/login',
        method: 'POST',
        body,
        
      }),
    }),


    
    getUser: builder.query<any, string>({
      query: (email) => ({
        url: `/users`,
        method: 'POST',
        body:  {email: email }
      }),
      transformResponse: (user: LocalUser) => {
        if (typeof localStorage !== 'undefined' ) localStorage.setItem('key', JSON.stringify({ ...user }))
        console.log('GET USER EXECUTED :: ')
        return user
        // return usersAdapter.setAll(initialState, [user])
      },
      providesTags: ['Auth'],
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
        body: {email: getAuthEmail(), ...body}
      }), 
      onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const putResult = dispatch(
          extendedUserSlice.util.updateQueryData('getUser', getAuthEmail(), (draft) => {
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
        body: { email: getAuthEmail(), ...body }
      }),
      onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const putResult = dispatch(
          extendedUserSlice.util.updateQueryData('getUser', getAuthEmail(), (draft) => {
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
    
  }),
  overrideExisting: true,
})

export const {
  useLoginMutation,
  useGetUserQuery,
  useRegisterMutation,
  useAddWishListItemMutation,
  useAddCartItemMutation,
  useGuestMutation,
  useUpdateUserMutation
} = extendedUserSlice





export const selectUser = (state: RootState, email: string) =>
  extendedUserSlice.endpoints.getUser.select(email)(state)?.data ?? {}

