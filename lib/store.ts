import { Action, ThunkAction, combineReducers, configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice";
import logger from 'redux-logger'
import auth from "./slices/authSlice";
import searchBarReducer from "./slices/searchBarSlice";
import firstWarningReducer from "./slices/firstWarningPopupSlice";

const reducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth,
  searchBar: searchBarReducer,
  firstWarning: firstWarningReducer,
})

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware).concat(
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

