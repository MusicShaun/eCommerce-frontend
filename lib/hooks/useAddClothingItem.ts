import { selectCurrentUser, useAddCartItemMutation, useAddWishListItemMutation, useGuestMutation } from "lib/userSlice"
import { useRef } from "react"
import { handleCart } from "./handleCart"
import { useAppSelector } from "./hooks"
import { LocalUser } from "lib/authSlice"
import { selectAllClothes } from "lib/clothesSlice"
import { handleWishlist } from "./handleWishlist"
import { handleCartGuest } from "./handleCartGuest"
import { handleGuestWishlist } from "./handleGuestWishlist"

export default function useAddClothingItem() {
  const selectOptionsRef = useRef<HTMLSelectElement>(null)
  const currentUser = useAppSelector(selectCurrentUser)
  const allClothes = useAppSelector(selectAllClothes)

  const [addWistListItem, {isLoading: isWishLoading, isSuccess: isWishSuccess, isError: isWishError, error: wishError }] = useAddWishListItemMutation()
  const [addCartListItem, {isLoading: isCartLoading, isSuccess: isCartSuccess, isError: isCartError, error: cartError }] = useAddCartItemMutation()
  const [guest] = useGuestMutation()

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

    // EACH IF USES A HOOK TO SPREAD THE ITEM INTO THE WISHLIST OR CART
    // THE NEW ARRAY IS THEN SENT TO THE BACKEND TO BE UPDATED
    // THERE ARE 4 POSSIBLE PLACES THE DATA WILL BE SENT TO 
    try {
      //* USER LOGGED IN - TYPE CART 
      if (currentUser && currentUser && type === 'cart') {
        const s = handleCart(_id, size!, currentUser, allClothes, direction!)
        await addCartListItem({ ...s }).unwrap()

      //* USER LOGGED IN - TYPE WISHLIST
      } else if (currentUser && currentUser && type === 'wishlist') {
        const s = handleWishlist(_id, currentUser, allClothes)
        await addWistListItem({ ...s }).unwrap()

      // //* USER NOT LOGGED IN - TYPE CART
      } else if (!currentUser && type === 'cart') {
        const s = handleCartGuest(_id, tempUser, size!, allClothes)
        await guest({ ...s }).unwrap()

      // //* USER NOT LOGGED IN - TYPE WISHLIST
      } else {
        const s = handleGuestWishlist(_id, tempUser, allClothes)
        await guest({ ...s }).unwrap()
      }
    

    } catch (err) {
        console.log(err)
      }
    }
  
  return {
    handleAddItem, isCartLoading, isWishLoading, isCartSuccess, isWishSuccess,
    error: cartError || wishError,
    isError: isCartError || isWishError,
  }
}