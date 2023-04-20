import { ClotheType } from "lib/clothesSlice";


export function handleCart( _id: string, size: string, currentUser: any, allClothes: ClotheType[], direction: string) {

  const createCartArray = 
    (obj: any) => {
      let t
      t = [...(currentUser!.cart || [])]
      t.push(obj)
      return t.flat()
    }
 
  const filterArray = (arr: ClotheType[], _id: string, size: string) => {
    const [newItem]: any = arr.filter((item) => item._id === _id)
    const newItemCopy = Object.assign({}, newItem)

    if (newItemCopy && newItemCopy !== undefined) {
      newItemCopy.sizes = size;
      delete newItemCopy.item
      delete newItemCopy.__v
      return newItemCopy;
    }
  }
    
  const filterOutArray = (user: ClotheType[], _id: string) => {
    let arr = [...user]
    const index = arr.findIndex((item) => item._id === _id)
    arr.splice(index, 1)
    return arr
  }

  let tempValue = direction === '+'
    ? createCartArray(filterArray(allClothes, _id, size))
    : filterOutArray(currentUser.cart, _id)

  return {
    ...currentUser!,
    cart: tempValue.flat(),
  }
}