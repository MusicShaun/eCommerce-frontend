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
    baseUrl: 'https://shauns-ecommerce.herokuapp.com/api/asos/',
    prepareHeaders: (headers) => {
      const token = Cookies.get('jwt')
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ['Clothes', 'Auth'],
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
  endpoints: (builder) => ({
    // do elsewhere
  })
})