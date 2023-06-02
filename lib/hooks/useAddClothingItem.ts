import {  selectUser, useAddWishListItemMutation, useGetUserQuery, useGuestMutation } from "@/lib/slices/userSlice"
import { useRef } from "react"
import { handleCart } from "./handleCart"
import { useAppSelector } from "./hooks"
import { LocalUser } from "@/lib/slices/authSlice"
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

  
  const [addWistListItem, {isLoading: isWishLoading, isSuccess: isWishSuccess, isError: isWishError, error: wishError }] = useAddWishListItemMutation()
  const [guest] = useGuestMutation()

  const {} = useGetUserQuery(userEmail) //* THIS IS HERE TO REFRESH STALE DATA

  async function handleAddItem(_id: string, type: string, size?: string, direction?: string) {

    if (type === 'cart' && selectOptionsRef.current?.value === 'Choose size') {
      return alert('Please choose a size')
    }

    const tempUser: Partial<LocalUser> = {
      given_name: '',
      surname: '',
      gender: '',
      wishlist: [],
      cart: [],
    }


    const USER_LOGGED_IN_CART = currentUser && type === 'cart'
    const USER_LOGGED_IN_WISHLIST = currentUser && type === 'wishlist'
    const USER_NOT_LOGGED_IN_CART = !currentUser && type === 'cart'
    const USER_NOT_LOGGED_IN_WISHLIST = !currentUser && type === 'wishlist'

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
        const s = handleCartGuest(_id, tempUser, size!, allClothes)
        await guest({ ...s }).unwrap()

      } else if (USER_NOT_LOGGED_IN_WISHLIST) {
        const s = handleGuestWishlist(_id, tempUser, allClothes)
        await guest({ ...s }).unwrap()
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