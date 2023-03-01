import React, { SyntheticEvent } from 'react'
import styled from 'styled-components'
import InfoCenter from './InfoCenter'
import { useLoginUserMutation } from 'lib/userSlice'
import router from 'next/router'

export default function login() {

  const [loginUser, { isLoading }] = useLoginUserMutation()

  async function handleSubmit(e: any) {
    e.preventDefault()
    const data = new FormData(e.target)

    try {
      await loginUser({
        email: data.get('email') as string,
        password: data.get('password') as string
      }).unwrap()
      router.push('/')
    } catch (err) {
      console.log(err)
    }
  }



  return (<>
    <FormLogin>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <FieldSet>
          <FieldSetBox>
            <Field>
              <label htmlFor='email'>EMAIL ADDRESS</label>
              <input name='email'  type='email' id='email' autoComplete='email username'/>
            </Field>
            <Field>
              <label htmlFor='password'>PASSWORD</label>
              <input name='password' type='text' id='password' autoComplete='password'/>
            </Field>
          </FieldSetBox>
          <FieldSetBox>
            <SubmitBtn>SIGN IN</SubmitBtn>
          </FieldSetBox>
          <FieldSetBox>
            <ForgotPassword>Forgot password?</ForgotPassword>
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
const ForgotPassword = styled.a`
  margin-top: 22px;
`