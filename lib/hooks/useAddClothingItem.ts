import {  selectUser, useAddWishListItemMutation, useGuestMutation } from "@/lib/slices/userSlice"
import { useRef } from "react"
import { handleCart } from "./handleCart"
import { useAppDispatch, useAppSelector } from "./hooks"
import { LocalUser, setAuth, setEmailOnLogin } from "@/lib/slices/authSlice"
import { selectAllClothes } from "@/lib/slices/clothesSlice"
import { handleWishlist } from "./handleWishlist"
import { handleCartGuest } from "./handleCartGuest"
import { handleGuestWishlist } from "./handleGuestWishlist"
import { RootState } from "../store"

export default function useAddClothingItem() {
  const selectOptionsRef = useRef<HTMLSelectElement>(null)
  const userEmail = useAppSelector(state => state.auth.email)
  const currentUser =  useAppSelector((state: RootState) => selectUser(state, userEmail))
  const allClothes = useAppSelector(selectAllClothes)
  const dispatch = useAppDispatch()
  
  const [addWistListItem, {isLoading: isWishLoading, isSuccess: isWishSuccess, isError: isWishError, error: wishError }] = useAddWishListItemMutation()
  const [guest] = useGuestMutation()

  async function handleAddItem(_id: string, type: string, size?: string, direction?: string) {

    if (type === 'cart' && selectOptionsRef.current?.value === 'Choose size') {
      return alert('Please choose a size')
    }


    const USER_LOGGED_IN_CART = Object.keys(currentUser).length > 0  && type === 'cart'
    const USER_LOGGED_IN_WISHLIST = Object.keys(currentUser).length > 0 && type === 'wishlist'
    const USER_NOT_LOGGED_IN_CART = type === 'cart'
    const USER_NOT_LOGGED_IN_WISHLIST =  type === 'wishlist'

    //* CHECKS IF CART OR WISHLIST, CHECKS IF LOGGED IN
    //* THE HANDLE CREATES THE OBJECT S
    //* S IS SENT TO THE BACKEND AS A CLOTHETYPE OBJECT
    try {
      if (USER_LOGGED_IN_CART) {
        const s = handleCart(_id, size!, currentUser, allClothes, direction!)
        await addWistListItem({ ...s }).unwrap()

      } else if (USER_LOGGED_IN_WISHLIST) {
        const s = handleWishlist(_id, currentUser, allClothes)
        await addWistListItem({ ...s }).unwrap()

      } else if (USER_NOT_LOGGED_IN_CART) {
        const s = handleCartGuest(_id, size!, allClothes)
        const guestUser = await guest({ ...s }).unwrap()

        dispatch(setEmailOnLogin(guestUser.email))
        dispatch(setAuth(guestUser.accessToken))

      } else if (USER_NOT_LOGGED_IN_WISHLIST) {
        const s = handleGuestWishlist(_id, allClothes)
        const guestUser = await guest({ ...s }).unwrap()

        dispatch(setEmailOnLogin(guestUser.email))
        dispatch(setAuth(guestUser.accessToken))
      }
    

    } catch (err) {
        console.log(err)
    }
    finally {
      
    }
  }
  
  return {
    handleAddItem, isWishLoading, isWishSuccess,
    error: wishError,
    isError:  isWishError,
  }
}