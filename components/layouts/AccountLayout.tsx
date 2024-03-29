import styled from 'styled-components'
import React, { useEffect, useState } from 'react'
import Sidebar from '../sidebars/Sidebar'
import Hamburger from 'hamburger-react'
import BackButton from '../buttons/BackButtonMyAccount'
import { useRouter } from 'next/router'
import SidebarMobile from '../sidebars/SidebarMobile'


export default function MyAccountLayout({children}: { children: React.ReactNode}) {

  const [isOpen, setOpen] = useState<boolean>(false)
  const router = useRouter()

  useEffect(() => {
    if (router.pathname.toLowerCase().includes('myaccount')) {
      setOpen(true)
    }
  }, [router.query])
  
  //* ADD A CLOSE MENU ON ESCAPE. 
  const closeAllMenusOnEsc = (e: any) => {
    console.log(e)
    e = e || window.event;
  
    if (e.key === 'Escape' || e.keyCode === 27) {
      setOpen( false);
    }
  }

  return (
    <>
    <Wrapper>
      
      <Header>
        <h3>ASOS</h3>
        <BackButton/>
        <h3>My Account</h3>
      </Header>
   
      <HamburgerContainer >
        <Hamburger toggled={isOpen} toggle={setOpen} size={40} rounded label="Show menu" />
      </HamburgerContainer>
      {isOpen ? <Darken /> : false}

      <Container>
      
        <SidebarMobile isOpen={isOpen}  /> 
        <Sidebar isOpen={isOpen} />
        
        {children}

      </Container>
    </Wrapper>
  </>)
}


const Wrapper = styled.section`
  position: relative; 
  padding-bottom: 75px;
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center; 
  background-color: ${({theme}) => theme.backgroundSecondary };
  z-index: 99;
  color: ${({ theme }) => theme.text};

  @media ${({ theme }) => theme.mobileL } {
    min-height: calc(100vh - 125px);
  }
`
const Container = styled.div`
  width: 960px; 
  height: auto;
  display: flex;
  justify-content: space-around;

  & * {
    box-sizing: border-box;
  }

  @media ${({ theme }) => theme.tablet} {
      width: 100%;
      & > div:first-child {
      margin-left: 50px;
      }
      & > div:last-child {
      margin-right: 50px;
      }
    }
  @media ${({ theme }) => theme.mobileL} {
    align-items: center;
    & > div:first-child {
    margin-left: 0px;
    }
    flex-direction: column;
  }

  & > div:last-child {
    width: 620px;
    @media ${({theme}) => theme.tablet} {
      width: calc(100% - 280px);
    }
    @media ${({theme}) => theme.mobileL} {
      width: 100%;
      margin-right: 0;
    }
  }
`
const Header = styled.div`
position: relative;
  display: flex;
  width: 920px;
  height: 75px;
  align-items: center;
  font-size: 28px;
  font-weight: 700;

  & h3:first-child {
    width: 300px;
  }
  & div {

  }

  @media ${({theme}) => theme.tablet} {
      width: 100%;
      margin-left: 50px;
  }
  @media ${({ theme }) => theme.mobileL} {
    display: none;
  }
`

const HamburgerContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  margin: 20px 30px;
  z-index: 1001;
  display: none;

  @media ${({ theme }) => theme.mobileL} {
    display: flex;
  }
  `

const Darken = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0,0,0,0.25);
  display: none;

  @media ${({ theme }) => theme.mobileL} {
    display: block;
  }
`