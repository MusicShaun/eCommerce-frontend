import styled from "styled-components"
import SignInOptions from "@/components/SignInOptions"
import { useState } from 'react'
import { SignInPageHead } from "@/lib/head"
import Image from 'next/image';
import logo from '../../public/logo3.png'

export default function LoginWrapper({children}: {children: React.ReactNode}) {


  const [loggingIn, setLoggingIn] = useState(true)

  return (<>
  <SignInPageHead />

    <Wrapper>
      <Header>
        <Image src={logo} alt="Shaunys shop logo"
        
        />
      </Header>
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
  background-color: ${({ theme }) => theme.lightGrey};
  z-index: 99;
  color: ${({ theme }) => theme.text};

  @media ${({ theme }) => theme.mobileL} {
    }
`
const Header = styled.div`
  padding: 85px 0 25px;
  width: 650px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;

  & h1 {
    margin: 0;
    font-size: 25px;
    font-weight: 700;
  }
  & img {
    width: 400px;
    object-fit: contain;
  }

  @media ${({ theme }) => theme.mobileL} {
    width: 100%;
    padding: 40px 0px;
    height: 100px;
    overflow: hidden;

    & img {
    width: 300px;
    }
  }
`
const Box = styled.main`
  height: auto;
  width: 650px;
  margin-bottom: 40px;
  background-color: white;
  color: ${({ theme }) => theme.text};


  @media ${({ theme }) => theme.mobileL} {
    width: 100%;


  }


`

