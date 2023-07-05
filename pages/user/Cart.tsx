import React from 'react'
import styled from 'styled-components'
import Empty from '../../components/EmptyTab'
import EmptyMobile from '../../components/EmptyTabMobile'
import MyAccountLayout from '../../components/layouts/AccountLayout'
import { useAppSelector } from 'lib/hooks/hooks'
import ClothesCardCart from '@/components/clothes/ClothesCardCart'
import useAddClothingItem from 'lib/hooks/useAddClothingItem'
import Head from 'next/head'
import { RootState } from '@/lib/store'
import { selectUser } from '@/lib/slices/userSlice'
import { EmptyWishList, cartProductListResult, countProductTypeInstances, findTotalPrice } from '@/lib/services/cartServices'
import LoadingSpinner from '@/components/LoadingSpinner'



export default function Cart() {

  const userEmail = useAppSelector(state => state.auth.email)
  const currentUser =  useAppSelector((state: RootState) => selectUser(state, userEmail))
  const cart = currentUser?.cart || []
  const {handleAddItem, isWishLoading} = useAddClothingItem()
  
  function deleteClothingItem(_id: string) {
    handleAddItem(_id, 'cart', '', '-')
  }
  
  // Get the number of instances of each product type in the cart
  const countProductInstances = countProductTypeInstances(cart)
  // Convert the object to an array of product objects 
  const result = cartProductListResult(countProductInstances)

  function handleAddClotheItemToCart(_id: string, size: string) {
    handleAddItem(_id, 'cart', size , '+')
  }

  function handleCheckout() {
    alert('Sorry, this is a demo site. No real checkout is available.')
  }



  let DESKTOP_CONTENT 
  if (cart.length > 0) {
    DESKTOP_CONTENT = 
      <WishContainer>
        <div style={{position: 'relative'}}>
          {result.map((item: any, index: number) => { return (
            <ClothesCardCart
              info={item}
              key={index}
              deleteClothingItem={deleteClothingItem} 
              handleAddClotheItemToCart={handleAddClotheItemToCart}
            />)
          })}
          <LoadingSpinner isWishLoading={isWishLoading} />
        </div>
        <Total>Total:  ${findTotalPrice(cart)} </Total>
        <Checkout onClick={handleCheckout}>CHECKOUT</Checkout>  
      </WishContainer>
      
  }  else {
    DESKTOP_CONTENT =
      <Container>
        <First><h2>CART</h2></First>
        <Empty info={EmptyWishList} />
        <EmptyMobile info={EmptyWishList} />
      </Container>
  }



  return (<>
    <Head>
      <title>Shopping Cart | Shauny's Shop </title>
    </Head>
      
    <MyAccountLayout>
    <TitleBanner>Cart</TitleBanner>

      {DESKTOP_CONTENT}      
    </MyAccountLayout>

  </>)
}

const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100%;
  height: auto;
  padding-bottom: 20px;
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
  width: calc(100% - 2.5rem);
  height: auto;
  display: flex;
  flex-direction :column;
  justify-content: flex-start;
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
  padding-right: 30px;
`

const Checkout = styled.button`
  width: 300px;
  height: 70px;
  font-size: ${({theme }) => theme.fontL};
  cursor: pointer;
  margin-top: 20px;
`

const TitleBanner = styled.h1`
  display: none; 
  @media ${({ theme }) => theme.mobileL} {
    height: 90px; 
    width: 100%;
    background-color: ${({ theme }) => theme.backgroundSecondary };
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    font-weight: 600;
  }
`
