import styled from 'styled-components'
import NavMenuList from '@/components/nav/navMenu/NavMenu_List'
import NavMenuLargeImageTiles from '@/components/nav/navMenu/NavMenu_LargeImageTiles'
import {  selectShorts } from '@/lib/slices/clothesSlice'
import { useAppSelector } from 'lib/hooks/hooks'

interface IProps {
  handleEnterNavTab: (name: string, value: boolean ) => void
}

export default function NavShorts({ handleEnterNavTab }: IProps) {

  const shortsOnly = useAppSelector(selectShorts)


  return (
    <BoxContainer
    onMouseEnter={() => handleEnterNavTab('Shorts', true)}
    onMouseLeave={() => handleEnterNavTab('Shorts', false)}
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
  cursor: pointer;

  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;

  @media ${({ theme }) => theme.mobileL} {
    display: none;
  }

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




