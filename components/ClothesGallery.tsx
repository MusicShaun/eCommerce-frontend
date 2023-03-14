import styled from "styled-components"
import ClothesCard from "./ClothesCard"
import { useState, useEffect } from 'react'
import { ClotheType } from "lib/clothesSlice"
import { useAppSelector } from "lib/hooks/hooks"
import { selectCurrentUser, useAddWishListItemMutation } from "lib/userSlice"
import { useHandleWishlistProcessing } from "lib/hooks/useHandleWishlistProcessing"

interface IProps { 
  info: ClotheType[]
}

export default function ClothesGallery({ info }: IProps) {

  const [theWidth, setTheWidth] = useState<number>(33)
  const [addWistListItem, { isLoading, isSuccess, data, isError, error }] = useAddWishListItemMutation()
  const currentUser = useAppSelector(selectCurrentUser)
  const handleWishlistProcessing = useHandleWishlistProcessing()

  useEffect(() => {
    localStorage.setItem('key', JSON.stringify(currentUser))
  }, [currentUser])


  async function handleAddClotheItemToWishList(_id: string) {
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

  let content
  if (info) {
    content =
      <Box >
        {
          info.map((item: any, index: number) =>
            <ClothesCard
              info={item} key={index} containerWidth={theWidth}
              handleAddClotheItemToWishList={handleAddClotheItemToWishList}
            />)
        }
      </Box>
  } else if (!info) {
    content = null
  }

  return (
   
    <Wrapper>
      <Container>
        {content}
      </Container>
      </Wrapper>

  )
}

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Container = styled.div`
  max-width: 1300px;
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Box = styled.div`
  width: 100%;
  height: auto;
  
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 290px));
  grid-template-rows: auto;
  justify-content: center;

  padding: 20px;
  margin: auto 0px;
  gap: 20px;
`
