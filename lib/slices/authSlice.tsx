import { createSlice } from "@reduxjs/toolkit";
import { ClotheType } from "./clothesSlice";
import { RootState } from "../store";
import { useAppDispatch } from "../hooks/hooks";

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
  key: string | null
  loggedIn: boolean
  email: string
  cognitoId: string
}
const initialState: AuthState = {
  key: null,
  loggedIn: false,
  email: 'empty',
  cognitoId: 'empty'
}


const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.key = action.payload
    },
    loggedIn: (state, action) => {
      state.loggedIn = action.payload
    },
    setEmailOnLogin: (state, action) => {
      state.email = action.payload
    },
    setCognitoId: (state, action) => {
      state.cognitoId = action.payload
    },
    signOut: (state) => {
      state.key = null
      state.loggedIn = false
      state.email = 'empty'
    }
  },
  
})

export const selectUsersEmail = (state: RootState) => state.auth.email
export const selectHeaderToken = (state: RootState) => state.auth.key

export const { setAuth, loggedIn, setEmailOnLogin, signOut , setCognitoId} = userSlice.actions

export default userSlice.reducer 