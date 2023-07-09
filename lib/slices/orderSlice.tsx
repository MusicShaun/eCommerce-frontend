
import { RootState } from "../store"
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"

interface userDetails{
  given_name: string
  surname: string
  email: string
  dob: string
  cognitoId: string
}
interface shippingAddress {
  address: string
  city: string
  postal_code: string
  country: string
}
interface OrderItem {
  _id: string;
  name: string;
  heading: string;
  price: string;
  sizes: string[];
  brand: string;
  color: string;
  image: string;
}


interface OrderPayload {
  userDetails: userDetails
  shippingAddress: shippingAddress
  orderItems?: OrderItem[]
  totalPrice?: number
}

const initialState: OrderPayload = {

    userDetails: {
      given_name: '',
      surname: '',
      email: '',
      dob: '',
      cognitoId: ''
    },
    shippingAddress: {
      address: '',
      city: '',
      postal_code: '',
      country: ''
    },
    orderItems: [],
    
    totalPrice: 0
  
}
const development = process.env.NEXT_PUBLIC_NODE_ENV === 'development'


const ORDER_URL = development
  ? 'http://localhost:5000/api/v1/stripeOrders/'
  : `${process.env.NEXT_PUBLIC_SERVER}api/v1/stripeOrders/` 


// create async thunk middleware 
export const sendOrder = createAsyncThunk(
  'order/setOrder',
  async (payload: OrderPayload) => {
    const res = await fetch(ORDER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })

    const data = await res.json()
    console.log(data)
    return data
  }

)


const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: {
    [sendOrder.fulfilled.type]: (state, action: PayloadAction<OrderPayload>) => {
      state.shippingAddress = action.payload.shippingAddress
      state.orderItems = action.payload.orderItems
      state.totalPrice = action.payload.totalPrice
      state.userDetails = action.payload.userDetails
    },
  },
})



export const selectShippingAddress = (state: RootState) => state.order.shippingAddress
export const selectOrderItems = (state: RootState) => state.order.orderItems
export const selectTotalPrice = (state: RootState) => state.order.totalPrice
export const selectUserDetails = (state: RootState) => state.order.userDetails

export default orderSlice.reducer