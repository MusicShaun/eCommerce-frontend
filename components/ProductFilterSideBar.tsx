import React, { SetStateAction, useEffect, useState } from 'react'
import styled from 'styled-components'
import ProductFilterSideBarSelect from './ProductFilterSideBarSelect'
import { ClotheType } from 'lib/clothesSlice'
import PriceSlider from './PriceSlider'

interface IProps {
  info: ClotheType[]
  setFilteredClothes: React.Dispatch<SetStateAction<ClotheType[] | []>>
  filteredClothes: ClotheType[] | []
}

export default function ProductFilterSideBar( {info, setFilteredClothes, filteredClothes}: IProps) {

  const [ filters, setFilters ] = useState({brand: '', color: '', size: ''})
  const [priceRange, setPriceRange] = useState([0, 500])

  // passed as prop 
  // it collects the state from the child component used to filter the clothes
  function stateSetterFunction(name: string, value: string) {
    setFilters({ ...filters, [name]: value });
  }
  // passed as prop
  // it resets the state above when triggered from the child component
  function childStateSetterFunction(name: string) {
    setFilters({...filters, [name]: ''})
  }


  // BIG USEEFFECT HERE WHICH TAKES ALL THE STATES ABOVE AS ARGUMENTS TO FILTER THE CLOTHES ARRAY
  function filterArrayFunction(str: string, clothes: ClotheType[]) {
    return clothes.filter((l => Object.values(l).find(x => x === str)))
  }
  function applyFilters(clothes: ClotheType[], filters: {brand: string, color: string, size: string}, priceRange: number[]) {
    let filteredClothes = [...clothes];
  
    if (filters.brand) {
      filteredClothes = filteredClothes.filter(cloth => cloth.brand === filters.brand);
    }
  
    if (filters.color) {
      filteredClothes = filteredClothes.filter(cloth => cloth.color === filters.color);
    }
  
    if (filters.size) { //! something is wrong with the sizes
      filteredClothes = filteredClothes.filter(cloth => cloth.sizes.includes(filters.size));
    }
  
    filteredClothes = filteredClothes.filter(cloth => {
      const price = Number(cloth.price.replace('$', ''));
      return price >= priceRange[0] && price <= priceRange[1];
    });
  
    return filteredClothes;
  }
  useEffect(() => {
    const filteredClothes = applyFilters(info, filters, priceRange)
    setFilteredClothes(filteredClothes)
  }, [info, filters, priceRange])



  // THIS IS THE OBJECTS THAT ARE PASSED TO THE PRODUCTFILTERSIDEBARSELECT CHILD COMPONENT
  const Brand = {
    name: 'brand',
    arr: Object.values(info).map(l => l.brand), 
    stateSetterFunction,
    childStateSetterFunction
  }
  const Color = {
    name: 'color',
    arr: Object.values(info).map(l => l.color), 
    stateSetterFunction,
    childStateSetterFunction
  }
  const flatMapSizes = Object.values(info).flatMap(l => l.sizes)
  const uniqueSizes = flatMapSizes.filter((size, index, self) => self.indexOf(size) === index)
  const Sizes = {
    arr: uniqueSizes, 
    stateSetterFunction,
    name: 'sizes',
    childStateSetterFunction
  }


  console.log(filters)

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
