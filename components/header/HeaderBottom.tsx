import Nav4Panel from "@/components/nav/navMenu/Nav4Panel"
import NavShirts from "@/components/nav/navTabs/NavShirts"
import NavSneakers from "@/components/nav/navTabs/NavShoes"
import NavShorts from "@/components/nav/navTabs/NavShorts"
import Link from "next/link"
import { useReducer, useState } from "react"
import styled from "styled-components"
import NavMobileDropDown from "../nav/navDropdowns/NavMobileDropDown"
import { PayloadAction } from "@reduxjs/toolkit"

export default function HeaderBottom() {

  const [emptyHover, setEmptyHover] = useState(false)
  const [ dropdownName, setDropdownName ] = useState('')

  interface NavState {
    navShirts: boolean
    navShoes: boolean
    navShorts: boolean
    mobileShirts: boolean
    mobileShoes: boolean
    mobileShorts: boolean
  }
  const initialNavState: NavState = {
    navShirts: false,
    navShoes: false,
    navShorts: false,
    mobileShirts: false,
    mobileShoes: false,
    mobileShorts: false,
  }
const [navState, dispatch] = useReducer(
  (state: NavState, action: PayloadAction<boolean>) => {
    switch (action.type) {
      case 'navShirts':
        return { ...state, navShirts: action.payload }
      case 'navShoes':
        return { ...state, navShoes: action.payload }
      case 'navShorts':
        return { ...state, navShorts: action.payload }
      case 'mobileShirts':
        return { ...state, mobileShirts: action.payload }
      case 'mobileShoes':
        return { ...state, mobileShoes: action.payload }
      case 'mobileShorts':
        return { ...state, mobileShorts: action.payload }
      default:
        return state
    }
  },
  initialNavState
)
  const { navShirts, navShoes, navShorts, mobileShirts, mobileShoes, mobileShorts } = navState
  let desktopDarkenBackground = navShoes || navShirts || navShorts || emptyHover
  let mobileDarkenBackground = mobileShirts || mobileShoes || mobileShorts

  // checks page size 
  // if mobile, set dropdown for mobile else desktop dropdown
  function handleEnterNavTab(name: string, value: boolean) {
    if (window.innerWidth > 768) {
      dispatch({ type: `nav${name}`, payload: value })
    } else {
      dispatch({ type: `mobile${name}`, payload: value })
      setDropdownName(`mobile${name}`)
    }
  }

  
  return (
    <ButtonContainer>
      {desktopDarkenBackground  && <DarkenBackground />}
      {mobileDarkenBackground  && <DarkenBackground />}
      
      <Box>
        
      <Tab
        onMouseEnter={() => handleEnterNavTab('Shirts', true)}
        onMouseLeave={() => handleEnterNavTab('Shirts', false)}
      >
        <Link href='/filter/[productType]' as='/filter/shirts'><span >Shirts </span></Link> 
      </Tab>
        
      <Tab
        onMouseEnter={() => handleEnterNavTab('Shoes', true)}
        onMouseLeave={() => handleEnterNavTab('Shoes', false)}
      > 
        <Link href="/filter/[productType]" as="/filter/shoes"><span>Shoes </span>    </Link>
      </Tab>

      <Tab
        onMouseEnter={() => handleEnterNavTab('Shorts', true)}
        onMouseLeave={() => handleEnterNavTab('Shorts', false)}
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

        {navState.navShirts && <NavShirts handleEnterNavTab={handleEnterNavTab} />}
        {navState.navShorts && <NavShorts  handleEnterNavTab={handleEnterNavTab}/>}
        {navState.navShoes && <NavSneakers handleEnterNavTab={handleEnterNavTab} />}
        
        {emptyHover && <Nav4Panel setEmptyHover={setEmptyHover} />}

        {mobileDarkenBackground ? <NavMobileDropDown
          handleEnterNavTab={handleEnterNavTab}
          navMobileClothe={dropdownName} /> : false
        } 

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
  color: ${({ theme }) => theme.text};

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