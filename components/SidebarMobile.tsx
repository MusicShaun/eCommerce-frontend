import styled from "styled-components"
import Link from "next/link"
import router from "next/router"
import { apiSlice } from "lib/apiSlice"
import { useAppDispatch, useAppSelector } from "lib/hooks/hooks"
import { selectCurrentUser } from "lib/userSlice"
import Image from "next/image"
import details from '@/images/account_details.png'
import welcome from '@/images/account_welcome.png'
import orders from '@/images/account_orders.png'
import history from '@/images/account_history.png'
import logout from '@/images/account_logout.png'
import wishlist from '@/images/account_wishlist.png'


export default function Sidebar() {
  
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectCurrentUser)

  function handleLogout() {
    document.cookie =  "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    localStorage.removeItem('key')
    dispatch(apiSlice.util.resetApiState())
    router.push('/login/LoginWrapper', '/login', {shallow: true})
  }


  function userIsNotNull(check: string | null | undefined): string {
    if (typeof check === 'string') {
      return check
    } 
    return ''
  }

  return (
    <Container>
      <Stack
        style={{
        height: '128px', padding: '20px 0'
        }}>
        <Circle>
          <h1>
          {userIsNotNull(user?.given_name).charAt(0)}
            {userIsNotNull(user?.surname).charAt(0)}
            {!user ? '?' : false}
          </h1>
        </Circle>
        <Badge>
          <p>Hi, </p>
          <h3>
            {userIsNotNull(user?.given_name)}
            {userIsNotNull(user?.surname)}
            {!user ? 'guest' : false}

          </h3>
          {!user ? <p>Please sign in </p> : false}

        </Badge>
      </Stack>

      <Stack2 > //! TURN THESE STACKS INTO GRID MODE. DUMB DOING IT THIS WAY 
        <Tab>
          <Image src={welcome} alt=''  width={20} height={20} />
          <Link href='/user/MyAccount' ><div>Welcome</div></Link>
        </Tab>

        <Tab>
          <Image src={details} alt=''  width={20} height={20} />
          <Link  href='/user/PersonalDetails'><div>Personal Details</div></Link>
        </Tab>

        <Tab>
          <Image src={orders} alt='' width={20} height={20} />
          <Link href='/user/MyOrders' ><div>My Orders</div></Link>
        </Tab>
        </Stack2>

      <Stack2>
        <Tab>
          <Image src={wishlist} alt=''  width={20} height={20} />
          <Link href='/user/WishList' ><div>WishList
            {/* ({wishlist.length}) */}
          </div></Link>
        </Tab>

        <Tab>
          <Image src={history} alt=''  width={20} height={20} />
          <Link href='/user/PurchaseHistory' ><div>Puchase History</div></Link>
        </Tab>

        <Tab>
          <Image src={logout} alt=''  width={20} height={20} />
          <div onClick={handleLogout} style={{cursor: 'pointer'}}>Sign out</div>
        </Tab>
      </Stack2>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: fit-content;
  flex-direction: column;
  background-color: white;
  display: none;
  margin-bottom: 5px;

  @media ${({ theme }) => theme.mobileL} {
    display: flex;
  }
`
const Stack = styled.div`
  display: flex;
  border-top: 2px solid ${({theme}) => theme.backgroundSecondary};
  border-bottom: 2px solid ${({theme}) => theme.backgroundSecondary};
`
const Badge = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  & > * {
    margin: 5px 0;
  }

`
const Circle = styled.div`
  background-color: black;
  border-radius: 50%;
  width: 88px;
  height: 88px;
  color: white;

  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: -12px;
  margin-right: 10px;
`
const Stack2 = styled.ul`
  display: flex;

  border-top: 2px solid ${({ theme }) => theme.backgroundSecondary};
  border-bottom: 2px solid ${({theme}) => theme.backgroundSecondary};
  margin: 0;

  & li:nth-child(2) {
    border-right: 2px solid ${({theme}) => theme.backgroundSecondary};
    border-left: 2px solid ${({theme}) => theme.backgroundSecondary};
  }
`
const Tab = styled.li`
  height: 60px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 8px;
  border-bottom: 1px solid ${({ theme }) => theme.backgroundSecondary};
  font-size: ${({ theme }) => theme.fontM};

   &:active {
    background-color: ${({ theme }) => theme.backgroundSecondary};
    box-shadow: inset 3px 3px 3px rgba(0, 0, 0, 0.25);
   }

  @media ${({ theme }) => theme.mobileL} {
    & a {
          width: fit-content;
        }
      }

  & div {
    margin-left: 8px;
  }
  & img {
    cursor: pointer;
  }
  & a, div:active, div:visited, div:link {
    text-decoration: none;
    color: inherit;
  }
`



