import Nav4Panel from "@/components/nav/Nav4Panel"
import NavShirts from "@/components/nav/NavShirts"
import NavSneakers from "@/components/nav/NavShoes"
import NavShorts from "@/components/nav/NavShorts"
import Link from "next/link"
import { Dispatch, useEffect, useReducer, useState } from "react"
import styled from "styled-components"
import NavMobileDropDown from "../nav/NavMobileDropDown"

export default function HeaderBottom() {

  const [navShirts, setNavShirts] = useState(false) //! TURN INTO REDUCER
  const [ navShoes , setNavShoes ] = useState(false)
  const [navshorts, setNavShorts] = useState(false)
  const [navMobile, setNavMobile] = useState(false)
  const [ navMobileClothe, setNavMobileClothe ] = useState('')
  const [emptyHover, setEmptyHover] = useState(false)

  type NavState = {
    [key: string]: boolean
  }
  const initialNavState = {
    navShirts: false,
    navShoes: false,
    navShorts: false,
    mobileShirts: false,
    mobileShoes: false,
    mobileShorts: false,
  }
  const [navState, dispatch] = useReducer((state: NavState , action: any) => {
    switch (action.type) {
      case 'navShirts':
        return { ...state, navShirts: action.payload }
      case 'navShoes':
        return { ...state, navShoes: action.payload }
      case 'navShorts':
        return { ...state, navshorts: action.payload }
      case 'mobileShirts':
        return { ...state, mobileShirts: action.payload }
      case 'mobileShoes':
        return { ...state, mobileShoes: action.payload }
      case 'mobileShorts':
        return { ...state, mobileShorts: action.payload }
      default:
        return state
    }
  }, initialNavState)
  
  
  let darkenBackground = navShoes || navShirts || navshorts || emptyHover
  
  useEffect(() => {
    if (window.innerWidth < 768) {
      if (navShirts) {
        setNavMobile(true)
        setNavMobileClothe('shirts')
      }
      else if (navShoes) {
        setNavMobile(true)
        setNavMobileClothe('shoes')
      }
      else if (navshorts) {
        setNavMobile(true)
        setNavMobileClothe('shorts')
      }
      else if (!navShirts && !navShoes && !navshorts) {
        setNavMobile(false)
      }
    }
  }, [navShirts, navShoes, navshorts])


  return (
    <ButtonContainer>
      {darkenBackground && <DarkenBackground />}
      
      <Box>
        
      <Tab
        onMouseEnter={() => setNavShirts(true)}
        onMouseLeave={() => setNavShirts(false)}
      >
        <Link href='/filter/[productType]' as='/filter/shirts'><span >Shirts </span></Link> 
      </Tab>
        
      <Tab
        onMouseEnter={() => setNavShoes(true)}
        onMouseLeave={() => setNavShoes(false)}
      > 
        <Link href="/filter/[productType]" as="/filter/shoes"><span>Shoes </span>    </Link>
      </Tab>

      <Tab
        onMouseEnter={() => setNavShorts(true)}
        onMouseLeave={() => setNavShorts(false)}
      >
        <Link href='/filter/[productType]' as='/filter/shorts'><span>Shorts </span></Link>
      </Tab>

      <Tab
              onMouseEnter={() => setEmptyHover(true)}
              onMouseLeave={() => setEmptyHover(false)}>
        <span>Empty</span>    
      </Tab>
      <Tab
              onMouseEnter={() => setEmptyHover(true)}
              onMouseLeave={() => setEmptyHover(false)}>
        <span>Empty</span>    
      </Tab>
      <Tab
              onMouseEnter={() => setEmptyHover(true)}
              onMouseLeave={() => setEmptyHover(false)}>
        <span>Empty</span>    
        </Tab>

        {navShirts && <NavShirts setNavShirts={setNavShirts} />}
        {navshorts && <NavShorts setNavShorts={setNavShorts} />}
        {navShoes && <NavSneakers setNavShoes={setNavShoes} />}
        {emptyHover && <Nav4Panel setEmptyHover={setEmptyHover} />}
        {navMobile ? <NavMobileDropDown setNavMobile={setNavMobile} navMobileClothe={navMobileClothe} /> : false} 

      </Box>
    </ButtonContainer>

  )
}

const ButtonContainer = styled.div`
  position: relative;
  width: 1300px;
  height: 100%;
  display: flex;
  align-items: center;
  z-index: 2;
`
const DarkenBackground = styled.div`
  position: fixed;
  top: 110px;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #00000089;
  z-index: 0;

`

const  Box = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 500px;
  height: 100%;

  @media ${({ theme }) => theme.mobileL} {
    width: 100%;
  }

`
const Tab = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  border: none;
  color: white;

  & > a {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.backgroundSecondary};
    color: ${({ theme }) => theme.text};
  }

  & span {
    font-size: ${({theme}) => theme.fontM}
  }

  & + div {
    font-size: ${({theme}) => theme.fontM}
  }
  & a {
    color: inherit;
    text-decoration: none;
  }
  &:nth-child(4), :nth-child(5), :nth-child(6), :nth-child(7) {
    @media ${({ theme }) => theme.mobileL} {
      display: none;
    }
  }
`