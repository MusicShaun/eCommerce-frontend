import React, { SyntheticEvent, useEffect } from 'react'
import styled from 'styled-components'
import InfoCenter from '../../components/InfoCenter'
import router from 'next/router'
import { useAppDispatch, useAppSelector } from 'lib/hooks/hooks'
import { useLoginMutation } from 'lib/userSlice'
import { selectCurrentUser } from 'lib/authSlice'
import PacmanLoader from 'react-spinners/PacmanLoader'
import Link from 'next/link'

export default function login() {

  const dispatch = useAppDispatch()

  // Check if token in localStorage has expired. If not, redirect to home
  // useEffect(() => {
  //   const cached = localStorage.getItem('key')
  //   if (cached) {
  //     const { expires_at } = JSON.parse(cached)
  // CHECK IF THE TOKEN IS EMPOTY FIRST
  //     if (Date.now() < expires_at) {
  //       router.push('/')
  //     }
  //   }
  // }, [])


  const [login, {isLoading}] = useLoginMutation()

  // Submit login form // Set localStorage // push user to state 
  async function handleSubmit(e: any) {
    e.preventDefault()
    const formData = new FormData(e.target)

    try {
      const data = await login({
        email: formData.get('email') as string,
        password: formData.get('password') as string
      }).unwrap()
      localStorage.setItem('key', JSON.stringify(data))
      router.push('/')
      
    } catch (err) {
      console.log(err)
      alert('Invalid email or password')
    }
  }



  return (<>
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
              <input name='email'  type='email' id='email' autoComplete='email username' />
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

    <InfoCenter />

</>  )
}

const FormLogin = styled.div`
  padding: 40px;
  height: auto;
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
  }
  & label {
    text-align: left;
    width: 100%;
    font-weight: 700;
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
  border: 3px solid red;
  display: flex;
  justify-content: center;
  align-items: center;
`