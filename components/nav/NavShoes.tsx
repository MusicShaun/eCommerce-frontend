import styled from 'styled-components'
import shoe from '../../images/shoeExample.webp'
import NavMenuThreeImageTiles from '@/components/nav/NavMenu_ThreeImagesTiles'
import NavMenuListWithIcons from '@/components/nav/NavMenu_ListWithIcons'
import NavMenuList from '@/components/nav/NavMenu_List'
import { Dispatch, SetStateAction, useState } from 'react'
import { useAppSelector } from 'lib/hooks/hooks'
import { ClotheType, Clothes, selectClothesData } from 'lib/clothesSlice'

interface IProps {
  setNavShoes: Dispatch<SetStateAction<boolean>>
}
export default function Nav4Panel({ setNavShoes }:IProps) {
  
  const clothes: Clothes | undefined  = useAppSelector(selectClothesData)
  const threeNavPics = [shoe, shoe, shoe]

  let clothesInfo: ClotheType | object = clothes?.data.shirts ? clothes.data!.shirts : {}

  let shoesBrand: string[] = (Object.values(clothesInfo)).map((l: ClotheType) => {return l.brand})
  let shoesName: string[] = (Object.values(clothesInfo)).map((l: ClotheType) => {return l.name})
  let shoesHeading: string[] = (Object.values(clothesInfo)).map((l: ClotheType) => { return l.heading })

  
  return (
    <BoxContainer
    onMouseEnter={() => setNavShoes(true)}
    onMouseLeave={() => setNavShoes(false)}>
    <Box>
      <Title>Product</Title>
      <NavMenuList info={shoesName} />
    </Box>
      
    <Box>
    <Title>Brand</Title>
      <NavMenuListWithIcons info={shoesBrand} />
    </Box>
      
    <Box>
      <Title>Product</Title>
      <NavMenuList info={shoesHeading} />
    </Box>
      
    <Box style={{justifyContent: 'space-around'}}>
        <NavMenuThreeImageTiles info={threeNavPics}  />
    </Box>
  </BoxContainer>)
}

const BoxContainer = styled.div`
  position: absolute;
  top: 50px;
  left: 0;
  padding-top: 20px;
  display: flex;
  height: 340px;
  width: 100%;
  background-color: white;
`
const Box = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 100%;
  width: 15%;
  padding: 0px 40px;

  border-right: 1px solid grey;

  &:last-child {
    border-right: none;
  }
`
const Title = styled.h3`
  
`




