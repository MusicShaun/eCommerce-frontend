import Banner from '@/components/banners/Banner'
import styled from 'styled-components'
import React from 'react'
import { ClotheType, selectAllClothes, useGetAllClothesQuery } from '@/lib/slices/clothesSlice'
import ClothesGallery from '@/components/clothes/ClothesGallery'
import { useAppSelector } from 'lib/hooks/hooks'
import { MensPageHead } from 'lib/head'
import { colors } from '@/config/ThemeConfig'
import Footer from '@/components/footer/Footer'


export default function Men() {

  const selectAll = useAppSelector(selectAllClothes)

  
  const {
    isSuccess,
  } = useGetAllClothesQuery()

  let randomClothes: ClotheType[] = []
  if (isSuccess) {
    randomClothes = [...selectAll].sort(() => Math.random() - 0.5)
  }

  const firstBanner = {
    banner: colors.LIGHT_BLUE,
    header: 'UP TO 30% OFF',
    header2: ' SELECTED STOCK',
    subheader: 'Surprise discount unlocked',
    subheader2: 'With code: ',
    subheader3: 'SURPRISE'
  } as const
  const secondBanner = {
    banner: colors.PEACH,
    banner2: colors.BANNER_5, 
    header: 'UP TO 50% OFF ',
    header2: ' SUMMER STUFF',
    subheader: 'ITS HOT OUT THERE',
    subheader2: '',
    subheader3: ''
  } as const

// #
  return (<>
    <MensPageHead /> 

    <Wrapper>
      <Banner info={secondBanner} />

      {isSuccess && <ClothesGallery info={randomClothes!} />}

      <Banner info={firstBanner} />
    </Wrapper>
    </>)
}
const Wrapper = styled.main`
  position: relative;
  margin-top: 110px;
  width: 100%;
  height: auto;

  @media ${({ theme }) => theme.mobileL} {
    top: 60px;}
`
