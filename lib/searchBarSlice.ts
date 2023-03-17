import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { ClotheType } from "./clothesSlice"
import { RootState } from "./store"

interface IState {
  search: ClotheType[] | []
}

const initialState: IState = {
  search: []
}

export const searchBarSlice = createSlice({
  name: 'searchBar',
  initialState,
  reducers: {
    updateSearchBar: (state, action: PayloadAction<ClotheType[]>) => {
      state.search = action.payload
    } 
  },
})

export const { updateSearchBar } = searchBarSlice.actions

export const selectSearchBar = (state: RootState) => state.searchBar.search

export default searchBarSlice.reducer