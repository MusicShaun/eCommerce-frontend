import { ClotheType, extendedClothesSlice } from 'lib/clothesSlice'
import styled from 'styled-components'
import ClothesGallery from '@/components/ClothesGallery'
import ProductFilterSideBar from '@/components/ProductFilterSideBar'
import { useState } from 'react'
import Link from 'next/link'
import { GetStaticPaths, GetStaticProps } from 'next'
import { store } from 'lib/store'

store.dispatch(extendedClothesSlice.endpoints.getAllClothes.initiate())


export const getStaticPaths: GetStaticPaths = async () => {
  const paths = [
    { params: { productType: 'shirts' } },
    { params: { productType: 'shorts' } },
    { params: { productType: 'shoes' } }
  ]
  return {
    paths,
    fallback: false
  }
}
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await fetch(`https://shauns-ecommerce.herokuapp.com/api/asos/get${params!.productType}`)
  const productType = await res.json()
  console.log('static props rendered')
  return { 
    props:  productType ,
  }
}



interface IProps {
  data: ClotheType[]
}
export default function ProductGrouped( {data}: IProps) {

  const productList = data
  const [filteredClothes, setFilteredClothes] = useState<ClotheType[]>([])
  const [updatedFilteredClothes, setUpdatedFilteredClothes] = useState<ClotheType[]>([])
  const [noResults, setNoResults] = useState(false)

  // A function to collect state changes from children and create a clothes array for display
  function handleFilteredClotheArray(arr: ClotheType[]) {
    setUpdatedFilteredClothes(arr)
    setFilteredClothes([])

    if (filteredClothes.length === 0) {
      setNoResults(true)
    }
  }

  // Check whether the user has made a search query
  // If yes, use the updatedFilteredClothes state
  const truthyCheckFilteredArray = updatedFilteredClothes && updatedFilteredClothes.length > 0

  let galleryContent
  if (noResults) {
    galleryContent = <SearchFailure>
      <h1>This search has no results</h1>
      <button onClick={() => setNoResults(false)}>
        Okay
      </button>
    </SearchFailure>

  } else if (truthyCheckFilteredArray) {
    galleryContent = <ClothesGallery info={updatedFilteredClothes} />

  } else if (!truthyCheckFilteredArray) {
    galleryContent = <ClothesGallery info={productList} />
  } 

  return (
    <Wrapper>
      <Container>

        <SideBar>
          <ProductFilterSideBar
            info={productList}
            setFilteredClothes={setFilteredClothes}
            filteredClothes={filteredClothes}
          />

          <SubmitButton onClick={() => handleFilteredClotheArray(filteredClothes)}>
            SUBMIT
          </SubmitButton>
        </SideBar>

        <BodyContainer>
          <TagContainer>
            <Link href='/filter/[productType]' as='/filter/shirts'>
              <TagButton >Shirts</TagButton>
            </Link>
            <Link href='/filter/[productType]' as='/filter/shorts'>
              <TagButton >Shorts</TagButton>
            </Link>
            <Link href='/filter/[productType]' as='/filter/shoes'>
              <TagButton >Shoes</TagButton>
            </Link>
          </TagContainer>
          
          {galleryContent}
        </BodyContainer>

      </Container>
    </Wrapper>
  )
}


const Wrapper = styled.div`
  position: absolute;
  left: 0;
  top: 155px;
  width: 100%;
  height: calc(90% - 155px);
  display: flex;
  justify-content: center;

`
const Container = styled.div`
  position: relative;
  width: 1300px;
  height: auto;
  display: flex;
  justify-content: space-between;
  margin-top: 25px;
  padding: 0 20px;

  @media ${({ theme }) => theme.mobileL} {
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
`
const SearchFailure = styled.div`
  max-width: 970px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & button {
    width: 200px;
    border: none;
    margin-top: 20px;
    font-size: ${({ theme }) => theme.fontL};
    padding: 8px;
    cursor: pointer;
    border-radius: 5px;

    &:hover {
      background-color: ${({ theme }) => theme.headerTop};
      color: ${({ theme }) => theme.textInvert};
    }
  }
`
const SubmitButton = styled.button`
  width: 330px;
  padding: 8px;
  border: none;
  margin-top: 20px;
  font-size: ${({ theme }) => theme.fontML};
  font-weight: 600;
  transition: all 0.2s ease-in-out;
  box-shadow: inset 0 0 rgba(0, 0, 0, 0.0);
  cursor: pointer;
  &:active {
    background-color: ${({ theme }) => theme.primary};
    box-shadow: inset 3px -3px 5px rgba(0, 0, 0, 0.4), inset -1px 1px 3px rgba(0, 0, 0, 0.1);
    transition: all 0.08s ease-in-out;
  }
`

const SideBar = styled.div`
  width: 330px;
`
const BodyContainer = styled.div`
  max-width: 950px;
  display: flex;
  flex: 1;
  flex-direction: column;
`


const TagContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  margin-left: 25px;
`
const TagButton = styled.button`
  font-size: ${({ theme }) => theme.fontML};
  background-color: transparent;
  border: none;
  margin: 10px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  box-shadow: inset 0 0 rgba(0, 0, 0, 0.0);
  text-decoration: underline;
  text-underline-offset: 10px;

  &:after {
    content: '';
    padding-left: 10px;
    text-decoration: none !important;
  }
  &:active {
    background-color: ${({ theme }) => theme.primary};
    box-shadow: inset 3px -3px 5px rgba(0, 0, 0, 0.4), inset -1px 1px 3px rgba(0, 0, 0, 0.1);
    transition: all 0.08s ease-in-out;
  }
`