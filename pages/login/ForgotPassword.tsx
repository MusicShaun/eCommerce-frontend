
// Write a component for a user who has forgotten their password 
// This component should have a form with an input for the user's email address
// When the user submits the form, the component should send a request to the server to reset the user's password
// The server should send an email to the user with a link to reset their password
// The user should be able to click the link in the email and be taken to a page where they can enter a new password
// When the user submits the form, the component should send a request to the server to update the user's password
// The server should update the user's password in the database
// The user should be redirected to the login page
// The user should be able to log in with their new password

import Image from 'next/image'
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from 'lib/hooks/hooks'
import password from '@/images/password.png'
import PacmanLoader from 'react-spinners/PacmanLoader'
import { useForgotPasswordMutation } from 'lib/userSlice'
import ErrorWindow from '@/components/ErrorWindow'
import { useState } from 'react'

export default function ForgotPassword() {

  const [errorWindow, setErrorWindow] = useState(false)
  const [successWindow, setSuccessWindow] = useState(false)
  const [forgotPassword, {isLoading, error} ] = useForgotPasswordMutation()
  const [errorMessage, setErrorMessage] = useState('')

  // Submit login form // Set localStorage // push user to state 
  async function handleSubmit(e: any) {
    e.preventDefault()
    const formData = new FormData(e.target)
    const email = formData.get('email')
    try {
      setSuccessWindow(true)
      const res = await forgotPassword({ email: email }).unwrap()
      console.log(res)
    } catch (err: any) {
      setErrorMessage(err.data.message)
      console.log(err)
      setErrorWindow(true)
    }
    
  }
  

  
  return (
     <Wrapper>
        <Image src='https://res.cloudinary.com/dyneqi48f/image/upload/v1680441503/pexels-vincent-gerbouin-2263665_axookb.jpg'
          alt=''
          fill
        sizes='100vw, 100vh'
      />
      {errorWindow && error 
        ? <ErrorWindow
          header='Uh Oh!'
          message={errorMessage}
          closeWindow={setErrorWindow} />
        : false
      }
      {successWindow 
        ? <ErrorWindow
          header='This wont take long!'
          message='Instructions have been sent to your email!'
          closeWindow={setSuccessWindow} />
        : false
      }

      <Box>

        <BorderBreak />
        <Reset>RESET PASSWORD</Reset>
        <Image src={password} alt='' width={75} />
        <Header><h3>Please enter your email address  and <br/> instructions will be sent to you. </h3></Header>
        <FormLogin>
          
        <SpinnerContainer >
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
                <label htmlFor='email'></label>
                <input name='email'  type='email' id='email' autoComplete='email username' placeholder='john@example.com' />
              </Field>
            </FieldSetBox>
          </FieldSet>

          <FieldSetBox>
            <SubmitBtn>ENTER</SubmitBtn>
          </FieldSetBox>
            
        </Form>
      </FormLogin>
  
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
justify-content: center;
flex-direction: column;
background-color: lightgrey;
z-index: 1001;
`
const Header = styled.div`
width: 650px;
display: flex;
justify-content: center;
align-items: center;
transform: translateX(-19px);

  & h3 {
    white-space: pre-line;
    margin: 0;
    padding: 0;
    padding-top: 20px;
    font-size: ${({ theme }) => theme.fontML};
    font-weight: 500;
    color: ${({ theme }) => theme.headerTop};
  }
`
const Box = styled.main`
height: 400px;
width: 500px;
background-color: white;
transform: translateY(-10%);
border: 1px solid ${({ theme }) => theme.headerMiddle};
border-radius: 10px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`
const FormLogin = styled.div`
  padding: 5px;
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
  color: ${({ theme }) => theme.headerTop};

  & input {
    height: 50px;
    width: 330px;
    border: 1px solid ${({ theme }) => theme.headerMiddle};
    border-radius: 10px;
    padding-left: 10px;
    font-size: ${({ theme }) => theme.fontML};
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
  height: 50px;
  background-color: ${({ theme }) => theme.headerTop};
  color: white;
  font-weight: 700;
  border-radius: 10px;

  &:hover {
    cursor: pointer;
  }
`
const Reset = styled.div`
  position: absolute;
  top: 0%;
  left: 12px;
  transform: translate(3%, -55%);
  z-index: 2;
  color: ${({ theme }) => theme.headerTop};
  /* border: 1px solid ${({ theme }) => theme.lightGrey}; */
  border-radius: 10px;
  padding: 2px 4px;
`
const BorderBreak = styled.div`
  position: absolute;
  top: -1px;
  left: 13px;
  width: 153px;
  height: 10px;
  background-color: white;
  z-index: 0;
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
  display: none;
`