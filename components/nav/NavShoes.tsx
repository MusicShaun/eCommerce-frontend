import styled from 'styled-components'
import NavMenuThreeImageTiles from '@/components/nav/NavMenu_ThreeImagesTiles'
import NavMenuListWithIcons from '@/components/nav/NavMenu_ListWithIcons'
import NavMenuList from '@/components/nav/NavMenu_List'
import { Dispatch, SetStateAction, useState } from 'react'
import { useAppSelector } from 'lib/hooks/hooks'
import { selectShoes } from 'lib/clothesSlice'

interface IProps {
  setNavShoes: Dispatch<SetStateAction<boolean>>
}
export default function Nav4Panel({ setNavShoes }:IProps) {
  
  const shoesOnly = useAppSelector(selectShoes)

  return (
    <BoxContainer
    onMouseEnter={() => setNavShoes(true)}
    onMouseLeave={() => setNavShoes(false)}>
    <Box>
      <Title>Product</Title>
      <NavMenuList info={shoesOnly} />
    </Box>
      
    <Box>
    <Title>Brand</Title>
      <NavMenuListWithIcons info={shoesOnly} />
    </Box>
      
    <Box>
      <Title>Product</Title>
      <NavMenuList info={shoesOnly} />
    </Box>
      
    <Box style={{justifyContent: 'space-around'}}>
        <NavMenuThreeImageTiles info={shoesOnly}  />
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
  background-color: ${({theme}) => theme.backgroundSecondary};
`
const Box = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 100%;
  width: 15%;
  padding: 0px 20px;

  border-right: 1px solid grey;

  &:last-child {
    border-right: none;
  }
`
const Title = styled.h3`
  text-decoration: underline;
  padding-bottom: 10px;
`




