import { Profile } from "lib/authSlice";
import { ClotheType } from "lib/clothesSlice";


export function handleGuestWishlist(_id: string, user: Partial<Profile>, allClothes: ClotheType[]) {

  console.log(`THIS IS THE GUEST WISHLIST`)
  const createWishlistArray = 
    (obj: any, user: any) => {
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
      ...tempValue,
        wishlist: tempValue.flat(),
  }

}