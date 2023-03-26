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

  const [ filters, setFilters ] = useState({brand: '', color: '', sizes: ''})
  const [priceRange, setPriceRange] = useState([0, 500])

  // passed as prop 
  // it collects the state from the child component used to filter the clothes
  function stateSetterFunction(name: string, value: string) {
    setFilters({ ...filters, [name]: value });
  }
  // passed as prop
  // it resets the filter state when triggered from the child component
  function childStateSetterFunction(name: string) {
    setFilters({...filters, [name]: ''})
  }


  // BIG function HERE TO FILTER THE CLOTHES ARRAY
  function applyFilters(clothes: ClotheType[], filters: {brand: string, color: string, sizes: string}, priceRange: number[]) {
    let filteredClothes = [...clothes];
    console.log(filters)
    if (filters.brand) {
      filteredClothes = filteredClothes.filter(cloth => cloth.brand === filters.brand);
    }
  
    if (filters.color) {
      filteredClothes = filteredClothes.filter(cloth => cloth.color === filters.color);
    }
  
    if (filters.sizes) { 
      filteredClothes = filteredClothes.filter(cloth => cloth.sizes.includes(filters.sizes));
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
    arr: Object.values(info).map(b => b.brand), 
    stateSetterFunction,
    childStateSetterFunction
  }
  const Color = {
    name: 'color',
    arr: Object.values(info).map(c => c.color), 
    stateSetterFunction,
    childStateSetterFunction
  }
  const flatMapSizes = Object.values(info).flatMap(s => s.sizes)
  const uniqueSizes = flatMapSizes.filter((size, index, self) => self.indexOf(size) === index)
  const Sizes = {
    name: 'sizes',
    arr: uniqueSizes, 
    stateSetterFunction,
    childStateSetterFunction
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
