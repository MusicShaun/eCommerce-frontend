import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import Facebook from '../public/facebook.webp'
import Apple from '../public/apple.webp'
import Google from '../public/google.webp'

export default function AuthOOptions() {

  function handleclick() {
    alert('AuthO coming soon! Or not. It might be better to not bloat this app')
  }

  return (
    <Container>
      <h2 style={{marginBottom: '20px'}}>OR SIGN IN WITH...</h2>
      <SocialLinks>
        <SocialLink onClick={handleclick}>
          <Image src={Google} alt="google" width={30} height={30} />
          <Text>Google</Text>
        </SocialLink>
        <SocialLink  onClick={handleclick}>
          <Image src={Facebook} alt='facebook' width={30} height={30}  />
          <Text>Facebook</Text>
        </SocialLink>
        <SocialLink onClick={handleclick}>
          <Image src={Apple} alt='apple'  width={30} height={30} />
          <Text>Apple</Text>
        </SocialLink>
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