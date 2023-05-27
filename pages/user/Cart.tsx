import React from 'react'
import styled from 'styled-components'
import Empty from '../../components/EmptyTab'
import MyAccountLayout from '../../components/layouts/AccountLayout'
import { useAppSelector } from 'lib/hooks/hooks'
import ClothesCardCart from '@/components/clothes/ClothesCardCart'
import useAddClothingItem from 'lib/hooks/useAddClothingItem'
import PacmanLoader from 'react-spinners/PacmanLoader'
import Head from 'next/head'
import { RootState } from '@/lib/store'
import { selectUser } from '@/lib/slices/userSlice'



export default function Cart() {

  const userEmail = useAppSelector(state => state.auth.email)
  const currentUser =  useAppSelector((state: RootState) => selectUser(state, userEmail))
    const cart = currentUser?.cart || []
  const {handleAddItem, isCartLoading} = useAddClothingItem()

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

  const cssLoaderSpecs = {
    display: 'flex',
    zIndex: 9000,
    width: '400px',
    left: '50%',
    transform: 'translate(-30%, -50%)',
    top: '50%',
  }

  let content 
  if (cart.length > 0) {
    content = 
      <WishContainer>

        <div style={{position: 'relative'}}>
          {result.map((item: any, index: number) => {
            return <ClothesCardCart
              info={item}
              key={index}
              deleteClothingItem={deleteClothingItem} 
              handleAddClotheItemToCart={handleAddClotheItemToCart}
            />
          })}
          
          <SpinnerContainer style={{display: isCartLoading ? 'flex' : 'none'}}>
            <PacmanLoader
              color={'#2d2d2d'}
              size={50}
              loading={isCartLoading}
              cssOverride={cssLoaderSpecs}
              speedMultiplier={1.5}
              />
          </SpinnerContainer>

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
    <Head>
      <title>Cart</title>
      </Head>
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

const SpinnerContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9000;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.446);
`
