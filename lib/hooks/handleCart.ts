import { ClotheType } from "lib/clothesSlice";
import utilities from "../services/utilities";

export function handleCart( _id: string, size: string, currentUser: any, allClothes: ClotheType[], direction: string) {

  let tempObj = utilities.filterProductFromCart({
    arr: allClothes,
    _id,
    size
  })

  let tempValue =
    direction === '+' // ADDING TO CART OR REMOVING FROM CART
      ?
      utilities.recreateCartArray({
        obj: tempObj,
        user: currentUser,
      })
      :
      utilities.filterProductFromArray({
        user: currentUser.cart,
        _id
      })

  return {
    ...currentUser!,
    cart: tempValue.flat(),
  }
}

