import { ClotheType } from "@/lib/slices/clothesSlice";


export function handleGuestWishlist(_id: string, allClothes: ClotheType[]) {


 
  const filterArray = (arr: ClotheType[], _id: string, direction: string) => {
    const [newItem]: any = arr.filter((item) =>
      direction === "+" ? item._id === _id : item._id !== _id
    )
    
    return newItem
  }

  const getclothingItemToPush = filterArray(allClothes, _id, "+")
  
  return {
        wishlist: [getclothingItemToPush]
  }

}