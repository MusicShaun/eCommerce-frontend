import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useAppDispatch } from '@/lib/hooks/hooks'
import router from 'next/router';
import { setAuth, loggedIn, setEmailOnLogin } from '@/lib/slices/authSlice';
import Image from 'next/image';
import Google from '../images/Google.png'

import awsConfig from '../src/aws-exports'
import { Amplify, Auth, Hub } from 'aws-amplify'
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth'


Hub.listen('auth', (data) => { 
    if (data.payload.event === 'signIn_failure') {
        // Do something here
    }
})

const isLocalhost = process.env.NODE_ENV === 'development';

// Assuming you have two redirect URIs, and the first is for localhost and second is for production
const [ productionRedirectSignIn ] = [awsConfig.oauth.redirectSignIn];

const [productionRedirectSignOut ] = [awsConfig.oauth.redirectSignOut]

const updatedAwsConfig = {
  ...awsConfig,
  oauth: {
    ...awsConfig.oauth,
    redirectSignIn: productionRedirectSignIn,
    redirectSignOut: productionRedirectSignOut,
  }
}

Amplify.configure(updatedAwsConfig);

export default function AuthOOptions() {




  function federatedSignIn() {

    try {
      const signedInUser = Auth.federatedSignIn({
        provider: CognitoHostedUIIdentityProvider.Google
      })
      console.log(signedInUser)

    } 
    catch (error) {
      console.log(error)
    }


  }

  return (
    <Container>
      <h2 style={{ marginBottom: '20px' }}>OR SIGN IN WITH...</h2>

      <SocialLinks>
    
        
      
        <SocialLink onClick={federatedSignIn}>
          <Image src={Google} alt='google' width={32} height={32} />
          GOOGLE
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

  height: 100%;
  border-radius: 3px;
  border: 2px solid ${({ theme }) => theme.lightGrey};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.6rem;
  white-space: nowrap;
  padding: 1rem 2rem;
  font-weight: 700;
  color: ${({theme}) => theme.darkGrey};

  &:hover {
    cursor: pointer;
    background-color: #f5f5f5;
  }
`

const Text = styled.span`
  
`

