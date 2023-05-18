import { createSlice } from "@reduxjs/toolkit";
import { ClotheType } from "./clothesSlice";


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
      console.log(action.payload)
      state.loggedIn = action.payload
    },
    setEmailOnLogin: (state, action) => {
      state.email = action.payload
    }
  },
})
export const { setAuth, loggedIn } = userSlice.actions

export default userSlice.reducer 