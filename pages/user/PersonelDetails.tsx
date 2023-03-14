import styled from 'styled-components'
import MyAccountLayout from '../../components/Layout'

import React, { useEffect, useRef, useState } from 'react'

export default function PersonalDetails() {

  const oneRef: React.MutableRefObject<any> = useRef()
  const [radioOne, setRadioOne ] = useState(false)
  const [radioTwo, setRadioTwo] = useState(false)
    
  useEffect(() => { //! WHAT IS THE THING FOR A CHECKBOX BEING CHECKED?>
    // if (oneRef.current !==null ) {
    //   console.log(' made it here')
    //   oneRef.current.addEventListener('onmousedown', console.log('shit works'))

    //   return () => oneRef.current.removeEventListener('onclick', console.log('shit works'))
    // }
  }, [oneRef.current])

  function setChecks() {
    console.log(radioOne)
    setRadioOne(!radioOne)
  } 



  return (
    <MyAccountLayout>
    <Container>
      <Header>
        <h2>MY DETAILS</h2>
        <p>Feel free to edit any of your details below so your account is totally up to date.</p>
      </Header>
      <FormLogin>
        <Form>
          <FieldSet>
            <FieldSetBox>
              <Field>
                <label>EMAIL ADDRESS</label>
                <input />
              </Field>
              <Field>
                <label>FIRST NAME</label>
                <input />
              </Field>
              <Field>
                <label>LAST NAME</label>
                <input />
              </Field>
              <Field>
                <label>DATE OF BIRTH</label>
                <input type="date" id="birthday" name="birthday" />
              </Field>
              <Field >
                <label>Mostly interested in</label>
                  <RadioField style={{ flexDirection: 'row', padding: '10px 0 0 0 ' }}>
                  <input type='checkbox'  ref={oneRef} />  
                  <label>Womenswear</label>
                  <input type='radio'/>
                  <label>Menswear</label>

                  </RadioField>        
              </Field>
            </FieldSetBox>
              
            <FieldSetBox>
              <SubmitBtn>Save</SubmitBtn>
            </FieldSetBox>

          </FieldSet>
        </Form>
      </FormLogin>
      </Container>
    </MyAccountLayout>
  )
}

const Container = styled.div`
  width: 100%;
  min-height: 542px;
  background-color: white;
`
const Header = styled.div`
  padding-left: 32px;
`

const FormLogin = styled.div`
  height: auto;
  padding-bottom: 20px;
`
const Form = styled.form`
  width: 100%;
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
`
const Field = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;  
  padding: 0 185px 0 20px;
  margin-bottom: 19px;
  width: 570px;

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
  margin-left: 20px;
`