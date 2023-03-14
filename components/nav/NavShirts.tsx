import styled from 'styled-components'
import shoe from '@/images/shoeExample.webp'
import NavMenuList from '@/components/nav/NavMenu_List'
import NavMenuLargeImageTiles from '@/components/nav/NavMenu_LargeImageTiles'
import { Dispatch, SetStateAction } from 'react'
import { ClotheType, Clothes, selectClothesData, selectShirts } from 'lib/clothesSlice'
import { useAppSelector } from 'lib/hooks/hooks'

interface IProps {
  setNavShirts: Dispatch<SetStateAction<boolean>>
}

export default function Nav4Panel({ setNavShirts }: IProps) {

  const product_type = ['sneaker', 'hitop', 'loafer', 'joggers', 'cancer']
  const threeNavPics = [shoe, shoe , shoe]
  const shirtsOnly = useAppSelector(selectShirts)
  const clothes = useAppSelector(selectClothesData)
  let clothesInfo: object = clothes?.shirts ? clothes!.shirts : {}
  
  let shirtsName: string[] = Object.values(clothesInfo).map((i: ClotheType) => { return i.name})

  console.log(clothes)
  console.log(shirtsOnly)


  return (
    <BoxContainer
    onMouseEnter={() => setNavShirts(true)}
    onMouseLeave={() => setNavShirts(false)}
    >
    <Box>
      <Title>Product</Title>
        <NavMenuList info={shirtsName} />
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




