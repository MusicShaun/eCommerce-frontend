import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import Image from 'next/image'
import styled from 'styled-components'
import passwordIMG from '@/public/password.png'
import PacmanLoader from 'react-spinners/PacmanLoader'
import { useRegisterMutation } from '@/lib/slices/userSlice'
import ErrorWindow from '@/components/modalsAndErrors/ErrorWindow'
import router from 'next/router';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/hooks';
import { selectUsersEmail, setAuth, setCognitoId } from '@/lib/slices/authSlice';

interface IProps {
  password: string 
  hideVerificationWindow: () => void
}

const VerifyEmail = ({password, hideVerificationWindow}: IProps) => {

  const usersEmail = useAppSelector(selectUsersEmail)
  const dispatch = useAppDispatch()
  const [errorMessage, setErrorMessage] = useState('')
  const [registerUser, { data, isLoading: registerLoading, isError, error: registerError }] = useRegisterMutation()
  const [errorWindow, setErrorWindow] = useState(false)



  // COGNITO EMAIL CODE VERIFICATION
  // USES EMAIL AND COGNITO ID AS BACKEND VERIFICATION
  const handleVerification = async (e: any) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const verificationCode = formData.get('code') as string

    try {
      await Auth.confirmSignUp(usersEmail, verificationCode); // get the string from user input

      const signedInUser = await Auth.signIn(usersEmail, password);
      const accessToken = signedInUser.signInUserSession.accessToken.jwtToken;

      dispatch(setAuth(accessToken))
      dispatch(setCognitoId(signedInUser.attributes.sub))

      // NOW USER IS LOGGED IN, WE CAN CREATE A USER ON MONGO
      registerUser({
        email: usersEmail,
        cognitoId: signedInUser.attributes.sub,
      })

      hideVerificationWindow()
      console.log('SUCCESS:: REROUTING TO DETAILS ');
      router.push('/login/FillYourDetails')
      
    } catch (error: any) { 
      setErrorWindow(true)
      console.log('Error verifying email:', error);
      setErrorMessage(error)
    }
  };



  
  return (
    
     <Wrapper>
        <Image src='https://res.cloudinary.com/dyneqi48f/image/upload/v1680441503/pexels-vincent-gerbouin-2263665_axookb.jpg'
          alt=''
          fill
        sizes='100vw, 100vh'
      />
      {errorWindow && isError 
        ? <ErrorWindow
          header='Uh Oh!'
          message={errorMessage}
          closeWindow={setErrorWindow} />
        : false
      }


      <Box>

        <BorderBreak />
        <Reset>VERIFY PASSWORD</Reset>
        <Image src={passwordIMG} alt='' width={75} />
        <Header><h3>Please check your email <br/> and enter the code below </h3></Header>
        <FormLogin>
          
        <SpinnerContainer >
            <PacmanLoader
              color={'#2d2d2d'}
              size={50}
              loading={registerLoading}
              cssOverride={{zIndex: 9000}}
              speedMultiplier={1.5}
            />
        </SpinnerContainer>
        
        <Form onSubmit={(e) => handleVerification(e)}>
          <FieldSet>
            <FieldSetBox>
              <Field>
                <label htmlFor='code'></label>
                <input name='code'  type='text' id='code' placeholder='enter code here' />
              </Field>
            </FieldSetBox>
          </FieldSet>

          <FieldSetBox>
            <SubmitBtn>VERIFY EMAIL</SubmitBtn>
          </FieldSetBox>
            
        </Form>
      </FormLogin>
  
      </Box>
      </Wrapper>
  
   )
  }
export default VerifyEmail;
  

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
  z-index: 10001;
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