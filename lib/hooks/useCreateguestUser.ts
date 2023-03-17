import { useCallback } from "react";
import { ClotheType } from "lib/clothesSlice";
import { selectAllClothes } from "lib/clothesSlice";
import { selectCurrentUser } from "lib/userSlice";
import { useAppSelector } from "./hooks";
import { LocalUser } from "lib/authSlice";

type ProcessGuestFunction = (_id: string, user: any, size: string) => LocalUser

export const useHandleGuestProcessing = (): ProcessGuestFunction => {
  const allClothes = useAppSelector(selectAllClothes);

  const createCartArray = 
    (obj: any, user: any) => {
      let t
      t = [...(user.cart || [])]
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


  function handleGuestProcessing(_id: string, user: any, size: string): any {
    let tempValue: any[] = []
      
    const getclothingItemToPush = filterArray(allClothes, _id, "+", size)
    tempValue = createCartArray(getclothingItemToPush, user)
    
    return {
        ...tempValue,
          cart: tempValue.flat(),
    }
  }
  return handleGuestProcessing
}