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


export const apiSlice = createApi({
  reducerPath: 'apiSlice',
  baseQuery: fetchBaseQuery({
    // baseUrl: 'https://shauns-ecommerce.herokuapp.com/api/asos/',
    baseUrl: 'http://localhost:5000/api/asos/',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.key?.accessToken
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