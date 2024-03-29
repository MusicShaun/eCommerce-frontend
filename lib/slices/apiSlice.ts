import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'
import { RootState } from '../store'


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

const development = process.env.NEXT_PUBLIC_NODE_ENV === 'development'
const BASE_URL = development
  ? 'http://localhost:8080/api/asos/'
  : 'https://shauns-ecommerce.herokuapp.com/api/asos/'

export const apiSlice = createApi({
  reducerPath: 'apiSlice',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      // Get the JWT token from your Redux store state or any suitable storage mechanism
      const token = (getState() as RootState).auth.token;
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
