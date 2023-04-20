import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'
import dynamic from 'next/dynamic'
import { GetServerSideProps } from 'next';
import { LocalUser } from './authSlice';
import { extendedUserSlice } from './userSlice';
import { IncomingMessage } from 'http';
import { parse } from 'cookie';
// import Cookies from 'js-cookie';

export interface User {
  token: string
  email: string
}
export interface LoginRequest {
  email: string
  password: string
}


const localhostOrHeroku = [
   'http://localhost:5000/api/asos/',
   'https://shauns-ecommerce.herokuapp.com/api/asos/'
]


const loadCookies = () => import('js-cookie');


export const apiSlice = createApi({
  reducerPath: 'apiSlice',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://shauns-ecommerce.herokuapp.com/api/asos/',
    credentials: 'include',
    // mode: 'no-cors',

    prepareHeaders: async (headers) => {

      const { default: Cookies } = await loadCookies();
      const token = Cookies.get('jwt')
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }

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


export function getToken(req: IncomingMessage): string | undefined {
  const cookies = parse(req.headers.cookie || '');
  console.log('this is the getToken function in apiSlice')
  console.log(cookies.token)
  return cookies.token;
}


