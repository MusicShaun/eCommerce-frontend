import Nav4Panel from "@/components/nav/Nav4Panel"
import NavShirts from "@/components/nav/NavShirts"
import NavSneakers from "@/components/nav/NavShoes"
import NavShorts from "@/components/nav/NavShorts"
import { useState } from "react"
import styled from "styled-components"

export default function HeaderBottom() {

  const [navShirts, setNavShirts] = useState(false)
  const [ navShoes , setNavShoes ] = useState(false)
  const [ navshorts, setNavShorts ] = useState(false)
  const [emptyHover, setEmptyHover] = useState(false)
  
  let darkenBackground = navShoes || navShirts || navshorts || emptyHover
  

  return (
    <ButtonContainer>
      {darkenBackground && <DarkenBackground />}
      
      <Box>

      <Tab
        onMouseEnter={() => setNavShirts(true)}
        onMouseLeave={() => setNavShirts(false)}
      >
          <span >Shirts </span>    
      </Tab>
      {navShirts && <NavShirts setNavShirts={setNavShirts} />}

      <Tab
        onMouseEnter={() => setNavShoes(true)}
        onMouseLeave={() => setNavShoes(false)}
      > 
          <span>Shoes </span>    
      </Tab>
      {navShoes && <NavSneakers setNavShoes={setNavShoes} />}

      <Tab
        onMouseEnter={() => setNavShirts(true)}
        onMouseLeave={() => setNavShirts(false)}
      >
          <span>Shorts </span>    
      </Tab>
      {navshorts && <NavShorts setNavShorts={setNavShorts} />}

      {emptyHover && <Nav4Panel setEmptyHover={setEmptyHover} />}
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
`
const Tab = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
  border: none;

  & span {
    color: white;
    font-size: ${({theme}) => theme.fontM}
  }

  & + div {
    font-size: ${({theme}) => theme.fontM}
  }
`