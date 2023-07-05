import Banner from '@/components/banners/Banner'
import styled from 'styled-components'
import React from 'react'
import { ClotheType, selectAllClothes, useGetAllClothesQuery } from '@/lib/slices/clothesSlice'
import ClothesGallery from '@/components/clothes/ClothesGallery'
import { useAppSelector } from 'lib/hooks/hooks'
import { MensPageHead } from 'lib/head'
import { mensFirstBanner, mensSecondBanner } from '@/components/banners/bannerObjects'

export default function Men() {

  const selectAll = useAppSelector(selectAllClothes)

  
  const {
    isSuccess,
  } = useGetAllClothesQuery()

  let randomClothes: ClotheType[] = []
  if (isSuccess) {
    randomClothes = [...selectAll].sort(() => Math.random() - 0.5)
  }


  return (<>
    <MensPageHead /> 

    <Wrapper>
      <Banner info={mensSecondBanner} />
      {isSuccess && <ClothesGallery info={randomClothes!} />}
      <Banner info={mensFirstBanner} />
    </Wrapper>
    
    </>)
}
const Wrapper = styled.section`
  position: relative;
  width: 100%;
  height: auto;

  @media ${({ theme }) => theme.mobileL} {
    margin-top: 60px;
  }
  
`
