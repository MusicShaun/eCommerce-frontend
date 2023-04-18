import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'
import Cookies from 'js-cookie'
export interface User {
  token: string
  email: string
}
export interface LoginRequest {
  email: string
  password: string
}


const isBrowser = typeof window !== 'undefined'

const localhostOrHeroku = isBrowser
  ? 'http://localhost:5000/api/asos/'
  : 'https://shauns-ecommerce.herokuapp.com/api/asos/'

  
export const apiSlice = createApi({
  reducerPath: 'apiSlice',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/asos/',
    credentials: 'include',
    // mode: 'no-cors',
    prepareHeaders: (headers) => {
      const jwt = Cookies.get('jwt') // only works client side as cookies are not available server side
      if (jwt) headers.set('Authorization', `Bearer ${jwt}`)
      
      const userId = Cookies.get('userId')
      if (userId) headers.set('X-UserId', userId)
      return headers
    },
  }),
  tagTypes: ['Status', 'Clothes', 'Auth'],
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
  endpoints: (builder) => ({
    // do elsewhere
  })
})