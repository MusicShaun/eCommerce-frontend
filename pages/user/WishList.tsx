import React from 'react'
import styled from 'styled-components'
import Empty from '../../components/EmptyTab'
import EmptyMobile from '../../components/EmptyTabMobile'
import MyAccountLayout from '../../components/layouts/AccountLayout'
import { useAppSelector } from 'lib/hooks/hooks'
import ClothesCard from '@/components/clothes/ClothesCard'
import useAddClothingItem from 'lib/hooks/useAddClothingItem'
import Head from 'next/head'
import { RootState, } from '@/lib/store'
import { selectUser } from '@/lib/slices/userSlice'
import CartWishLayout from '@/components/layouts/CartWishLayout'
import ClothesGallery from '@/components/clothes/ClothesGallery'

export default function WishList() {

  const userEmail = useAppSelector(state => state.auth.email)
  const currentUser =  useAppSelector((state: RootState) => selectUser(state, userEmail))
  const wishlist = currentUser?.wishlist || []
  const { handleAddItem } = useAddClothingItem()
  

  async function handleRemoveItemFromWishList(_id: string) {
    await handleAddItem(_id, 'wishlist')
  }
  
  const EmptyWishList = {
    title: `You have no wish items.`,
    body: `Sign in to see your saved items`,
    button:`SIGN IN `
  }


  let DESKTOP_CONTENT 
  if (wishlist != false && wishlist != undefined && wishlist.length > 0 && wishlist[0].hasOwnProperty('_id') ) {
    DESKTOP_CONTENT = 
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
    DESKTOP_CONTENT =
      <Container>
        <First><h2>WISH LIST</h2></First>
        <Empty info={EmptyWishList}  />
      </Container>
  }

  let MOBILE_CONTENT 
  if (wishlist.length > 0) {
    MOBILE_CONTENT =
      <CartWishLayout title='Wish list'>
        <ClothesGallery info={wishlist} />
      </CartWishLayout>
  } else {
    MOBILE_CONTENT = <EmptyMobile info={EmptyWishList} />
  }

  return (<>
    <Head>
      <title> Wishlist | Shauny's Shop </title>
    </Head>


    <MyAccountLayout>
    <TitleBanner>Wishlist</TitleBanner>

      {DESKTOP_CONTENT}

            {/* DESKTOP ^ OR MOBILE */}

      {MOBILE_CONTENT}
    </MyAccountLayout>


    </>)
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  padding-bottom: 20px;

  @media ${({ theme }) => theme.mobileL} {
    display: none;
  }
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
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));

    padding: 10px;
    margin: auto 0px;
    gap: 6px;
  }
  @media ${({ theme }) => theme.mobileL} {
    display: none;
  }
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