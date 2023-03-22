import React from 'react'
import styled from 'styled-components'
import ProductFilterSideBarSelect from './ProductFilterSideBarSelect'
import { ClotheType } from 'lib/clothesSlice'
import PriceSlider from './PriceSlider'

interface IProps {
  info: ClotheType[]
}
export default function ProductFilterSideBar( {info}: IProps) {



  const Brand = {
    arr: Object.values(info).map(l => l.brand), 
    filterByBrand,
    name: 'Brand'
  }
  function filterByBrand() {
    return 'stromg'
  }

  const Color = {
    arr: Object.values(info).map(l => l.color), 
    filterByBrand,
    name: 'Color'
  }

  const flatMapSizes = Object.values(info).flatMap(l => l.sizes)
  const uniqueSizes = flatMapSizes.filter((size, index, self) => self.indexOf(size) === index)
  const Sizes = {
    arr: uniqueSizes, 
    filterByBrand,
    name: 'Sizes'
  }


  return (
    <Container>
      <h1>Filters</h1>
      <ProductFilterSideBarSelect info={Brand} />
      <ProductFilterSideBarSelect info={ Color} />
      <ProductFilterSideBarSelect info={Sizes} />
      
      <PriceSlider />

      <div>sale</div>

    </Container>
  )
}

const Container = styled.div`
  width: 330px;
  height: auto;
  display: flex;
  flex-direction: column;

`
