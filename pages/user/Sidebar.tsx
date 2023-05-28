import styled from "styled-components"
import Link from "next/link"
import router from "next/router"
import { apiSlice } from "@/lib/slices/apiSlice"
import { useAppDispatch, useAppSelector } from "lib/hooks/hooks"
import { selectUser } from "@/lib/slices/userSlice"
import Image from "next/image"
import details from '@/public/account_details.png'
import welcome from '@/public/account_welcome.png'
import orders from '@/public/account_orders.png'
import history from '@/public/account_history.png'
import logoutIMG from '@/public/account_logout.png'
import wishlist from '@/public/account_wishlist.png'
import { RootState } from "@/lib/store"
import { logout } from "@/lib/services/handleLogout"


export default function Sidebar() {
  
  const dispatch = useAppDispatch()
  const userEmail = useAppSelector(state => state.auth.email)
  const currentUser =  useAppSelector((state: RootState) => selectUser(state, userEmail))
  const user = currentUser


  async function handleLogout() {
    await logout()
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
        height: '168px', padding: '40px 0'
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

      <Stack2 >
        <Tab>
          <Image src={welcome} alt=''  width={20} height={20} />
          <Link href='/user/MyAccount' ><div>Welcome</div></Link>
        </Tab>
      </Stack2>

      <Stack2>
        <Tab>
          <Image src={details} alt=''  width={20} height={20} />
          <Link  href='/user/PersonalDetails'><div>Personal Details</div></Link>
        </Tab>
      </Stack2>

      <Stack2>
        <Tab>
          <Image src={orders} alt='' width={20} height={20} />
          <Link href='/user/MyOrders' ><div>My Orders</div></Link>
        </Tab>

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
      </Stack2>

      <Stack2>
        <Tab>
          <Image src={logoutIMG} alt=''  width={20} height={20} />
          <div onClick={() => handleLogout()} style={{cursor: 'pointer'}}>Sign out</div>
        </Tab>
      </Stack2>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: fit-content;
  max-width: 280px; 
  display: flex;
  flex-direction: column;
  background-color: white;
  margin-right: 10px;

  @media ${({ theme }) => theme.tablet} {
    max-width: 240px; 
  }
  @media ${({ theme }) => theme.mobileL} {
    display: none;
  }
`
const Stack = styled.div`
  display: flex;
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
  flex-direction: column;
  border-top: 2px solid ${({theme}) => theme.backgroundSecondary};
  border-bottom: 2px solid ${({theme}) => theme.backgroundSecondary};
  margin: 0;
`
const Tab = styled.li`
  height: 60px;
  width: 100%;
  display: flex;
  align-items: center;
  padding-left: 20px;
  border-bottom: 1px solid ${({theme}) => theme.backgroundSecondary};

  @media ${({ theme }) => theme.mobileL} {
    & a {
          width: 100%;
        }
      }

  & div {
    margin-left: 20px;
  }
  & img {
    cursor: pointer;
  }
  & a, div:active, div:visited, div:link {
    text-decoration: none;
    color: inherit;
  }
`



