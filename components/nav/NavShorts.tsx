import styled from 'styled-components'
import shoe from '@/images/shoeExample.webp'
import NavMenuList from '@/components/nav/NavMenu_List'
import NavMenuLargeImageTiles from '@/components/nav/NavMenu_LargeImageTiles'
import { Dispatch, SetStateAction } from 'react'
import { ClotheType, Clothes, selectClothesData } from 'lib/clothesSlice'
import { useAppSelector } from 'lib/hooks/hooks'

interface IProps {
  setNavShorts: Dispatch<SetStateAction<boolean>>
}

export default function NavShorts({ setNavShorts }: IProps) {

  const threeNavPics = [shoe, shoe, shoe]
  
  const clothes: Clothes | undefined = useAppSelector(selectClothesData)
  const clothesInfo: object = clothes?.data.shorts ? clothes.data.shorts : {}

  let shortName: string[] = Object.values(clothesInfo).map((i: ClotheType) => { return i.name})

  return (
    <BoxContainer
    onMouseEnter={() => setNavShorts(true)}
    onMouseLeave={() => setNavShorts(false)}
    >
    <Box>
      <Title>Product</Title>
      <NavMenuList info={shortName} />
    </Box>
      
    <Box style={{width: '75%'}}>
    <Title>Brand</Title>
        <NavMenuLargeImageTiles info={threeNavPics} />
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
  width: 25%;
  padding: 0px 40px;

  border-right: 1px solid lightgrey;

  &:last-child {
    border-right: none;
  }
`
const Title = styled.h3`
  
`




