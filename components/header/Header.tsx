import styled from "styled-components"
import HeaderBottom from "./HeaderBottom"
import HeaderLeft from "./HeaderLeft"
import SearchBar from "./SearchBar"
import HeaderRight from "./HeaderRight"
import HeaderBlackBar from "./HeaderBlackBar"

export default function Header() {


  return (
    <HeaderWrapper>
      <TopHeader
      >
        <Container>
          <HeaderLeft />
          <SearchBar />
          <HeaderRight />
        </Container>

      </TopHeader>

      <BottomHeader
      >
        <HeaderBottom />
      </BottomHeader>

      <HeaderBlackBar />
    </HeaderWrapper>
  )
}

const HeaderWrapper = styled.header`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%; 
  height: 155px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 100;
`
const TopHeader = styled.div`
  position: relative;
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;
  background-color: ${({theme}) => theme.headerTop };
`
const BottomHeader = styled.div`
  position: relative;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.headerMiddle };
  z-index: 1000;
`
const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 1300px;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`

