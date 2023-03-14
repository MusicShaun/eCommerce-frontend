import Link from 'next/link'
import router from 'next/router'
import React from 'react'
import styled from 'styled-components'
import { useAppDispatch } from 'lib/hooks/hooks'
import { apiSlice } from 'lib/apiSlice'


export default function NavUserDropdown() {

  const dispatch = useAppDispatch()

  function handleLogout() {
    localStorage.removeItem('key')
    dispatch(apiSlice.util.resetApiState())
    router.push('/login/LoginWrapper', '/login', {shallow: true})
  }


  return (
    <Container>
      <HeadContainer>
        <div>
          <Link href='/login/LoginWrapper' as='/login'><HeadButtons style={{borderRight: ' 1px solid black'}}>Sign in</HeadButtons></Link>
          <Link href='/login/LoginWrapper' as='/login'><HeadButtons>Join</HeadButtons></Link>
        </div>
        <XContainer>X</XContainer>
      </HeadContainer>

      <BodyContainer>
        <Link href='/user/MyAccount' ><div>My Account</div></Link>
        <Link href='/user/PersonalDetails' ><div>Personal Details</div></Link>
        <Link href='/user/MyOrders' ><div>My Orders</div></Link>
        <Link href='/user/PurchaseHistory' ><div>Purchase History</div></Link>
        <Logout onClick={handleLogout}>Logout</Logout>
   
      </BodyContainer>

    </Container>
  )
}


const Container = styled.div`
  position: absolute;
  width: 280px;
  height: 300px;
  background-color: ${({ theme }) => theme.background};
  z-index: 1;
  transform: translateY(-400px);
  transition: transform 0.5s cubic-bezier(0.75, 0.06, 0.58, 0.79); //out
`
const HeadContainer = styled.div`
  width: 100%;
  height: 50px;
  background-color: ${({ theme }) => theme.white};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px;

  & > div{
    height: 60%;
  }
`
const HeadButtons = styled.button`
  background-color: transparent;
  border: none;
  padding: 0 10px;
  height: 100%;
  
  &:hover {
    cursor: pointer;
    color: blue;
  }
`
const XContainer = styled.div`
  padding: 10px;
`

const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100% - 50px);
  
  & a, div, button {
    display: flex;
    align-items: center;
    flex: 1;
    text-decoration: none;
    color: inherit;
  }
  & div, button {
    padding-left: 20px;

    &:active {
      box-shadow: inset 3px 3px 2px ${({theme}) => theme.headerMiddle};
      background-color: ${({ theme }) => theme.white}
    }
  }
`
const Logout = styled.button`
  border: none;
  font-size: 16px;
  background: none;
  &:hover {
    cursor: pointer;
  }


`