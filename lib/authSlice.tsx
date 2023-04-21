import { createSlice } from "@reduxjs/toolkit";
import { RootState, store } from "./store";
import { ClotheType } from "./clothesSlice";
import { extendedUserSlice } from "./userSlice";


// export interface LocalUser { //* localStorage 
//     expiresAt: string
//     marked_as_expired: boolean
//     profile: Profile
//     countryCode: string
// }
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
  key: LocalUser | null
}
const initialState: AuthState = {
  key: null,
}


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {} ,
  extraReducers: builder => {

    builder.addMatcher(
      extendedUserSlice.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        console.log('User logged in')
      }
    ),
    builder.addMatcher(
      extendedUserSlice.endpoints.getUser.matchFulfilled,
      (state, { payload }) => {
        state.key = payload
      }
    ),
    builder.addMatcher(
      extendedUserSlice.endpoints.register.matchFulfilled,
      (state, { payload }) => {
        state.key = payload
      }
    ),
    builder.addMatcher(
      extendedUserSlice.endpoints.guest.matchFulfilled,
      (state, { payload }) => {
        state.key = payload
      }
    ),
    builder.addMatcher(
      extendedUserSlice.endpoints.addWishListItem.matchFulfilled,
      (state, { payload }) => {
        state.key = payload
      }
    ),
    builder.addMatcher(
      extendedUserSlice.endpoints.addCartItem.matchFulfilled,
      (state, { payload }) => {
        state.key = payload
      }
    ),
    builder.addMatcher(
      extendedUserSlice.endpoints.updateUser.matchFulfilled,
      (state, { payload }) => {
        state.key = payload
      }
    )
      
  },
})


export const selectCurrentUser = (state: RootState) => state.user.key
export default userSlice.reducer