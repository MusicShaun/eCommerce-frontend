import Link from 'next/link'
import styled from 'styled-components'
import {  useAppDispatch, useAppSelector } from 'lib/hooks/hooks'
import { selectIsAuthenticated} from '@/lib/slices/authSlice'
import { logout } from '@/lib/services/handleLogout'
import { colors } from '@/config/ThemeConfig'


export default function NavUserDropdown() {

  const dispatch = useAppDispatch()
  const isAuthenticated = useAppSelector(selectIsAuthenticated)

  async function handleLogout() {
    await logout({dispatch})
  }
  



  return (
    <Container >
      <HeadContainer>
        {!isAuthenticated ? 
          <div>
            <Link href='/login' as='/login'>
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
          : 
          <div>
            <HeadButtons onClick={() => handleLogout()}>
              Log out
            </HeadButtons>
        </div>
        }

        <XContainer>X</XContainer>
      </HeadContainer>

      <BodyContainer>
        <Link href='/user/MyAccount' ><div>My Account</div></Link>
        <Link href='/user/PersonalDetails' ><div>Personal Details</div></Link>
        <Link href='/user/MyOrders' ><div>My Orders</div></Link>
        <Link href='/user/PurchaseHistory' ><div>Purchase History</div></Link>
   
      </BodyContainer>

    </Container>
  )
}


const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 260px;
  background-color: ${({ theme }) => theme.background};
  z-index: 1;
  transform: translateY(-400px);
  transition: transform 0.8s cubic-bezier(0, 0.17, 0.55, 0.82); //out

  @media ${({ theme }) => theme.mobileS} {
    width: 100%;
  }
`


const HeadContainer = styled.div`
  width: 100%;
  height: 50px;
  background-color: ${({ theme }) => theme.lightBlue};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px;

  & > div{
    height: 100%;
  }
`
const HeadButtons = styled.button`
  background-color: transparent;
  border: none;
  padding: 0 10px;
  height: 100%;
  min-width: 60px;
  
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
    height: 100%;

    &:hover {
      color: ${({ theme }) => theme.blue};
    }
  }
  & div, button {
    padding-left: 20px;
    border-bottom: 1px solid ${({ theme }) => theme.lightBlue};

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