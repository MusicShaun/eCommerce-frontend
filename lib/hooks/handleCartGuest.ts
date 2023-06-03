import { ClotheType } from "@/lib/slices/clothesSlice";

export function handleCartGuest(_id: string, size: string, allClothes: ClotheType[]) {

    
  const filterArray = (arr: ClotheType[], _id: string, direction: string, size: string) => {
    const [newItem]: any = arr.filter((item) =>
      direction === "+" ? item._id === _id : item._id !== _id
    )

    if (newItem && newItem !== undefined) {
      newItem.sizes = size;
      delete newItem.item
      delete newItem.__v
      return newItem;
    }
  }

  const getclothingItemToPush = filterArray(allClothes, _id, "+", size)
  
  return {
        cart: [getclothingItemToPush]
  }

}