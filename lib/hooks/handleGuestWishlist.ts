import { LocalUser } from "@/lib/slices/authSlice";
import { ClotheType } from "@/lib/slices/clothesSlice";


export function handleGuestWishlist(_id: string, user: Partial<LocalUser>, allClothes: ClotheType[]) {

  const createWishlistArray = 
    (obj: ClotheType, user:  Partial<LocalUser>) => {
      let t
      t = [...(user.wishlist || [])]
      t.push(obj)
      return t.flat()
    }

 
  const filterArray = (arr: ClotheType[], _id: string, direction: string) => {
    const [newItem]: any = arr.filter((item) =>
      direction === "+" ? item._id === _id : item._id !== _id
    )
    const newItemCopy = Object.assign({}, newItem)
    return newItemCopy
  }


  let tempValue: any[] = []
    
  const getclothingItemToPush = filterArray(allClothes, _id, "+")
  tempValue = createWishlistArray(getclothingItemToPush, user)
  
  return {
      // ...tempValue,
        wishlist: tempValue.flat(),
  }

}