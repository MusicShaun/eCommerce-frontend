import { ClotheType } from "lib/clothesSlice";
import utilities from "../services/utilities";

export function handleCart( _id: string, size: string, currentUser: any, allClothes: ClotheType[], direction: string) {

  let tempValue =
    direction === '+'
      ?
      utilities.recreateCartArray({
        obj: utilities.filterProductFromCart({ // this isnt a good way to do things. Separate it 
          arr: allClothes,
          _id,
          size
        }),
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



// const createCartArray = 
// (obj: any) => {
//   let t
//   t = [...(currentUser!.cart || [])]
//   t.push(obj)
//   return t.flat()
// }

// const filterArray = (arr: ClotheType[], _id: string, size: string) => {
//   const [newItem]: any = arr.filter((item) => item._id === _id)
//   const newItemCopy = Object.assign({}, newItem)

//   if (newItemCopy && newItemCopy !== undefined) {
//     newItemCopy.sizes = size;
//     delete newItemCopy.item
//     delete newItemCopy.__v
//     return newItemCopy;
//   }
// }