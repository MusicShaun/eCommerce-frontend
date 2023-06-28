import styled from "styled-components";
import HeaderRight from "./HeaderRight";
import Link from "next/link";
import Hamburger from 'hamburger-react'
import { useState } from "react";
import MobileNavigation from "../nav/navDropdowns/mobileNav/MobileNavigation";
import MagnifyingGlass from "../icons/MagnifyingGlass";



function MobileHeader() {

  const [isOpen, setOpen] = useState<boolean>(false)

  return (
    <Wrapper>

      {isOpen ?
        <DimTheBackground style={{
          backgroundColor: !isOpen
            ? 'transparent' : 'rgba(0,0,0,0.5)', transform: !isOpen ? 'translateX(-100%)' : '0'
        }}
        />
        : null}

      <MobileNavigation setOpen={setOpen} isOpen={isOpen} />

      <LeftContainer>
        <HamburgerContainer onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} >
          <Hamburger toggled={isOpen} toggle={setOpen} size={28} rounded label="Show menu" />
        </HamburgerContainer>

        <ButtonContainer>
          <Link href='/'>
            Shauny's
          </Link>
        </ButtonContainer>
      </LeftContainer>
      
      <RightContainer>
        <SearchButton>
          <MagnifyingGlass /> 
        </SearchButton>

        <HeaderRight />
      </RightContainer>
    </Wrapper>
      )
}

export default MobileHeader



const Wrapper = styled.header`
  display: none;
  @media ${({ theme }) => theme.mobileL} {
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 60px;
    z-index: 100;
    justify-content: space-between;
    background-color: ${({ theme }) => theme.headerTop};
    color: ${({ theme }) => theme.headerTop};
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
  background-color: none;
  margin-left: 0.5rem;

  & a  {
    display: flex;
    justify-content:center;
    align-items: center;
    text-decoration: none;
    font-size: 1.6rem;
    font-weight: 600;
    color: white;
    letter-spacing: -1px;
    }
  &:hover , :active {
    border: 2px solid ${({ theme }) => theme.headerBottom};  
    border-radius: 5px;
    color: ${({ theme }) => theme.headerTop};
  }

`

const SearchButton = styled.button`
  position: relative;
  height: 100%;
  width: 50px;
  border: none;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;

  & div {
    width: 24px;

  }

`

const DimTheBackground = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  transition: background-color 0.5s ease-in-out ;
`