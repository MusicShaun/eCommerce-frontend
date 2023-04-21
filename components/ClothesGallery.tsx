import styled from "styled-components"
import ClothesCard from "./ClothesCard"
import { ClotheType } from "lib/clothesSlice"
import ModalError from "./ModalErrorWindow"
import useAddClothingItem  from "lib/hooks/useAddClothingItem"
import { useEffect, useState } from "react"
import router from "next/router"
interface IProps { 
  info: ClotheType[]
}

export default function ClothesGallery({ info }: IProps) {

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const { handleAddItem, isError , error } = useAddClothingItem()
  
  // error handling
  useEffect(() => {
    if (isError && error) {
      setIsModalOpen(true)
      if ('data' in error) {
        const fetchError = error as any
        setErrorMessage(fetchError.data.message ?? 'Unknown error')
      }
    }
  }, [isError, error])

  async function handleAddClotheItemToWishList(_id: string) {
    await handleAddItem(_id, 'wishlist')
  }

  function handleRequestClose() {
    setIsModalOpen(false)
    router.push('/login')
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

  return (<>
    <ModalError isOpen={isModalOpen} onRequestClose={() => handleRequestClose()} errorMessage={errorMessage}  />

      <Wrapper>
        <Container>
          {content}
        </Container>
      </Wrapper>
    </>
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
