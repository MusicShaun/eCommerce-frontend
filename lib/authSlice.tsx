import { createSlice } from "@reduxjs/toolkit";
import { RootState, store } from "./store";
import { ClotheType } from "./clothesSlice";
import { extendedUserSlice } from "./userSlice";


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

//* IVE OPTED TO NOT RECEIVE THE USERS INFO FROM THE SERVER
//* IT SEEMS A WASTE TO HAVE IT SENT BACK AND CHECKED
//* INSTEAD ILL KEEP SERVER AND CLIENT STORAGE SEPARATE YET IN SYNC 
// const userSlice = createSlice({
  // name: 'user',
  // initialState,
  // reducers: {} ,
  // extraReducers: builder => {

    //? THIS IS THE ONLY ONE I WANT TO SUBSCRIBE TO AS ITS THE USER DATA. ONE POINT OF ORIGIN
    // builder.addMatcher( 
    //   extendedUserSlice.endpoints.getUser.matchFulfilled,
    //   (state, { payload }) => {
    //     state.key = payload
    //   }
    // ),
    //   builder.addMatcher(
    //     extendedUserSlice.endpoints.logout.matchFulfilled,
    //     (state) => {
    //       state.key = null
    //     }
    // )
  // },
// })


// export const selectCurrentUser = (state: RootState) => state.user.key
// export default userSlice.reducer