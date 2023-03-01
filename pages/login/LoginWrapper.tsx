import styled from "styled-components"
import Login from "./Login"
import Register from "./Register"
import { useState } from "react"
import SignInOptions from "./SignInOptions"


export default function LoginWrapper() {

  const [loggingIn, setLoggingIn ] = useState(true)

  return (
    <Wrapper>
      <Header><h1>ASOS</h1></Header>
      <Box>
      <SignInOptions setLoggingIn={setLoggingIn} />
        {loggingIn ?
          <Login />
          : <Register />
        }
      </Box>
    </Wrapper>
  )
}



const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: lightgrey;
  z-index: 1001;
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
`
const Box = styled.main`
  height: auto;
  width: 650px;
  margin-bottom: 40px;
  background-color: white;
`

