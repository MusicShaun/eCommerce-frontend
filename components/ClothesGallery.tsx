import styled from "styled-components"
import ClothesCard from "./ClothesCard"
import { ClotheType } from "lib/clothesSlice"

import useAddClothingItem  from "lib/hooks/useAddClothingItem"
interface IProps { 
  info: ClotheType[]
}

export default function ClothesGallery({ info }: IProps) {

  const {handleAddItem} = useAddClothingItem()

  function handleAddClotheItemToWishList(_id: string) {
    handleAddItem(_id, 'wishlist')
  }


  let content
  if (info) {
    content =
      <Box >
        {
          info.map((item: any, index: number) =>
            <ClothesCard
              info={item} key={index} 
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
`
const Container = styled.div`
  position: relative;
  max-width: 1300px;
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Box = styled.div`
  position: relative;
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
