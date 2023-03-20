import React from 'react'
import styled from 'styled-components'
import Empty from './Empty'
import MyAccountLayout from '../../components/Layout'
import { useAppSelector } from 'lib/hooks/hooks'
import { selectCart } from 'lib/userSlice'
import ClothesCardCart from '@/components/ClothesCardCart'
import useAddClothingItem from 'lib/hooks/useAddClothingItem'




export default function Cart() {

  const cart = useAppSelector(selectCart)  
  const handleAddItem = useAddClothingItem()

  function deleteClothingItem(_id: string) {
    handleAddItem(_id, 'cart', '', '-')
  }
  

  const countObjectInstances = (cart: any) => {
    return cart.reduce((acc: any, obj: any) => {
      const key = JSON.stringify(obj)
      acc[key] = (acc[key] || 0) + 1
      return acc
    }, {})
  }
  const result = Object.keys(countObjectInstances(cart)).map((key) => {
    const obj = JSON.parse(key)
    return { ...obj, count: countObjectInstances(cart)[key] }
  })


  function handleAddClotheItemToCart(_id: string, size: string) {
    handleAddItem(_id, 'cart', size , '+')
  }

  function handleCheckout() {
    alert('Sorry, this is a demo site. No real checkout is available.')
  }

  function findTotalPrice() {
    let total = 0
    cart.forEach((item: any) => {
      total += Number(item.price.replaceAll('$', ''))
    })
    return total
  }
  
  const EmptyWishList = {
    title: `You currently have no Cart items.`,
    body: `Best get shopping`,
    button: `Start Shopping`
  }


  let content 
  if (cart.length > 0) {
    content = 
      <WishContainer>
        <div>
          {result.map((item: any, index: number) => {
            return <ClothesCardCart
              info={item}
              key={index}
              deleteClothingItem={deleteClothingItem} 
              handleAddClotheItemToCart={handleAddClotheItemToCart}
            />
            })}
        </div>
        <Total>Total:  ${findTotalPrice()} </Total>
        <Checkout onClick={handleCheckout}>CHECKOUT</Checkout>  
      </WishContainer>
      
  } else {
    content =
      <Container>
        <First><h2>SHOPPING CART</h2></First>
        <Empty info={EmptyWishList} />
      </Container>
  }

  return (<>
    <MyAccountLayout>
      {content}      
    </MyAccountLayout>
    </>)
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
`
const First = styled.div`
  width: 100%;
  height: 142px;
  background-color:white;
  display: flex;
  align-items: center;
  padding: 20px;
  margin-bottom: 20px;
`
const WishContainer = styled.div`
  max-width: 1300px;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction :column;
  justify-content: center;
  align-items: center;

  & > div {
    width: 100%;
    height: auto;
    
    display: flex;
    flex-direction: column;
    justify-content: center;

    padding: 20px;
    margin: 0 ;
    gap: 20px;
  }
`
const Total = styled.span`
  width: 100%;
  height: 40px;
  font-size: ${({ theme }) => theme.fontML};
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0;
  border-top: 1px solid ${({ theme }) => theme.lightGrey};
  border-bottom: 1px solid ${({ theme }) => theme.lightGrey};
`

const Checkout = styled.button`
  width: 300px;
  height: 70px;
  font-size: ${({theme }) => theme.fontL};
  cursor: pointer;
  margin-top: 20px;
`