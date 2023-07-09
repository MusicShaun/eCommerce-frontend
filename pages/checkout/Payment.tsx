import StripeButton from "@/components/buttons/StripeButton"
import { useAppSelector } from "@/lib/hooks/hooks"
import { selectOrderItems, selectShippingAddress, selectTotalPrice, selectUserDetails } from "@/lib/slices/orderSlice"
import styled from "styled-components"
import Image from "next/image"
import { addFirstElementToArray, addItemToCount, pushItemIfNotInArray } from "@/lib/services/arrayServices"
import { useEffect, useState } from "react"


export default function Payment() {

  const shippingAddress = useAppSelector(selectShippingAddress)
  const totalPrice = useAppSelector(selectTotalPrice)
  const cartItems = useAppSelector(selectOrderItems)
  const userDetails = useAppSelector(selectUserDetails)
  
  const textBoxUserTitles = ['Given Name', 'Surname', 'Email']
  const textBoxDeliveryTitles = ['Address', 'City', 'Postal Code', 'Country']

  // adds "count" property to each item 
  // cycles through the cart items and either adds a new item to an array or adds to the count of an existing item
  // the total price is sent from the server, not here in the app 
  const orderItemArray = (cartItems: any) => {
    let itemsArray: any = []

    cartItems.forEach((parentFor: any) => {
      const addCountToParent = { ...parentFor, count: 1}

      if (itemsArray.length == 0) { 
        addFirstElementToArray(addCountToParent, itemsArray)
        
      } else {
        addItemToCount(addCountToParent, itemsArray)
        pushItemIfNotInArray(addCountToParent, itemsArray)
      }
    })
    return itemsArray
  }


  // CREATE COMPONENTS BASED ON REDUX DATA 
  let userContent = null
  let deliverycontent = null
  let orderItems = null
  let finalPrice = null

  if (userDetails) {
    userContent = Object.entries(userDetails).map(([key, value], index) => {
      if (index < 3) {
        return (
          <TextBox key={index}>
            <TextBoxTitle>{textBoxUserTitles[index]}</TextBoxTitle>
            <TextBoxValue>{value}</TextBoxValue>
          </TextBox>)
      }
    })
  }

  if (shippingAddress) {
    deliverycontent = Object.entries(shippingAddress).map(([key, value], index) => {
      if (index < 4) {
        return (
          <TextBox key={index}>
            <TextBoxTitle>{textBoxDeliveryTitles[index]}</TextBoxTitle>
            <TextBoxValue>{value}</TextBoxValue>
          </TextBox>)
      }
    })
  }

  if (cartItems) {
    orderItems = <><Title>CART</Title>
    {orderItemArray([...cartItems]).map((item: any, index: number) => {
      return (<>
        <OrderItem key={index}>
          <Image src={item.image} alt='' height={75} width={75} style={{ borderRadius: '5px' }} />
          <OrderItemDetails>
            <OrderItemName>{item.name}</OrderItemName>
            <OrderItemBrand>{item.brand}</OrderItemBrand>
            <OrderItemColor>{item.color}</OrderItemColor>
            <OrderItemSize>{item.sizes[0]}</OrderItemSize>
          </OrderItemDetails>
          <OrderQuantityAndPrice>
            <p>x{item.count}</p>
            <OrderItemPrice>${ item.price }</OrderItemPrice>
          </OrderQuantityAndPrice>
        </OrderItem>
        </>)
    })
      }
    </>
  }

  if (totalPrice) {
    finalPrice = 
      <TotalPrice><div>Total</div><div>${totalPrice}</div></TotalPrice>
  }


  return (
    <Wrapper>
      <Box>
        <Title>REVIEW ORDER</Title>
        {userContent}
        {deliverycontent}
        {orderItems}
        {finalPrice}
      </Box>
      <StripeButton />
    </Wrapper>
  )
}

const Wrapper = styled.section`
  position: relative;
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.backgroundSecondary};
`
const Box = styled.div`
  position: relative;
  width: 500px;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.background};
  border-radius: 10px;;
  padding: 2rem;
`
const Title = styled.h2`
  position: relative;
  margin: 0.5rem;
  font-size: ${({ theme }) => theme.fontXL};
  text-align: center;
  text-decoration: underline;
  text-decoration-thickness: 3px;
  text-underline-offset: 4px;
  text-decoration-color: ${({ theme }) => theme.lightGrey};
`

const TextBox = styled.div`
  position: relative;
  margin: 0.5rem;
  border-bottom: ${({ theme }) => theme.lightGrey} 3px solid;

`
const TextBoxTitle = styled.h3`
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 4px;
  text-decoration-color: ${({ theme }) => theme.lightGrey};
  padding-bottom: 6px;
  font-size: ${({ theme }) => theme.fontL};
`
const TextBoxValue = styled.p`
  font-size: ${({ theme }) => theme.fontML};
  color: ${({ theme }) => theme.mediumGrey};
`

const OrderItem = styled.div`
  display: flex;
  padding-bottom: 1rem;
`

const OrderItemDetails = styled.div`
  padding-left: 1rem;
`
const OrderItemName = styled.h3`

`
const OrderItemBrand = styled.p`

`
const OrderItemColor = styled.p`

`
const OrderItemSize = styled.p`

`
const OrderQuantityAndPrice = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: auto;
`
const OrderItemPrice = styled.p`
  margin-top: auto;
  margin-left: auto;
`
const TotalPrice = styled.div`
  display: flex; 
  margin-top: 1rem;
  padding: 6px 0px;
  font-size: ${({ theme }) => theme.fontXL};
  border-top: ${({ theme }) => theme.lightGrey} 3px solid;
  border-bottom: ${({ theme }) => theme.lightGrey} 3px solid;

& > div:last-child {
  margin-left: auto;
  }
`