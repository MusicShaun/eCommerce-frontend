import styled from "styled-components"
import Link from "next/link"
import {  useAppDispatch, useAppSelector } from "lib/hooks/hooks"
import { selectUser } from "@/lib/slices/userSlice"
import Image from "next/image"
import logoutIMG from '@/public/account_logout.webp'
import { RootState } from "@/lib/store"
import { logout } from "@/lib/services/handleLogout"
import { stack2Data } from "./sidebarArray"
interface IProps {
  isOpen: boolean;
}

export default function Sidebar({isOpen}: IProps) {
  
  const dispatch = useAppDispatch()
  const userEmail = useAppSelector(state => state.auth.email)
  const currentUser =  useAppSelector((state: RootState) => selectUser(state, userEmail))
  const user = currentUser


  async function handleLogout() {
    await logout({dispatch})
  }

  function userIsNotNull(check: string | null | undefined): string {
    if (typeof check === 'string') {
      return check
    } 
    return ''
  }

  const showMenu = isOpen ?
    { left: '0'} :
    { left: '110%' }
    

  // map over each array element in the stack2Data array then return a div with the image and link
  const accountBtns = stack2Data.map((item, index) => (
    <Stack2 key={'stack' + index}>
      {item.map(({ img, alt, link, label }, index) => (
        <Tab key={'tab' + index}>
          <Image src={img} alt={alt} width={20} height={20} />
          <Link href={link}>
            <div>{label}</div>
          </Link>
        </Tab>
      ))}
    </Stack2>
  ));

  

  return (
    <Container style={{...showMenu}}> 
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

      {accountBtns}

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
  display: none;

  @media ${({ theme }) => theme.mobileL} {
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    background-color: white;
    margin-right: 10px;
    transition: left 0.3s ease-in-out;
    max-width: 100%;
    margin: 0;
    position: absolute;
    top: 0px;
    left: 0;
    z-index: 10;

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
  background-color: ${({theme}) => theme.text};
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

