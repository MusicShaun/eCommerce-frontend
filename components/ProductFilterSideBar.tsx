import React, { SetStateAction, useState } from 'react'
import styled from 'styled-components'
import ProductFilterSideBarSelect from './ProductFilterSideBarSelect'
import { ClotheType } from 'lib/clothesSlice'
import PriceSlider from './PriceSlider'
import Link from 'next/link'

interface IProps {
  info: ClotheType[]
  setFilteredClothes: React.Dispatch<SetStateAction<ClotheType[] | []>>
  filteredClothes: ClotheType[] | []
}


export default function ProductFilterSideBar( {info, setFilteredClothes}: IProps) {

  function filterByFunction(selection: string) {
    console.log(selection)
    let arr = []
    arr = Object.values(info).filter((l => Object.values(l).find(x => x === selection)))
    setFilteredClothes(arr)
    console.log(arr)
  }

  const Brand = {
    arr: Object.values(info).map(l => l.brand), 
    filterByFunction,
    name: 'Brand'
  }
  const Color = {
    arr: Object.values(info).map(l => l.color), 
    filterByFunction,
    name: 'Color'
  }
  

  const flatMapSizes = Object.values(info).flatMap(l => l.sizes)
  const uniqueSizes = flatMapSizes.filter((size, index, self) => self.indexOf(size) === index)
  const Sizes = {
    arr: uniqueSizes, 
    filterByFunction,
    name: 'Sizes'
  }

  function getPriceRange(min: number, max: number) {
    let arr = []
    arr = Object.values(info).filter((l => Number(l.price.replace('$','')) < max && Number(l.price.replace('$','')) > min))
    console.log(arr)
    setFilteredClothes(arr)
  }

  return (
    <Container>
      <h1>Filters</h1>
      <ProductFilterSideBarSelect info={Brand} />
      <ProductFilterSideBarSelect info={Color} />
      <ProductFilterSideBarSelect info={Sizes} />
      
      <PriceSlider getPriceRange={getPriceRange} />

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
    </Container>
  )
}

const Container = styled.div`
  width: 330px;
  height: auto;
  display: flex;
  flex-direction: column;

`
const TagContainer = styled.div`
  width: 100%;
  margin-top: 20px;
`
const TagButton = styled.button`
  font-size: ${({ theme }) => theme.fontML};
  padding: 10px;
  border-radius: 15px;
  border: none;
  margin: 10px;
  cursor: pointer;
`