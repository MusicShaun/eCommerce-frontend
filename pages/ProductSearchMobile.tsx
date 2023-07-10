
import ClothesGallery from '@/components/clothes/ClothesGallery'
import { useAppSelector } from '@/lib/hooks/hooks'
import { selectSearchBar } from '@/lib/slices/searchBarSlice'
import React from 'react'
import styled from 'styled-components'


function ProductSearchMobile() {

  const info = useAppSelector(selectSearchBar)


  
  return (
    <Wrapper>

      <Title>
        {info.length === 0 ? `Your search had no results` : `${info.length} results`}
      </Title>
      <ClothesGallery info={info} />
    </Wrapper>
  )
}

export default ProductSearchMobile

const Wrapper = styled.div`
  display: none;
  @media ${({ theme }) => theme.mobileL }{
    position: relative;
    top: 0px;
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    margin-bottom: 40px;
    padding-bottom: 50px;
  }
  `
const Title = styled.h1`
  margin-top: 50px;
  font-size: 2.2rem;
  width: 100%;
  text-align: center;
  `