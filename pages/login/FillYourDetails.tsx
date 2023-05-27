
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import router from 'next/router'
import { useRegisterMutation } from '@/lib/slices/userSlice'
import PacmanLoader from 'react-spinners/PacmanLoader'
import ErrorWindow from '@/components/modalsAndErrors/ErrorWindow'
import { useAppDispatch, useAppSelector } from 'lib/hooks/hooks'
import {  useUpdateUserMutation } from '@/lib/slices/userSlice'


import awsconfig from '../../src/aws-exports'
import { Amplify, Auth, Hub } from 'aws-amplify'
import LoginLayout from '@/components/layouts/LoginLayout'
import { RootState} from '@/lib/store'
import { selectUser } from '@/lib/slices/userSlice'
import { loggedIn, setAuth } from '@/lib/slices/authSlice'
Amplify.configure({awsconfig})
Auth.configure(awsconfig)




export default function login() {

  const [errorWindow, setErrorWindow] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [register, { isLoading , error}] = useRegisterMutation()
  const focusRef = useRef<HTMLInputElement>(null)

  const userEmail = useAppSelector(state => state.auth.email)
  const cognitoId = useAppSelector(state => state.auth.cognitoId)
  const currentUser =  useAppSelector((state: RootState) => selectUser(state, userEmail))
  const user = currentUser 
  const dispatch = useAppDispatch()
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation()

  useEffect(() => {
    if (focusRef.current) focusRef.current.focus() 
  }, []) 

  useEffect(() => {
    const unsubscribe = Hub.listen("auth", ({ payload: { event, data } }) => {
      switch (event) {
        case "signIn":
          console.log(data)
          break;
      }
    });
    Auth.currentAuthenticatedUser() // EMAIL AND JWT IS USED FOR THE SERVER SIDE AUTH 
    .then(currentUser => (
      dispatch(setAuth(
        currentUser.signInUserSession.accessToken.jwtToken
      )),
      dispatch(loggedIn(true))
      ),
    )
    .catch(() => console.log("Not signed in"));

  return unsubscribe;
}, [])


  async function handleSubmit(e:any ) {
    e.preventDefault()
    const data = new FormData(e.target)

    try {
      const res = await updateUser({
        email: userEmail,
        cognitoId: cognitoId,
        given_name: data.get('first') as string,
        surname: data.get('last') as string,
        dob: data.get('dob') as string,
        gender: handleInterestCheck(e),
      }).unwrap()
      
      router.push('/')
      
    } catch (err: any) {
      setErrorWindow(true)
      if (err.status == 429) setErrorMessage('Too many requests, please try again later')
      else if ('data' in err && err.data.message) setErrorMessage(err.data.message)
      else setErrorMessage(err.error)
      console.log(err)
    }
  }

  function handleInterestCheck(e:any) {
    if (e.target.women.checked) {
      return 'women'
    } else if (e.target.men.checked) {
      return 'men'
    } else return ''
  }


  return (<>
    <LoginLayout>
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

      {errorWindow && error 
        ? <ErrorWindow
          header='Uh Oh!'
          message={errorMessage}
          closeWindow={setErrorWindow} />
        : false
      }

      <Form onSubmit={(e) => handleSubmit(e)}>
        <FieldSet>
          <FieldSetBox>

            <Field>
              <label>FIRST NAME</label>
              <input name='first' autoComplete='name' required/>
            </Field>
            <Field>
              <label>LAST NAME</label>
              <input name='last' autoComplete='surname' required/>
            </Field>

            <Field>
              <label>DATE OF BIRTH</label>
              <input type="date" id="dob" name="dob" required/>
            </Field>
            <Field>
              <label>Mostly interested in</label>
                <RadioField style={{ flexDirection: 'row', padding: '10px 0 0 0 ' }}>
                <input type='radio' name='women'/>  
                <label>Womenswear</label>
                <input type='radio' name='men'/>
                <label>Menswear</label>

                </RadioField>        
            </Field>
          </FieldSetBox>
            
          <FieldSetBox>
            <SubmitBtn >COMPLETE PROFILE</SubmitBtn>
          </FieldSetBox>

          <button onClick={() => router.push('/')}>SKIP</button>
        </FieldSet>
      </Form>
    </FormLogin>

    </LoginLayout>

</>  )
}

const FormLogin = styled.div`
  height: auto;
  padding-bottom: 20px;
`
const Form = styled.form`
  width: 100%;
  max-width: 650px;

  & input, textarea {
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
  }
`
const FieldSet = styled.fieldset`
  display: flex;
  flex-direction: column;
  align-items: center;  
  width: 100%;
  border: none;

  @media ${({ theme }) => theme.mobileL} {
    padding: 0px;
  }
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
  width: 570px;


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
    width: 100vw;
    padding: 0px 10px;
  }
`
const RadioField = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;  
    padding: 0 105px;
    margin-bottom: 19px;
    width: 100%;

  & input {
    height: 30px;
    width: 100px;
    margin:0 20px 0 0;
    
    @media ${({ theme }) => theme.mobileL} {
      margin: 0;
      width: 50px;
    }
  }
  & label {
    text-align: left;
    width: auto;
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
  cursor: pointer; 

  &:active {
    transition: box-shadow 0.1s ease-in-out;
    box-shadow: inset 5px 5px 5px grey;
  }
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