import { Action, ThunkAction, combineReducers, configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import logger from 'redux-logger'
import userReducer from "./authSlice";
import searchBarReducer from "./searchBarSlice";

const reducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  user: userReducer,
  searchBar: searchBarReducer,
})

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware).concat(
    // logger
  )

})



export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

