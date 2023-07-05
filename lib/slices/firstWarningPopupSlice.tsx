import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store"



export const firstWarning = createSlice({
  name: 'firstWarning',
  initialState: {
    firstWarning: false,
  },
  reducers: {
    setFirstWarning: (state, action) => {
      state.firstWarning = action.payload
    }
  },
})
export const selectFirstWarning = (state: RootState) => state.firstWarning.firstWarning

export const { setFirstWarning } = firstWarning.actions
export default firstWarning.reducer