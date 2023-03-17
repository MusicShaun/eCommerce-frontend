import { useCallback } from "react";
import { ClotheType } from "lib/clothesSlice";
import { selectAllClothes } from "lib/clothesSlice";
import { selectCurrentUser } from "lib/userSlice";
import { useAppSelector } from "./hooks";
import { LocalUser } from "lib/authSlice";

type ProcessCartFunction = (_id: string, user: LocalUser, size: string) => LocalUser

export const useUpdateGuestProcessing = (): ProcessCartFunction => {
  const allClothes = useAppSelector(selectAllClothes);
  


  const createCartArray = 
    (obj: any, user: LocalUser) => {
      let t
      t = [...(user!.profile.cart || [])]
      t.push(obj)
      return t.flat()
    }

 
  const filterArray = (arr: ClotheType[], _id: string, direction: string, size: string) => {
    const [newItem]: any = arr.filter((item) =>
      direction === "+" ? item._id === _id : item._id !== _id
    )
    const newItemCopy = Object.assign({}, newItem)
    if (newItemCopy && newItemCopy !== undefined) {
      newItemCopy.sizes = size;
      delete newItemCopy.price; 
      delete newItemCopy.image; 
      delete newItemCopy.item
      delete newItemCopy.__v
      return newItemCopy;
    }
  }


  function handleUpdateGuestProcessing(_id: string, user: LocalUser, size: string): LocalUser {
    let tempValue: any[] = []
    if (user && (user as { accessToken: string }).accessToken) {
        
      const getclothingItemToPush = filterArray(allClothes, _id, "+", size)
      tempValue = createCartArray(getclothingItemToPush, user)
      
      return {
          ...user!,
          profile: {
            ...(user!.profile || {}),
            cart: tempValue.flat(),
        },
      }
    }
    return user
  }
  return handleUpdateGuestProcessing
}