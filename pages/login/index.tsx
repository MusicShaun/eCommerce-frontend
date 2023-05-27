import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import AuthOOptions from '../../components/AuthOOptions'
import router from 'next/router'
import PacmanLoader from 'react-spinners/PacmanLoader'
import Link from 'next/link'
import Head from 'next/head'


import awsconfig from '../../src/aws-exports'
import { Amplify, Auth, Hub } from 'aws-amplify'
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth'

import LoginLayout from '@/components/layouts/LoginLayout'
import { setAuth, setEmailOnLogin } from '@/lib/slices/authSlice'
import { useAppDispatch } from '@/lib/hooks/hooks'





export default function login() {

  const focusRef = useRef<HTMLInputElement>(null)
  const [isLoading, setIsLoading ] = useState(false)
  const dispatch = useAppDispatch()
  
  useEffect(() => {
    if (focusRef.current) focusRef.current.focus()
  }, [])
  


  // Submit login form 
  async function handleSubmit(e: any) {
    e.preventDefault()
    setIsLoading(true)
    const formData = new FormData(e.target)

    try { // LOGIN 
    
      const signedInUser = await Auth.signIn(
          formData.get('email') as string,
          formData.get('password') as string
      );
      const accessToken = signedInUser.signInUserSession.accessToken.jwtToken;
      console.log(accessToken)

      dispatch(setEmailOnLogin(formData.get('email') as string))
      dispatch(setAuth(accessToken))

      console.log('SUCCESS:: REROUTING TO HOME ');
      
      router.push('/')
      
    } catch (err) {
      console.log(err)
      alert('Invalid email or password')
      setIsLoading(false)
    } finally {
      setIsLoading(false)
    }
  }


  return (<>
    <LoginLayout>
    <Head>
      <title>Login</title>
    </Head>
    <FormLogin>
      <SpinnerContainer style={{display: isLoading ? 'flex' : 'none'}}>
          <PacmanLoader
            color={'#2d2d2d'}
            size={50}
            loading={isLoading}
            cssOverride={{zIndex: 9000}}
            speedMultiplier={1.5}
          />
        </SpinnerContainer>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <FieldSet>
          <FieldSetBox>
            <Field>
              <label htmlFor='email'>EMAIL ADDRESS</label>
              <input ref={focusRef} name='email'  type='email' id='email' autoComplete='email username' />
            </Field>
            <Field>
              <label htmlFor='password'>PASSWORD</label>
              <input name='password' type='password' id='password' autoComplete='password' />
            </Field>
          </FieldSetBox>
          <FieldSetBox>
            <SubmitBtn>SIGN IN</SubmitBtn>
          </FieldSetBox>
          <FieldSetBox>
            <Link href='/login/ForgotPassword' as='/forgotpassword'><ForgotPassword>Forgot password?</ForgotPassword></Link>
          </FieldSetBox>
        </FieldSet>
      </Form>
    </FormLogin>

    <AuthOOptions />
    </LoginLayout>
</>  )
}

const FormLogin = styled.div`
  padding: 40px;
  height: auto;

  & input, textarea {
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
  }
`
const Form = styled.form`
  width: 100%;
`
const FieldSet = styled.fieldset`
  display: flex;
  flex-direction: column;
  align-items: center;  
  width: 100%;
  border: none;
`
const FieldSetBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;  
  width: 100%;

  & > a {
    text-decoration: none;

    &:hover {
      font-size: ${({ theme }) => theme.fontM};
    }
  }
`
const Field = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;  
  padding: 0 105px;
  margin-bottom: 19px;
  width: 100%;

  & input {
    height: 50px;
    width: 100%;
    padding-left: 10px;
  }
  & label {
    text-align: left;
    width: 100%;
    font-weight: 700;
  }

  @media ${({ theme }) => theme.mobileL} {
    padding: 0px;
  }
`
const SubmitBtn = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;  
  justify-content: center;
  width: 330px;
  height: 45px;
  background-color: black;
  color: white;
  font-weight: 700;

  &:hover {
    cursor: pointer;
  }
  @media ${({ theme }) => theme.mobileL} {
    width: 100%;
  }
`
const ForgotPassword = styled.div`
  margin-top: 22px;
  color: black;
  text-decoration: none;
  
`
const SpinnerContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9000;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.446);
  display: flex;
  justify-content: center;
  align-items: center;
`

