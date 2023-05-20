import { createSlice } from "@reduxjs/toolkit";
import { ClotheType } from "./clothesSlice";
import { RootState } from "./store";

export interface LocalUser {
  given_name: string
  surname: string 
  gender: string 
  wishlist: ClotheType[]
  cart: ClotheType[]
  email?: string
  dob?: string 
}
export type AuthState = {
  key: string | null
  loggedIn: boolean
  email: string
}
const initialState: AuthState = {
  key: null,
  loggedIn: false,
  email: ''
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
    }
  },
})

export const selectUsersEmail = (state: RootState) => state.auth.email

export const { setAuth, loggedIn, setEmailOnLogin } = userSlice.actions

export default userSlice.reducer 