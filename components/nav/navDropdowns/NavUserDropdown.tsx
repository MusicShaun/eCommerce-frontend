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
      </HeadContainer>

      <BodyContainer>
        <div>
          <h3>Account</h3>
          <Link href='/user/MyAccount' ><div>My Account</div></Link>
          <Link href='/user/PersonalDetails' ><div>Personal Details</div></Link>
        </div>
        <div>
          <h3>Shopping</h3>
          <Link href='/user/MyOrders' ><div>My Orders</div></Link>
          <Link href='/user/PurchaseHistory' ><div>Purchase History</div></Link>
        </div>

        {!isAuthenticated ? 
          <div>
            <Link href='/login' as='/login'>SIGN IN</Link>
            <Link href='/login/LoginWrapper' as='/register'>JOIN</Link>
          </div>
          : 
          <div>
            <h3 onClick={() => handleLogout()}>Log out</h3>
          </div>
        }


      </BodyContainer>

    </Container>
  )
}


const Container = styled.div`
  position: absolute;
  width: 100%;
  height: fit-content;
  background-color: ${({ theme }) => theme.background};
  z-index: 1;
  transform: translateY(-400px);
  transition: transform 0.8s cubic-bezier(0, 0.17, 0.55, 0.82); //out
  border-radius: 10px;
`

const HeadContainer = styled.div`
  width: 100%;
  height: 50px;
  background-color: ${({ theme }) => theme.lightGrey};
`

const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100% - 50px);
  background-color: ${({ theme }) => theme.white};
  border-radius: 10px;
  
  & > div {
    padding: 0.5rem;
    border-bottom: 1px solid ${({ theme }) => theme.lightGrey};
    &:last-child {
      border-bottom: none;
    }
  }
  &  div h3 {
    font-weight: 500;
    font-size: 1.1rem;
    line-height: 1.5rem;
    color: black;

    &:last-child {
      color: ${({ theme }) => theme.mediumGrey};
      font-size: 0.85rem;
      &:hover {
      color: ${({ theme }) => theme.headerMiddle};
      text-decoration: underline;
    }
    }
  }
  & a , span{
    display: flex;
    align-items: center;
    text-decoration: none;
    color: ${({ theme }) => theme.mediumGrey};
    height: 32px;
    font-size: 0.85rem;

    &:hover {
      color: ${({ theme }) => theme.headerMiddle};
      text-decoration: underline;
    }
    &:active {
      box-shadow: inset 3px 3px 2px ${({theme}) => theme.headerMiddle};
      background-color: ${({ theme }) => theme.white}
    }
  }
  
`
