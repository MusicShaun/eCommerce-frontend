import Link from 'next/link'
import router from 'next/router'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useAppDispatch } from 'lib/hooks/hooks'
import { apiSlice } from 'lib/apiSlice'
import Cookies from 'js-cookie'

export default function NavUserDropdown() {

  const dispatch = useAppDispatch()
  const [loggedIn, setLoggedIn ] = useState(false)

  // checks if user is logged in
  useEffect(() => {
    const jwt = Cookies.get('jwt')
    if (jwt) {
    //! perform a request to verify the jwt on the server-side
    //! if the jwt is valid, setLoggedIn(true)
    //! if the jwt is invalid or has expired, remove the jwt cookie and setLoggedIn(false)
    }
  }, [])


  // expires cookie 
  // removes user info from localStorage
  // resets api state
  // redirects to login page
  function handleLogout() {
    document.cookie =  "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    localStorage.removeItem('key')
    dispatch(apiSlice.util.resetApiState())
    router.push('/login/LoginWrapper', '/login', {shallow: true})
  }


  return (
    <Container >
      <HeadContainer>
        {!loggedIn &&
          <div>
            <Link href='/login/LoginWrapper' as='/login'>
              <HeadButtons style={{ borderRight: ' 1px solid black' }}>
                Sign in
              </HeadButtons>
            </Link>
            <Link href='/login/LoginWrapper' as='/register'>
              <HeadButtons>
                Join
              </HeadButtons>
            </Link>
          </div>
        }
        {loggedIn &&
          <div>
            <Link href='/login/LoginWrapper' as='/login'>
              <HeadButtons onClick={handleLogout}>
                Log out
              </HeadButtons>
            </Link>
          </div>
        }
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
  transition: transform 0.8s cubic-bezier(0, 0.17, 0.55, 0.82); //out
`


const HeadContainer = styled.div`
  width: 100%;
  height: 50px;
  background-color: ${({ theme }) => theme.lightGrey};
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
  background-color: ${({ theme }) => theme.white};
  
  & a, div, button {
    display: flex;
    align-items: center;
    flex: 1;
    text-decoration: none;
    color: inherit;

    &:hover {
      color: ${({ theme }) => theme.blue};
    }
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