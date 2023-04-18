import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'
import Cookies from 'js-cookie'
import { getCookie } from 'cookies-next';
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

  const tok = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MzQwY2ZhMTk3MGEyNWE5ZGNlOGVjOSIsImlhdCI6MTY4MTgyMTI0MSwiZXhwIjoxNjg0NDEzMjQxfQ.ylj6WXnsT7K8pULgxebdlVMBdin0EZmCQDXgFUbi2_I'
export const apiSlice = createApi({
  reducerPath: 'apiSlice',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://shauns-ecommerce.herokuapp.com/api/asos/',
    credentials: 'include',
    // mode: 'no-cors',
    prepareHeaders: (headers) => {
      let jwt:any = Cookies.get('jwt')
      if (jwt === undefined || jwt === null )  jwt = getCookie('jwt') 
      console.log(jwt) // only works client side as cookies are not available server side
      if (jwt) headers.set('Authorization', `Bearer ${jwt}`)
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