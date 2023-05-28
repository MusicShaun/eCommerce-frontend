import styled from "styled-components"
import Link from "next/link"
import {  useAppSelector } from "lib/hooks/hooks"
import { selectUser } from "@/lib/slices/userSlice"
import Image from "next/image"
import details from '@/public/account_details.png'
import welcome from '@/public/account_welcome.png'
import orders from '@/public/account_orders.png'
import history from '@/public/account_history.png'
import wishlist from '@/public/account_wishlist.png'
import logoutIMG from '@/public/account_logout.png'
import { RootState } from "@/lib/store"
import { logout } from "@/lib/services/handleLogout"

interface IProps {
  open: boolean
}
export default function Sidebar({open}: IProps) {
  
  const userEmail = useAppSelector(state => state.auth.email)
  const user =  useAppSelector((state: RootState) => selectUser(state, userEmail))
  
  function userIsNotNull(check: string | null | undefined): string {
    if (typeof check === 'string') {
      return check
    } 
    return ''
  }


  async function handleLogout() {
    await logout() 
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


      <ContainMenu style={{transform: open ? 'translateX(0px)' : 'translateX(100%)'}}>
      <Stack2 >

      <Tab>
          <Image src={welcome} alt=''  width={20} height={20} />
            <div style={{ borderBottom: '1px solid black' }}>
              ACCOUNT MENU
            </div>
          </Tab>
          
        <Link href='/user/PersonalDetails'>
          <Tab>
            <Image src={details} alt=''  width={20} height={20} />
            <div>Personal Details</div>
          </Tab>
        </Link>

        <Link href='/user/MyOrders' >
          <Tab>
          <Image src={orders} alt='' width={20} height={20} />
          <div>My Orders</div>
            </Tab>
        </Link>

        <Link href='/user/WishList' >
          <Tab>
          <Image src={wishlist} alt=''  width={20} height={20} />
          <div>WishList
            {/* ({wishlist.length}) */}
          </div>
          </Tab>
        </Link>

        <Link href='/user/PurchaseHistory' >
          <Tab>
           <Image src={history} alt=''  width={20} height={20} />
            <div>Puchase History</div>
          </Tab>
        </Link>

        {user ?
          <Tab>
            <Image src={logoutIMG} alt='Log out' width={20} height={20} />
              <div onClick={() => handleLogout()} style={{ cursor: 'pointer' }}>Sign out</div>
          </Tab>
            :
          <Link href='/login/LoginWrapper' as='/login'>
            <Tab>
              <Image src={logoutIMG} alt='Sign in' width={20} height={20} />
              <div style={{ cursor: 'pointer' }}>Sign in</div>
            </Tab>
          </Link>
        }
          

        </Stack2>
        </ContainMenu>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: fit-content;
  flex-direction: column;
  display: none;
  margin-bottom: 5px;
  z-index: 1000;

  @media ${({ theme }) => theme.mobileL} {
    display: flex;
  }
`
const Stack = styled.div`
  display: flex;
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
const ContainMenu = styled.div`
  position: absolute;
  overflow-y: hidden;
  width: 100%;
  height: fit-content;
  top: 132px;
  transition: transform 0.5s cubic-bezier(0.11, 0.64, 0.37, 1.02);

`
const Stack2 = styled.ul`
  width: 100%;
  height: auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 100%));
  grid-template-rows: auto;
  justify-content: center;
  justify-items: center;
  gap: 5px;
  margin: 0;
  margin-bottom: 5px;
  overflow: hidden;
  background-color: ${({theme}) => theme.backgroundSecondary};
  & a {
    width: 100%;

    &:active, :visited, :link {
      text-decoration: none;
      color: inherit;
    }
  }
`
const Tab = styled.li`
  height: 60px;
  background-color: white;
  width: 100%;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  padding-left: 8px;
  font-size: ${({ theme }) => theme.fontM};
  
   &:active {
    background-color: ${({ theme }) => theme.backgroundSecondary};
    box-shadow: inset 3px 3px 3px rgba(0, 0, 0, 0.25);
   }

  @media ${({ theme }) => theme.mobileL} {
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



