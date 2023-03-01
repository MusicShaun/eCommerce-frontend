import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "lib/apiSlice";
import { RootState } from "./store";

export type ClotheType = {
  name: string
  heading: string
  price: string
  sizes: string[]
  brand: string
  color: string
  id: string
  image: string
}
export type Clothes = {
  data: {
    shirts: ClotheType,
    shorts: ClotheType,
    shoes: ClotheType,
  }
  result?: number
  status?: string
  |
  typeof initialState
}

const clothesAdapter = createEntityAdapter({}) //can do some functionality here if wanted

const initialState = clothesAdapter.getInitialState()

export const extendedClothesSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({

    getAllClothes: builder.query<Clothes, void>({
      query: () => '/getallclothes',

      providesTags: ['Clothes']
    }),


  })
})



export const {
  useGetAllClothesQuery,
  
} = extendedClothesSlice


// returns the query result object
export const selectClothesResult = extendedClothesSlice.endpoints.getAllClothes.select()



// creates memoized selector 
export const selectClothesData = createSelector(
  selectClothesResult, //this is the input
  clothesResult => clothesResult.data // outputs normalezd state object with ids and entities 
)



  
export const localizedClothesSelectors = clothesAdapter.getSelectors()




