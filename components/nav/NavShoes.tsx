import styled from 'styled-components'
import NavMenuThreeImageTiles from '@/components/nav/NavMenu_ThreeImagesTiles'
import NavMenuListWithIcons from '@/components/nav/NavMenu_ListWithIcons'
import NavMenuList from '@/components/nav/NavMenu_List'
import { useAppSelector } from 'lib/hooks/hooks'
import { selectShoes } from 'lib/clothesSlice'

interface IProps {
  handleEnterNavTab: (name: string, value: boolean ) => void
}
export default function Nav4Panel({ handleEnterNavTab }:IProps) {
  
  const shoesOnly = useAppSelector(selectShoes)

  return (
    <BoxContainer
    onMouseEnter={() => handleEnterNavTab('Shoes', true)}
    onMouseLeave={() => handleEnterNavTab('Shoes', false)}
    >
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
  background-color: ${({ theme }) => theme.backgroundSecondary};
  
  @media ${({ theme }) => theme.mobileL} {
    display: none;
  }
`
const Box = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 100%;
  width: 15%;
  padding: 0px 20px;
  cursor: pointer;

  border-right: 1px solid grey;

  &:last-child {
    border-right: none;
  }
`
const Title = styled.h3`
  text-decoration: underline;
  padding-bottom: 10px;
  color: ${({ theme }) => theme.lightgrey}
`




