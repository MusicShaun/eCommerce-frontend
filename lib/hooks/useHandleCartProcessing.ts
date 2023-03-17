import { useCallback } from "react";
import { ClotheType } from "lib/clothesSlice";
import { selectAllClothes } from "lib/clothesSlice";
import { selectCurrentUser } from "lib/userSlice";
import { useAppSelector } from "./hooks";
import { LocalUser } from "lib/authSlice";

type ProcessCartFunction = (_id: string, size: string) => LocalUser

export const useHandleCartProcessing = (): ProcessCartFunction => {
  const currentUser = useAppSelector(selectCurrentUser);
  const allClothes = useAppSelector(selectAllClothes);

  const createCartArray = 
    (obj: any) => {
      let t
      t = [...(currentUser!.profile.cart || [])]
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


  function handleCartProcessing(_id: string, size: string): LocalUser {
    let tempValue: any[] = []
      
    const getclothingItemToPush = filterArray(allClothes, _id, "+", size)
    tempValue = createCartArray(getclothingItemToPush)
    
    return {
        ...currentUser!,
        profile: {
          ...(currentUser!.profile || {}),
          cart: tempValue.flat(),
      },
    }
  }
  return handleCartProcessing
}