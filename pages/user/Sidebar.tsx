import styled from "styled-components"
import { userData } from '../../userData'
import Link from "next/link"
import router from "next/router"

export default function Sidebar() {
  
  function handleSignout() {
    localStorage.removeItem('userInfo')
    router.push('/', '/', {shallow: true})
  }

  return (
    <Container>
      <Stack
        style={{
        height: '168px', padding: '40px 0'
        }}>
        <Circle>
          <h1>
          {userData.firstName.charAt(0)}
          {userData.lastName.charAt(0)}
          </h1>
        </Circle>
        <Badge>
          <p>Hi, </p>
          <h3>{userData.firstName} {userData.lastName}</h3>
        </Badge>
      </Stack>

      <Stack2>
        <Tab>
          <Icon />
          <Link href='/user/MyAccount' ><div>Welcome</div></Link>
        </Tab>
      </Stack2>

      <Stack2>
        <Tab>
          <Icon />
          <Link  href='/user/PersonelDetails'><div>PersonalDetails</div></Link>
        </Tab>
      </Stack2>

      <Stack2>
        <Tab>
          <Icon />
          <Link href='/user/MyOrders' ><div>MyOrders</div></Link>
        </Tab>

        <Tab>
          <Icon />
          <Link href='/user/WishList' ><div>WishList</div></Link>
        </Tab>

        <Tab>
          <Icon />
          <Link href='/user/PurchaseHistory' ><div>PuchaseHistory</div></Link>
        </Tab>
      </Stack2>

      <Stack2>
        <Tab>
        <Icon />
          <div onClick={handleSignout}>Sign out</div>
        </Tab>
      </Stack2>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  max-width: 280px; 
  display: flex;
  flex-direction: column;
  background-color: white;
`
const Stack = styled.div`
  display: flex;
  border-top: 2px solid ${({theme}) => theme.background};
  border-bottom: 2px solid ${({theme}) => theme.background};
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
  border-top: 2px solid ${({theme}) => theme.background};
  border-bottom: 2px solid ${({theme}) => theme.background};
  margin: 0;
`
const Tab = styled.li`
  height: 60px;
  width: 100%;
  display: flex;
  align-items: center;

  & a, div:active, div:visited, div:link {
    text-decoration: none;
    color: inherit;
  }
`
const Icon = styled.div`
  width: 20px;
  height: 20px;
  background-color: blue;
  margin-right:   20px;
`
