import { ClotheType } from "../slices/clothesSlice"



  // Get the number of instances of each product type in the cart
type CartItem = Partial<ClotheType> & { count: number }

export const countProductTypeInstances = (cartItems: CartItem[]): { [key: string]: number } => {
  return cartItems.reduce(
    (acc: { [key: string]: number }, product: CartItem) => {
      const objIndexer = JSON.stringify(product)
      acc[objIndexer] = (acc[objIndexer] || 0) + 1
      return acc
  }, {})
}

// Convert the object to an array of objects
type Result = { [key: string]: number }

export const cartProductListResult = (instances: Result ): CartItem[] => {
  return Object.keys(instances)
    .map((objIndexer) => {
    const productList = JSON.parse(objIndexer)
    return { ...productList, count: instances[objIndexer] }
  })
}

// Get cart total price 
type CartTotal = string
export const findTotalPrice = (cart: ClotheType[]): CartTotal => {
  let total = 0
  cart.forEach((item: any) => {
    total += Number(item.price.replaceAll('$', ''))
  })
  return total.toString()
}
  //* Result should look like this: 
//   {
//     "_id": "642a850351ff98809b48bd53",
//     "name": "Pluggers",
//     "heading": "Bustin boots",
//     "price": "$129",
//     "sizes": [["10"]],
//     "brand": "James Docs",
//     "color": "green",
//     "image": "https://res.cloudinary.com/dyneqi48f/image/upload/v1677291103/shoe2_akphat.webp",
//     "count": 4
// }






export const EmptyWishList = {
  title: `Your bag is empty.`,
  body: `Sign in to see your bag and get shopping`,
  button: `SIGN IN`
}

export const cssLoaderSpecs = {
  display: 'flex',
  zIndex: 9000,
  width: '400px',
  left: '50%',
  transform: 'translate(-30%, -50%)',
  top: '50%',
}