import Banner from '@/components/Banner'
import styled from 'styled-components'
import React from 'react'
import { ClotheType, selectAllClothes, useGetAllClothesQuery } from 'lib/clothesSlice'
import ClothesGallery from '@/components/ClothesGallery'
import { useAppSelector } from 'lib/hooks/hooks'


export default function Men() {

  const selectAll = useAppSelector(selectAllClothes)

  const {
    isSuccess,
  } = useGetAllClothesQuery()

  let randomClothes: ClotheType[] = []
  if (isSuccess) {
    randomClothes = [...selectAll].sort(() => Math.random() - 0.5)
  }

  const info = {
    header: 'UP TO 30% OFF ',
    header2: ' SELECTED STOCK',
    subheader: 'Surprise discount unlocked',
    subheader2: 'With code: ',
    subheader3: 'SURPRISE'
  } as const

  return (
    <Wrapper>
      <Banner info={info} />
      {isSuccess && <ClothesGallery info={randomClothes!} />}
      <Banner info={info} />
    </Wrapper>
  )
}
const Wrapper = styled.main`
  position: absolute;
  left: 0;
  top: 155px;
  width: 100%;
  height: auto;
`
