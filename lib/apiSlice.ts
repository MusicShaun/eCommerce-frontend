import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'
import { RootState } from './store'


export interface User {
  token: string
  email: string
}
export interface LoginRequest {
  email: string
  password: string
}
interface Status {
  status: string
}



  //  'http://localhost:5000/api/asos/',
  //  'https://shauns-ecommerce.herokuapp.com/api/asos/'


export const apiSlice = createApi({
  reducerPath: 'apiSlice',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://shauns-ecommerce.herokuapp.com/api/asos/',
    prepareHeaders: (headers, { getState }) => {
      // Get the JWT token from your Redux store state or any suitable storage mechanism
      const token = (getState() as RootState).auth.key;
      if (token) {
        // Include the token in the Authorization header
        headers.set('Authorization', `Bearer ${token}`);
      }
  
      return headers;
    },
  }),

  tagTypes: ['Status', 'Clothes', 'Auth', 'LoggedIn'],
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }

  },
  endpoints: (builder) => ({

    isLoggedIn: builder.query<boolean, void>({
      query: () => `/users/isloggedin`,
      providesTags: ['LoggedIn'],
      transformResponse: (status: Status) => {
        if (status.status === 'success') {
          return true
        } else { return false }
      },
    })
  })
})

export const { useIsLoggedInQuery } = apiSlice
