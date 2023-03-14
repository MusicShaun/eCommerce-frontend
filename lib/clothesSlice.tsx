import { createSelector, createEntityAdapter, EntityState, CombinedState } from "@reduxjs/toolkit";
import { apiSlice } from "lib/apiSlice";
import { RootState, store } from "./store";
import { useAppSelector } from "./hooks/hooks";

export type ClotheType = {
  name: string
  heading: string
  price: string
  sizes: string[]
  brand: string
  color: string
  _id: string
  image: string
  item: string
}
export type Clothes = {
  data: {
    shirts: ClotheType[],
    shorts: ClotheType[],
    shoes: ClotheType[],
  }
  result?: number
  status?: string
  |
  typeof initialState
}
export interface TransformedClothes {
  shirts: ClotheType[],
  shorts: ClotheType[],
  shoes: ClotheType[],
}

const clothesAdapter = createEntityAdapter({
  selectId: (cloth: ClotheType) => cloth._id 
}) 
const initialState = clothesAdapter.getInitialState()

export const extendedClothesSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({

    getAllClothes: builder.query<TransformedClothes, void>({
      query: () => '/getallclothes',
      structuralSharing: false,
      transformResponse: (rawResult: Clothes, meta): any => {
        const combined = [...rawResult.data.shirts, ...rawResult.data.shorts, ...rawResult.data.shoes]
        return clothesAdapter.setAll(initialState, combined)
      },
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



export const {
  selectAll: selectAllClothes,
  selectById: selectClothesById,
} = clothesAdapter.getSelectors(
// @ts-ignore
(state: any) => selectClothesData(state) ?? initialState)


export const selectShirts = createSelector(
  selectAllClothes,
  (clothes) => clothes.filter((cloth: ClotheType) => cloth.item === 'shirts')
)

export const selectShoes = createSelector(
  selectAllClothes,
  (clothes) => clothes.filter((cloth: ClotheType) => cloth.item === 'shoes')
)

export const selectShorts = createSelector(
  selectAllClothes,
  (clothes) => clothes.filter((cloth: ClotheType) => cloth.item === 'shorts')
)
