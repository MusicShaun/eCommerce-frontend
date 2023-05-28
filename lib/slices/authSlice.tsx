import { createSlice } from "@reduxjs/toolkit";
import { ClotheType } from "./clothesSlice";
import { RootState } from "../store";

export interface LocalUser {
  given_name?: string
  surname?: string 
  gender?: string 
  wishlist?: ClotheType[]
  cart?: ClotheType[]
  email?: string
  dob?: string 
  cognitoId: string
  
}
export type AuthState = {
  token: string | null
  isAuthenticated: boolean
  email: string 
  cognitoId: string
}
const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
  email: '',
  cognitoId: ''
}

let persistedStorage: Partial<AuthState> 
if (typeof localStorage !== 'undefined') persistedStorage = JSON.parse(localStorage.getItem('authState') || '{}');

const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.token = action.payload
      if (persistedStorage) localStorage.setItem('authState', JSON.stringify({...persistedStorage, token: action.payload}))
    },
    isAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload
    },
    setEmailOnLogin: (state, action) => {
      state.email = action.payload
      if (persistedStorage) localStorage.setItem('authState', JSON.stringify({...persistedStorage, email: action.payload}))
    },
    setCognitoId: (state, action) => {
      state.cognitoId = action.payload
    },
    signOut: (state) => {
      state.token = null
      state.isAuthenticated = false
      state.email = ''
      state.cognitoId = ''
    }
  },
  
})

export const selectUsersEmail = (state: RootState) => state.auth.email
export const selectHeaderToken = (state: RootState) => state.auth.token
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated

export const { setAuth, isAuthenticated, setEmailOnLogin, signOut , setCognitoId} = userSlice.actions

export default userSlice.reducer 