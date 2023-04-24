import styled from 'styled-components'
import React from 'react'
import Sidebar from '../pages/user/Sidebar'
import SidebarMobile from './SidebarMobile'



export default function MyAccountLayout({children}: { children: React.ReactNode}) {



  return (
    <Wrapper>
      <Header>
        <div>ASOS</div>
        <div>My Account</div>
      </Header>
      <Container>
        <Sidebar />
        <SidebarMobile />
        {children}

      </Container>
    </Wrapper>
  )
}


const Wrapper = styled.main`
  position: relative; 
  min-height: calc(100vh - 60px);
  margin-top: 60px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; 
  background-color: ${({theme}) => theme.backgroundSecondary };
  z-index: 100;
`
const Container = styled.div`
  width: 960px; 
  height: auto;
  display: flex;
  justify-content: space-around;

  @media ${({theme}) => theme.tablet} {
      width: 100%;
      & > div:first-child {
      margin-left: 50px;
      }
      & > div:last-child {
      margin-right: 50px;
      }
    }

  @media ${({theme}) => theme.mobileL} {
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
  display: flex;
  width: 920px;
  height: 75px;
  align-items: center;
  font-size: 28px;
  font-weight: 700;

  & div:first-child {
    width: 300px;
  }

  @media ${({theme}) => theme.tablet} {
      width: 100%;
      margin-left: 50px;
  }
  @media ${({ theme }) => theme.mobileL} {
    display: none;
  }
`