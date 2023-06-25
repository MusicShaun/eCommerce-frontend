import styled from "styled-components"
import SignInOptions from "@/components/SignInOptions"
import { useState } from 'react'
import { SignInPageHead } from "@/lib/head"



export default function LoginWrapper({children}: {children: React.ReactNode}) {


  const [loggingIn, setLoggingIn] = useState(true)

  return (<>
  <SignInPageHead />

    <Wrapper>
      <Header><h1>Shauny's Shop</h1></Header>
      <Box>
        <SignInOptions setLoggingIn={setLoggingIn} />

          {children}
      </Box>
    </Wrapper>
  </>)
}



const Wrapper = styled.div`
  position: absolute;
  top: 60px;
  left: 0;
  width: 100%;
  min-height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: lightgrey;
  z-index: 1001;

  @media ${({ theme }) => theme.mobileL} {
    top: 105px;}
`
const Header = styled.div`
  padding: 64px 0 25px;
  width: 650px;
  display: flex;
  justify-content: center;
  align-items: center;

  & h1 {
    margin: 0;
    font-size: 25px;
    font-weight: 700;
  }

  @media ${({ theme }) => theme.mobileL} {
    width: 100%;
  }
`
const Box = styled.main`
  height: auto;
  width: 650px;
  margin-bottom: 40px;
  background-color: white;

  @media ${({ theme }) => theme.mobileL} {
    width: 100%;
  }
`

