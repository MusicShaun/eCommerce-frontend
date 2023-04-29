import styled from 'styled-components'
import MyAccountLayout from '../../components/AccountLayout'
import React, { useRef, useState } from 'react'
import { selectCurrentUser, useUpdateUserMutation } from 'lib/userSlice'
import { useAppSelector } from 'lib/hooks/hooks'
import Head from 'next/head'

export default function PersonalDetails() {

  const womenRef: React.MutableRefObject<any> = useRef()
  const menRef: React.MutableRefObject<any> = useRef()
  const [interestRadio, setInterestRadio ] = useState({ men: false, women: false })
    
  const [updateUser, {isLoading, isSuccess}] = useUpdateUserMutation()
  const user = useAppSelector(selectCurrentUser) //! theres actually 2 selectCurrectUSers. This needs to be fixed

  function setInterestWomen() {
    setInterestRadio({
      men: false,
      women: true
    })
    menRef.current.checked = false;
  }
  function setInterestMen() {
    setInterestRadio({
      men: true,
      women: false
    })
    womenRef.current.checked = false;
  }

  async function handleUpdateUser(e: any) {
    e.preventDefault()
    let data = new FormData(e.target)
    const { given_name, surname, email, dob } = Object.fromEntries(data.entries())
    const localUser = JSON.parse(localStorage.getItem('key')!)

    try {
      const res = await updateUser({ 
        ...localUser.profile,
        given_name: given_name === '' ? localUser.profile.given_name : given_name,
        surname: surname === '' ? localUser.profile.surname : surname,
        email: email === '' ? localUser.profile.email : email,
        dob: dob === '' ?  localUser.profile.dob : dob ,
        gender: interestRadio.men ? 'men' : 'women',
        _id: localUser.profile._id,
      }).unwrap()
      localStorage.setItem('key', JSON.stringify({...localUser, profile: res}))
    } catch (err) {
      console.log(err)
    }
  }


  return (
    <> <Head>
    <title>Personal details</title>
  </Head>
    <MyAccountLayout>
    <Container>
      <Header>
        <h2>MY DETAILS</h2>
        <p>{"("}Feel free to edit any of your details below so your account is totally up to date.{")"}</p>
      </Header>
      <FormLogin>
        <Form onSubmit={handleUpdateUser}>
          <FieldSet>
            <FieldSetBox>
              <Field>
                <label htmlFor='email' >EMAIL ADDRESS</label>
                  <input id='email' type='email' name='email' placeholder={user?.email} />
              </Field>
              <Field>
                <label htmlFor='given_name'>FIRST NAME</label>
                  <input id='given_name' name='given_name' placeholder={user?.given_name } />
              </Field>
              <Field>
                <label htmlFor='surname' >LAST NAME</label>
                <input id='surname' name='surname' placeholder={user?.surname} />
              </Field>
              <Field>
                <label htmlFor='dob' >DATE OF BIRTH</label>
                <input type="date" id="dob" name="dob" defaultValue={user?.dob} />
              </Field>
              <Field >
                <label>Mostly interested in</label>
                  <RadioField style={{ flexDirection: 'row', padding: '10px 0 0 0 ' }}>

                    <input type='radio'
                        onChange={setInterestWomen}
                        id='women' ref={womenRef}
                        checked={user?.gender === 'women' || interestRadio.women}
                      />  
                    <label htmlFor='women' >Womenswear</label>
                    <input type='radio'
                      onChange={setInterestMen}
                      id='men' ref={menRef}
                      checked={user?.gender === 'men' || interestRadio.men}
                      />
                    <label htmlFor='men' >Menswear</label>

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
    </>)
}

const Container = styled.div`
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
  height: auto;
  width: 100%;
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

  @media ${({ theme }) => theme.mobileL} {
    max-width: 100%;
  }

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

  @media ${({ theme }) => theme.tablet} {
    & input {
    width: 50px;
    margin:0 5px 0 0;
  }
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

  @media ${({ theme }) => theme.tablet} {
    margin: 0 auto;
  }
`