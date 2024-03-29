import styled from "styled-components"
import ClothesCard from "./ClothesCard"
import { ClotheType } from "@/lib/slices/clothesSlice"
import ModalError from "../modalsAndErrors/ModalErrorWindow"
import useAddClothingItem  from "lib/hooks/useAddClothingItem"
import { useEffect, useState } from "react"
import router from "next/router"
interface IProps { 
  info: ClotheType[]
}


export default function ClothesGallery({ info }: IProps) {

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const { handleAddItem, isError, error, isWishLoading } = useAddClothingItem()

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
    if (isWishLoading) return
    await handleAddItem(_id, 'wishlist')
  }

  function handleRequestClose() {
    setIsModalOpen(false)
    router.push('/login')
  }

  let content
  // check if infos not an array of null 
  if (info && info.length > 0 && info[0] != null) {
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
  color: ${({ theme }) => theme.text};
  margin-bottom: 4rem;

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
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  justify-items: center;
  padding: 20px;
  margin: auto 0px;
  gap: 6px;

  @media ${({ theme }) => theme.laptop} {
    grid-template-columns: repeat(auto-fit, minmax(min(290px, 350px), 1fr));
    grid-template-rows: minmax(min(290px, 80vw), 1fr);
  }
  @media ${({ theme }) => theme.mobileL} {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: minmax(min(290px, 80vw), 1fr);
    grid-auto-flow: dense;
    gap: 10px;
  }

`
