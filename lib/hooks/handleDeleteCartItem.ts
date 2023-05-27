import { ClotheType } from "@/lib/slices/clothesSlice";



export function handleDeleteCartItem(_id: string, currentUser: any, allClothes: ClotheType[]) {

  const createWishlistArray = 
    (obj: ClotheType): ClotheType[] => {
      let t
      t = [...(currentUser!.wishlist || [])]
      t.push(obj)
      return t.flat()
    }

 
  const filterArray = (arr: ClotheType[], _id: string, direction: string): ClotheType[] => {
      return arr.filter((item) =>
        direction === "+" ? item._id === _id : item._id !== _id
      )
    }


    let tempValue: any[] = []
    // DOES ITEM EXIST ALREADY IN WISHLIST?
    let check =
      currentUser?.wishlist &&
      currentUser.wishlist.some((item: ClotheType) => item._id === _id)

    if (!check) {
      // IF NOT, ADD ITEM TO WISHLIST
      const [getclothingItemToPush] = filterArray(allClothes, _id, "+")
      tempValue = createWishlistArray(getclothingItemToPush)
      
    } else {
      // IF YES, REMOVE ITEM FROM WISHLIST
      tempValue = filterArray(currentUser!.wishlist, _id, "-")
    }
    
    return {
        ...currentUser!,
          wishlist: tempValue.flat(),
    }
}