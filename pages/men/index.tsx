import Banner from '@/components/banners/Banner'
import styled from 'styled-components'
import React from 'react'
import { ClotheType, selectAllClothes, useGetAllClothesQuery } from '@/lib/slices/clothesSlice'
import ClothesGallery from '@/components/clothes/ClothesGallery'
import { useAppSelector } from 'lib/hooks/hooks'
import Head from 'next/head'


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

  return (<>
    <Head>
      <title>Men's Clothes & Fashion | Shop Men's Clothing </title>
      <meta property="og:title" content="Men's Clothes & Fashion | Shop Men's Clothing " />
	      <meta property="og:image" content="Discover the latest men's clothing and accessories online with Shauny's Shop. Select from men's t-shirts, shorts, shoes and more. Shop for the latest trends at Shauny's Shop" />
        <meta property="og:description" content="Discover the latest men's clothing and accessories online with Shauny's Shop. Select from men's t-shirts, shorts, shoes and more. Shop for the latest trends at Shauny's Shop" />
        <meta name="description" content="" />
        <link rel="canonical" href="https://shaunysshop.com/men " />
    </Head>

    <Wrapper>
      <Banner info={info} />
      {isSuccess && <ClothesGallery info={randomClothes!} />}
      <Banner info={info} />
    </Wrapper>
    </>)
}
const Wrapper = styled.main`
  position: absolute;
  left: 0;
  top: 155px;
  width: 100%;
  height: auto;
`
