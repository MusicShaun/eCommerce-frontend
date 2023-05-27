import React, { useEffect } from 'react'
import styled from 'styled-components'
import Empty from '../../components/EmptyTab'
import MyAccountLayout from '../../components/layouts/AccountLayout'
import { useAppSelector } from 'lib/hooks/hooks'
import ClothesCard from '@/components/clothes/ClothesCard'
import useAddClothingItem from 'lib/hooks/useAddClothingItem'
import { useCheckJWTexpiry } from 'lib/hooks/checkJWTexpiry'
import Head from 'next/head'
import { RootState, } from '@/lib/store'
import { extendedUserSlice,  selectUser, useGetUserQuery } from '@/lib/slices/userSlice'

export default function WishList() {

  const userEmail = useAppSelector(state => state.auth.email)
  const currentUser =  useAppSelector((state: RootState) => selectUser(state, userEmail))
  console.log(currentUser)
  const wishlist = currentUser?.wishlist || []
  console.log(wishlist)
  const { handleAddItem } = useAddClothingItem()
  

  async function handleRemoveItemFromWishList(_id: string) {
    await handleAddItem(_id, 'wishlist')
  }
  
  const EmptyWishList = {
    title: `You currently have no Wishlist items.`,
    body: `Best get shopping`,
    button: `Start Shopping`
  }
  let content 

  if (wishlist.length > 0) {
    content = 
      <WishContainer>
        <div>
          {wishlist.map((item: any, index: number) => {
            return <ClothesCard info={item} key={index}
              handleAddClotheItemToWishList={handleRemoveItemFromWishList} 
            />
            })}
        </div>
      </WishContainer>
      
  } else {
    content =
      <Container>
        <First><h2>WISH LIST</h2></First>
        <Empty info={EmptyWishList} />
      </Container>
  }

  return (<>
    <Head>
      <title>Wish list</title>
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
  justify-content: center;
  align-items: center;

  & > div {
    width: 100%;
    height: auto;
    
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 270px));
    grid-template-rows: auto;
    justify-content: center;

    padding: 20px;
    margin: auto 0px;
    gap: 20px;
  }
`