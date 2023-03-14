import { useCallback } from "react";
import { ClotheType } from "lib/clothesSlice";
import { selectAllClothes } from "lib/clothesSlice";
import { selectCurrentUser } from "lib/userSlice";
import { useAppSelector } from "./hooks";
import { LocalUser } from "lib/authSlice";

type ProcessWishlistFunction = (_id: string) => LocalUser

export const useHandleWishlistProcessing = (): ProcessWishlistFunction => {
  const currentUser = useAppSelector(selectCurrentUser);
  const allClothes = useAppSelector(selectAllClothes);

  const createWishlistArray = 
    (obj: ClotheType): ClotheType[] => {
      let t
      t = [...(currentUser!.profile.wishlist || [])]
      t.push(obj)
      return t.flat()
    }

 
  const filterArray = (arr: ClotheType[], _id: string, direction: string): ClotheType[] => {
      return arr.filter((item) =>
        direction === "+" ? item._id === _id : item._id !== _id
      )
    }


  function handleWishlistProcessing(_id: string): LocalUser {
      let tempValue: any[] = []
      // DOES ITEM EXIST ALREADY IN WISHLIST?
      let check =
        currentUser?.profile.wishlist &&
        currentUser.profile.wishlist.some((item) => item._id === _id)

      if (!check) {
        // IF NOT, ADD ITEM TO WISHLIST
        const [getclothingItemToPush] = filterArray(allClothes, _id, "+")
        console.log(getclothingItemToPush)
        tempValue = createWishlistArray(getclothingItemToPush)
        
      } else {
        // IF YES, REMOVE ITEM FROM WISHLIST
        tempValue = filterArray(currentUser!.profile.wishlist, _id, "-")
      }
      
      return {
          ...currentUser!,
          profile: {
            ...(currentUser!.profile || {}),
            wishlist: tempValue.flat(),
        },
      }
    }


    return handleWishlistProcessing

}