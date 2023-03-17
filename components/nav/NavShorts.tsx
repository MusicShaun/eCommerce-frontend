import styled from 'styled-components'
import NavMenuList from '@/components/nav/NavMenu_List'
import NavMenuLargeImageTiles from '@/components/nav/NavMenu_LargeImageTiles'
import { Dispatch, SetStateAction } from 'react'
import {  selectShorts } from 'lib/clothesSlice'
import { useAppSelector } from 'lib/hooks/hooks'

interface IProps {
  setNavShorts: Dispatch<SetStateAction<boolean>>
}

export default function NavShorts({ setNavShorts }: IProps) {

  const shortsOnly = useAppSelector(selectShorts)


  return (
    <BoxContainer
    onMouseEnter={() => setNavShorts(true)}
    onMouseLeave={() => setNavShorts(false)}
    >
    <Box>
      <Title>Product</Title>
      <NavMenuList info={shortsOnly} />
    </Box>
      
    <Box style={{width: '75%'}}>
    <Title>Brand</Title>
        <NavMenuLargeImageTiles info={shortsOnly} />
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
  width: 25%;
  padding: 0px 20px;

  border-right: 1px solid lightgrey;

  &:last-child {
    border-right: none;
  }
`
const Title = styled.h3`
  text-decoration: underline;
  padding-bottom: 10px;
`




