import { ClotheType } from "@/lib/slices/clothesSlice";
import services from "../services/arrayServices";

export function handleCart( _id: string, size: string, currentUser: any, allClothes: ClotheType[], direction: string) {

  let tempObj = services.filterProductFromCart({
    arr: allClothes,
    _id,
    size
  })

  let tempValue =
    direction === '+' // ADDING TO CART OR REMOVING FROM CART
      ?
      services.recreateCartArray({
        obj: tempObj,
        user: currentUser,
      })
      :
      services.filterProductFromArray({
        user: currentUser.cart,
        _id
      })

  return {
    ...currentUser!,
    cart: tempValue.flat(),
  }
}

