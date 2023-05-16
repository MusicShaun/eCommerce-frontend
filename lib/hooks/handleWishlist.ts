import { ClotheType } from "lib/clothesSlice";
import utilities from "../services/utilities";


export function handleWishlist(_id: string, currentUser: any, allClothes: ClotheType[]) {

    let tempValue: any[] = []
    let CHECK_IF_ITEM_IS_IN_WISHLIST = currentUser?.wishlist &&
      currentUser.wishlist.some((item: ClotheType) => item._id === _id)

  
  
  if (!CHECK_IF_ITEM_IS_IN_WISHLIST) {
      // IF NO, CREATE WISHLIST
      const [getclothingItemToPush] = utilities.filterProductFromWishlist({
        arr: allClothes,
        _id,
        direction: "+"
      })
      // CREATE USER OBJECT WITH NEW WISHLIST
      tempValue = utilities.recreateWishlistArray({
        obj: getclothingItemToPush,
        user: currentUser
      })
      
    
    } else {
      // IF YES, REMOVE ITEM FROM WISHLIST
      tempValue = utilities.filterProductFromWishlist({
          arr: currentUser!.wishlist, //! arr  SHOULD HAVE A DEFINING NAME. ADD WISHLIST OR SOMETHING 
          _id,
          direction: "-"
        })
    }
    
    // RETURNS THE TEMPVALUE WHICH IS THE UPDATED WISHLIST 
    // THIS COMPLETES THE USER OBJECT 
    return {
        ...currentUser!,
          wishlist: tempValue.flat(),
      }
}

// HAVENT TESTED CODE ABOVE YET 

  // const createWishlistArray = 
  //   (obj: ClotheType): ClotheType[] => {
  //     let t
  //     t = [...(currentUser!.wishlist || [])]
  //     t.push(obj)
  //     return t.flat()
  //   }

 
  // const filterArray = (arr: ClotheType[], _id: string, direction: string): ClotheType[] => {
  //     return arr.filter((item) =>
  //       direction === "+" ? item._id === _id : item._id !== _id
  //     )
  //   }