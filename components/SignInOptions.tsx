import Link from 'next/link'
import { Dispatch, SetStateAction } from 'react'
import styled from 'styled-components'

interface IProps {
  setLoggingIn: Dispatch<SetStateAction<boolean>>
}

export default function SignInOptions({ setLoggingIn }: IProps) {



  return (
  <SignIn>
    <SignInButtons>
      <div  onClick={() => setLoggingIn(true)} style={{borderRight: `2px solid lightgrey`}}>LOGIN</div>
    </SignInButtons>
    <SignInButtons>
    <div onClick={() => setLoggingIn(false)}>SIGN UP</div>
    </SignInButtons>
  </SignIn >
  )
}
const SignIn = styled.div`
  padding: 25px 15px 20px;
  height: 64px;
  display: flex;
  min-height: 111px;
`

const SignInButtons = styled.div`
  padding: 20px 0 17px;
  height: 61px;
  width: 50%;
  border-bottom: 2px solid lightgrey;

  & div {
    display: block;
    text-align: center;
    width: 100%;
    font-weight: 700;
    color: black;
    text-decoration: none;
  }
`