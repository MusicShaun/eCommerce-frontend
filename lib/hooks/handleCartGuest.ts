import { LocalUser } from "lib/authSlice";
import { ClotheType } from "lib/clothesSlice";
import services from "../services/utilities";

export function handleCartGuest(_id: string, user: Partial<LocalUser>, size: string, allClothes: ClotheType[]) {

    
  const filterArray = (arr: ClotheType[], _id: string, direction: string, size: string) => {
    const [newItem]: any = arr.filter((item) =>
      direction === "+" ? item._id === _id : item._id !== _id
    )
    const newItemCopy = Object.assign({}, newItem)
    if (newItemCopy && newItemCopy !== undefined) {
      newItemCopy.sizes = size;
      delete newItemCopy.item
      delete newItemCopy.__v
      return newItemCopy;
    }
  }

  let tempValue: any[] = []
    
  const getclothingItemToPush = filterArray(allClothes, _id, "+", size)
  tempValue = services.recreateCartArray({obj: getclothingItemToPush, user})
  
  return {
      // ...tempValue,
        cart: tempValue.flat(),
  }

}