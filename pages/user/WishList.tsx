import React from 'react'
import styled from 'styled-components'
import Empty from './Empty'
import MyAccountLayout from '../../components/Layout'
import { useAppDispatch, useAppSelector } from 'lib/hooks/hooks'
import ClothesCard from '@/components/ClothesCard'
import { ClotheType } from 'lib/clothesSlice'
import { selectWishlist, useAddWishListItemMutation } from 'lib/userSlice'
import { useHandleWishlistProcessing } from 'lib/hooks/useHandleCartProcessing'




export default function WishList() {

  const wishlist = useAppSelector(selectWishlist)  
  const [addWistListItem, { isLoading, isSuccess, data, isError, error }] = useAddWishListItemMutation()
  const handleWishlistProcessing = useHandleWishlistProcessing()

  async function handleRemoveItemFromWishList(_id: string) {
    const spreadWishList = handleWishlistProcessing(_id)
    try {
      const res = await addWistListItem({
        ...spreadWishList,
      }).unwrap()
      localStorage.setItem('key', JSON.stringify(res))
    } catch (err) {
      console.log(err)
    }
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