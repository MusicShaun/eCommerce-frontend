import React from 'react'
import styled from 'styled-components'
import InfoCenter from './InfoCenter'
import { useAddUserMutation } from 'lib/userSlice'
import router from 'next/router'

export default function login() {

  const [addUser, { isLoading }] = useAddUserMutation()

  async function handleSubmit(e:any ) {
    e.preventDefault()
    const data = new FormData(e.target)
    try {
      await addUser({
        firstName: data.get('firstName') as string,
        lastName: data.get('lastName') as string,
        email: data.get('email') as string,
        password: data.get('password') as string,
        dob: data.get('birthday') as string,
        interest: handleInterestCheck(e),
      }).unwrap()
      router.push('/')
    } catch (err) {
      console.log(err)
    }

  }
  // const canSave = [title, content, userId].every(Boolean) && !isLoading;

  function handleInterestCheck(e:any) {
    if (e.target.women.checked) {
      return 'women'
    } else if (e.target.men.checked) {
      return 'men'
    } else return ''
  }

  return (<>
    
    <InfoCenter />


    <FormLogin>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <FieldSet>
          <FieldSetBox>
            <Field>
              <label>EMAIL ADDRESS</label>
              <input name='email' autoComplete='email'/>
            </Field>
            <Field>
              <label>FIRST NAME</label>
              <input name='first' autoComplete='name'/>
            </Field>
            <Field>
              <label>LAST NAME</label>
              <input name='last' autoComplete='surname'/>
            </Field>
            <Field>
              <label>PASSWORD</label>
              <input name='password' autoComplete='new-password'/>
            </Field>
            <Field>
              <label>DATE OF BIRTH</label>
              <input type="date" id="birthday" name="birthday" />
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

    

</>  )
}

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
`
