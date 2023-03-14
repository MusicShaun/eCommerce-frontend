import { createSlice, createEntityAdapter, createSelector, EntityState, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import { RootState, store } from "./store";
import { FetchBaseQueryMeta } from "@reduxjs/toolkit/dist/query";
import { ClotheType } from "./clothesSlice";
import axios from "axios";
import { extendedUserSlice } from "./userSlice";

export interface Profile {
  given_name: string
  surname: string 
  gender: string 
  wishlist: ClotheType[]
  cart: []
  _id: string
  email?: string
  dob?: string 
}
export interface LocalUser { //* localStorage 
    accessToken: string
    expires_at: string
    marked_as_expired: boolean
    profile: Profile
    countryCode: string
}

type AuthState = {
  key: LocalUser | null
}


const userSlice = createSlice({
  name: 'user',
  initialState: { key: null} as AuthState,
  reducers: {} ,
  extraReducers: builder => {

    builder.addMatcher(
      extendedUserSlice.endpoints.login.matchFulfilled,
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
      extendedUserSlice.endpoints.addWishListItem.matchFulfilled,
      (state, { payload }) => {
        state.key = payload
      }
    )
      
  },
})


export const selectCurrentUser = (state: RootState) => state.user.key
export default userSlice.reducer