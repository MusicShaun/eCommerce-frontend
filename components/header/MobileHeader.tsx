import styled, { useTheme } from "styled-components";
import Image from "next/image";
import Magnifying from "@/public/magnifying.webp";
import HeaderRight from "./HeaderRight";
import Link from "next/link";
import logo from "@/public/Mobile_logo.webp";
import Hamburger from 'hamburger-react'
import { useState } from "react";
import MobileNavigation from "../nav/navDropdowns/mobileNav/MobileNavigation";


function MobileHeader() {

  const [isOpen, setOpen] = useState<boolean>(false)


  
  return (
    <Wrapper>

      <DimTheBackground style={{ backgroundColor: !isOpen ? 'transparent' : 'rgba(0,0,0,0.5)' }}  />

      <MobileNavigation setOpen={setOpen} isOpen={isOpen} />

      <LeftContainer>
        <HamburgerContainer onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} >
          <Hamburger toggled={isOpen} toggle={setOpen} size={28} rounded label="Show menu" />
        </HamburgerContainer>

        <ButtonContainer>
          <Button>
            <Link href='/' as='/'>
              <Image src={logo} width={60} height={60} alt=""/>
            </Link>  
          </Button>
        </ButtonContainer>
      </LeftContainer>
      
      <RightContainer>
        <SearchButton>
          <Image
            src={Magnifying}
            width='28'
            height='28'
            alt=''
            />
        </SearchButton>
        <HeaderRight />
      </RightContainer>
    </Wrapper>
      )
}

export default MobileHeader



const Wrapper = styled.header`
  display: none;
  position: absolute;
  width: 100%;
  height: 60px;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.headerTop};


  @media ${({ theme }) => theme.mobileL} {
    display: flex;
  }
`
const LeftContainer = styled.div`
  display: flex;
`
const RightContainer = styled.div`
  display: flex;
  align-items: flex-end;
  `


const HamburgerContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  height: 60px;
  border-right: 1px solid ${({ theme }) => theme.headerMiddle};
`
const Button = styled.button`
  height: 60px;
  border: none;
  background-color: ${({ theme }) => theme.headerBottom};
  & a  {
    text-decoration: none;
    }
  &:hover {
    background-color: ${({ theme }) => theme.backgroundSecondary};  
    color: ${({ theme }) => theme.headerTop};
  }
  &:hover span {
      color: ${({ theme }) => theme.headerTop};
    }

`
const SearchButton = styled.button`
  position: relative;
  height: 60px;
  width: 50px;
  border: none;
  background-color: transparent;
  
  & img {
    filter: invert(1);
  }

`

const DimTheBackground = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  transition: background-color 0.5s ease-in-out;
`