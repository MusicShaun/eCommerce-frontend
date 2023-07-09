import { useAppDispatch, useAppSelector } from '@/lib/hooks/hooks'
import { selectUser } from '@/lib/slices/userSlice'

import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { RootState } from '@/lib/store'

import router from 'next/router'
import { sendOrder } from '@/lib/slices/orderSlice'


function UserDetails() {

  const userEmail = useAppSelector(state => state.auth.email)     
  const user =  useAppSelector((state: RootState) => selectUser(state, userEmail))
  const dispatch = useAppDispatch()

  async function handleUpdateOrder(e: any) {
    e.preventDefault()
    // get form data
    const formData = new FormData(e.target)
    const { given_name, surname, email, dob } = Object.fromEntries(formData.entries())
    const { address, city, postal_code, country } = Object.fromEntries(formData.entries())
    const { cart: cartOrder } = user

    // if all fields arent filled in then return
    if (given_name == '' || surname == '' || email == '' || dob == '' || address == ''
      || city == '' || postal_code == "" || country == "" ) return alert('Please fill in all fields')
    
    try {
      const res = await dispatch(sendOrder({
          userDetails: {
            given_name: given_name.toString(),
            surname: surname.toString(),
            email: email.toString(),
            dob: dob.toString(),
            cognitoId: user.cognitoId
          },
          shippingAddress: {
            address: address.toString(),
            city: city.toString(),
            postal_code: postal_code.toString(),
            country: country.toString()
          },
          orderItems: cartOrder
      })
      )
      router.push('/checkout/Payment')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <> 
      

    <Container>
      <Header>
        <h2>FILL IN YOUR DETAILS</h2>
        <p>{"("}Fill in the boxes below before proceeding to payment window{")"}</p>
      </Header>
      <FormLogin>
        <Form onSubmit={handleUpdateOrder}>
          <FieldSet>
            <FieldSetBox>
              <Field>
                <label htmlFor='email' >EMAIL ADDRESS</label>
                  <input id='email' type='email' name='email'  />
              </Field>
              <Field>
                <label htmlFor='given_name'>FIRST NAME</label>
                  <input id='given_name' name='given_name' />
              </Field>
              <Field>
                <label htmlFor='surname' >LAST NAME</label>
                <input id='surname' name='surname' />
              </Field>
              <Field>
                <label htmlFor='dob' >DATE OF BIRTH</label>
                <input type="date" id="dob" name="dob" />
              </Field>

              </FieldSetBox>
              <Header>
              <h2>DELIVERY INFO</h2>
            </Header>
            <FieldSetBox>
              <Field>
                  <label htmlFor='address' >DELIVERY ADDRESS</label>
                  <input id='address' name='address' />
                </Field>
                <Field>
                  <label htmlFor='city' >CITY</label>
                  <input id='city' name='city' />
                </Field>
                <Field>
                  <label htmlFor='postal_code' >POSTAL CODE</label>
                  <input id='postal_code' name='postal_code' />
                </Field>
                <Field>
                  <label htmlFor='country' >COUNTRY</label>
                  <input id='country' name='country' />
                </Field>
            </FieldSetBox>
              
            <FieldSetBox>
              <SubmitBtn>Save</SubmitBtn>
            </FieldSetBox>

          </FieldSet>
        </Form>
      </FormLogin>
      </Container>

    </>)
}

const Container = styled.div`
  position: relative;
  border: 2px solid red;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 542px;
  background-color: white;
  padding-bottom: 20px;

  @media ${({ theme }) => theme.tablet} {
    display: flex;
    flex-direction: column;
    max-width: 620px;
  }
  @media ${({ theme }) => theme.mobileL} {
    align-items: center;
  }
`
const Header = styled.div`
  padding-left: 32px;
  max-width: 620px;
  margin: 10px 0px;
  padding-bottom: 10px;
  border-bottom: 10px solid ${({theme }) => theme.backgroundSecondary};

  & p {
    white-space: pre-wrap;
    font-size: ${({ theme }) => theme.fontMS}
  }

  @media ${({ theme }) => theme.tablet} {
    padding: 0 0 10px 20px;
    max-width: 100%;
    height: 100%;
  }
`

const FormLogin = styled.div`
display: flex;
flex-direction: column;
align-items: center;
  height: auto;
  width: 100%;
  padding-bottom: 20px;
`
const Form = styled.form`
  width: fit-content;
  max-width: 650px;
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
  align-items: flex-start;  
  width: 100%;

  @media ${({ theme }) => theme.mobileL} {
    max-width: 100%;
  }

`
const Field = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;  
  margin-bottom: 19px;
  width: 370px;

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

  @media ${({ theme }) => theme.tablet } {
    width: 100%;
    padding: 0 20px;
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
  margin-left: 20px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.headerMiddle};
  }

  @media ${({ theme }) => theme.tablet} {
    margin: 0 auto;
  }
`

export default UserDetails