import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import router from 'next/router'
import { useRegisterMutation } from 'lib/userSlice'
import PacmanLoader from 'react-spinners/PacmanLoader'
import ErrorWindow from '@/components/ErrorWindow'
import Cookies from 'js-cookie'

export default function login() {

  // const [errorWindow, setErrorWindow] = useState(false)
  // const [errorMessage, setErrorMessage] = useState('')
  // const [register, { isLoading , error}] = useRegisterMutation()
  // const passwordRef = useRef<HTMLInputElement>(null)
  // const focusRef = useRef<HTMLInputElement>(null)

  // useEffect(() => {
  //   if (focusRef.current) focusRef.current.focus() 
  // }, []) 

  // async function handleSubmit(e:any ) {
  //   e.preventDefault()
  //   const data = new FormData(e.target)
  //   if (data.get('password') !== data.get('confirm_password')) {
  //     passwordRef.current!.value = ''
  //     // passwordRef.current?.setCustomValidity('Passwords do not match')
  //     passwordRef.current?.focus()
  //     alert('Passwords do not match')
  //     return
  //   }
  //   try {
  //     const res = await register({
  //       given_name: data.get('first') as string,
  //       surname: data.get('last') as string,
  //       email: data.get('email') as string,
  //       password: data.get('password') as string,
  //       passwordConfirm: data.get('confirm_password') as string,
  //       dob: data.get('dob') as string,
  //       gender: handleInterestCheck(e),
  //     }).unwrap()


  //     // localStorage.setItem('key', JSON.stringify({...rest}))
  //     router.push('/')
      
  //   } catch (err: any) {
  //     setErrorWindow(true)
  //     if (err.status == 429) setErrorMessage('Too many requests, please try again later')
  //     else if ('data' in err && err.data.message) setErrorMessage(err.data.message)
  //     else setErrorMessage(err.error)
  //     console.log(err)
  //   }
  // }

  // function handleInterestCheck(e:any) {
  //   if (e.target.women.checked) {
  //     return 'women'
  //   } else if (e.target.men.checked) {
  //     return 'men'
  //   } else return ''
  // }


  return (<>
{/*     
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
              <label>EMAIL ADDRESS</label>
              <input ref={focusRef}  name='email' autoComplete='email' required/>
            </Field>
            <Field>
              <label>FIRST NAME</label>
              <input name='first' autoComplete='name' required/>
            </Field>
            <Field>
              <label>LAST NAME</label>
              <input name='last' autoComplete='surname' required/>
            </Field>
            <Field>
              <label>PASSWORD</label>
              <input name='password' autoComplete='new-password' type='password' required/>
            </Field>
            <Field>
              <label>CONFIRM PASSWORD</label>
              <input name='confirm_password' autoComplete='new-password' type='password'  required ref={passwordRef} />
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
            <SubmitBtn >JOIN</SubmitBtn>
          </FieldSetBox>

        </FieldSet>
      </Form>
    </FormLogin>

     */}

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