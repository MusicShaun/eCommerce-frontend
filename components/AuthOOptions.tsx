import React from 'react'
import styled from 'styled-components'
import { useAppDispatch } from '@/lib/hooks/hooks'
import router from 'next/router';
import { setAuth ,loggedIn} from '@/lib/authSlice';

export default function AuthOOptions() {

  const dispatch = useAppDispatch()


  

  return (
    <Container>
      <h2 style={{marginBottom: '20px'}}>OR SIGN IN WITH...</h2>
      <SocialLinks>
   
      </SocialLinks>
    </Container>
  )
}


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 25px 10px 25px 0;
  margin: 0 30px  30px;
  height: 180px;

`
const SocialLinks = styled.div`
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: space-around;


`
const SocialLink = styled.a`
  width: 30%;
  height: 100%;
  border-radius: 5px;
  border: 1px dashed lightgrey;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  &:hover {
    cursor: pointer;
    background-color: #f5f5f5;
  }
`

const Text = styled.span`
  
`


        {/* <SocialLink  onClick={handleclick}>
          <Image src={Facebook} alt='facebook' width={30} height={30}  />
          <Text>Facebook</Text>
        </SocialLink>
        <SocialLink onClick={handleclick}>
          <Image src={Apple} alt='apple'  width={30} height={30} />
          <Text>Apple</Text>
        </SocialLink> */}