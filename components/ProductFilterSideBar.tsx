import React, { SetStateAction, useEffect, useState } from 'react'
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


export default function ProductFilterSideBar( {info, setFilteredClothes, filteredClothes}: IProps) {

  const [brand, setBrand] = useState('')
  const [color, setColor] = useState('')
  const [size, setSize] = useState('')
  const [priceRange, setPriceRange] = useState([0, 500])

  function stateSetterFunction(brand: string, color: string, size: string) {
    if (brand) {
      setBrand(brand)
    }
    if (color) {
      setColor(color)
    }
    if (size) {
      setSize(size)
    }
  }

  // BIG USEEFFECT HERE WHICH TAKES ALL THE STATES ABOVE AS ARGUMENTS TO FILTER THE CLOTHES ARRAY
  function filterArrayFunction(str: string) {
    return (filteredClothes.length > 0 ? filteredClothes : Object.values(info))
    .filter((l => Object.values(l).find(x => x === str)))
  }
  useEffect(() => {
    if (brand) {
      setFilteredClothes(filterArrayFunction(brand))
      console.log('brand', brand)
    }
    if (color) {
      setFilteredClothes(filterArrayFunction(color))
      console.log('color', color)
    }
    if (size) {
      setFilteredClothes(
        (filteredClothes.length > 0 ? filteredClothes : Object.values(info))
          .filter((l => Object.values(l.sizes).find(x => x === size))))
      console.log('size', size)
    }

    setFilteredClothes(
      (filteredClothes.length > 0 ? filteredClothes : Object.values(info))
      .filter((l => Number(l.price.replace('$', '')) < priceRange[1] && Number(l.price.replace('$', '')) > priceRange[0])))
      console.log('priceRange', priceRange)

  }, [brand, color, size, priceRange])




  // THIS IS THE OBJECTS THAT ARE PASSED TO THE PRODUCTFILTERSIDEBARSELECT COMPONENT
  const Brand = {
    arr: Object.values(info).map(l => l.brand), 
    stateSetterFunction,
    name: 'Brand'
  }
  const Color = {
    arr: Object.values(info).map(l => l.color), 
    stateSetterFunction,
    name: 'Color'
  }
  const flatMapSizes = Object.values(info).flatMap(l => l.sizes)
  const uniqueSizes = flatMapSizes.filter((size, index, self) => self.indexOf(size) === index)
  const Sizes = {
    arr: uniqueSizes, 
    stateSetterFunction,
    name: 'Sizes'
  }






  return (
    <Container>
      <h1>Filters</h1>
      <ProductFilterSideBarSelect info={Brand} />
      <ProductFilterSideBarSelect info={Color} />
      <ProductFilterSideBarSelect info={Sizes} />
      
      <PriceSlider setPriceRange={setPriceRange} priceRange={priceRange} />


    </Container>
  )
}

const Container = styled.div`
  width: 330px;
  height: auto;
  display: flex;
  flex-direction: column;

`
