import Link from 'next/link'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import styled from 'styled-components'
import { colors } from '@/config/ThemeConfig'

interface IProps {
  setLoggingIn: Dispatch<SetStateAction<boolean>>
}

export default function SignInOptions({ setLoggingIn }: IProps) {

  const [ underlinerTab, setUnderlinerTab ] = useState(false)

  useEffect(() => {
    if (window.location.href.includes('Register')) {
      setUnderlinerTab(true)
    }
    else {
      setUnderlinerTab(false)
    }
    
  }, [])

  return (
  <SignIn>
    <SignInButtons style={{borderBottom: underlinerTab ? 'none' :`3px solid ${colors.DARK_BLUE}`}}>
    <Link  href='/login'><div  onClick={() => setLoggingIn(true)} style={{borderRight: `2px solid lightgrey`}}>LOGIN</div></Link>
    </SignInButtons>
    <SignInButtons style={{borderBottom: !underlinerTab ? 'none' :`3px solid ${colors.DARK_BLUE}`}}>
     <Link  href='/login/Register'><div onClick={() => setLoggingIn(false)} >SIGN UP</div></Link>
    </SignInButtons>
  </SignIn >
  )
}
const SignIn = styled.div`
  padding: 25px 15px 20px;
  height: 64px;
  display: flex;
  min-height: 111px;
  color: ${({ theme }) => theme.text};
`

const SignInButtons = styled.div`
  padding: 20px 0 17px;
  height: 61px;
  width: 50%;
  border-bottom: 2px solid lightgrey;
  cursor: pointer;
  
  & div {
    display: block;
    text-align: center;
    width: 100%;
    font-weight: 700;
    text-decoration: none;
  }

  & a {
    text-decoration: none;
    color: inherit;
  }
`