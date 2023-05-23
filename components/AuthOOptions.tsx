import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useAppDispatch } from '@/lib/hooks/hooks'
import router from 'next/router';
import { setAuth, loggedIn } from '@/lib/authSlice';


import awsConfig from '../src/aws-exports'
import { Amplify, Auth, Hub } from 'aws-amplify'
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth'


Hub.listen('auth', (data) => { 
    if (data.payload.event === 'signIn_failure') {
        // Do something here
    }
})

const isLocalhost = true
//   Boolean(
//   window.location.hostname === 'localhost' ||
//     // [::1] is the IPv6 localhost address.
//     window.location.hostname === '[::1]' ||
//     // 127.0.0.1/8 is considered localhost for IPv4.
//     window.location.hostname.match(
//       /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
//     )
// );

// Assuming you have two redirect URIs, and the first is for localhost and second is for production
const [
  localRedirectSignIn,
  productionRedirectSignIn,
] = awsConfig.oauth.redirectSignIn.split(',');

const [
  localRedirectSignOut,
  productionRedirectSignOut,
] = awsConfig.oauth.redirectSignOut.split(',');

const updatedAwsConfig = {
  ...awsConfig,
  oauth: {
    ...awsConfig.oauth,
    redirectSignIn: isLocalhost ? localRedirectSignIn : productionRedirectSignIn,
    redirectSignOut: isLocalhost ? localRedirectSignOut : productionRedirectSignOut,
  }
}

Amplify.configure(updatedAwsConfig);
console.log(updatedAwsConfig)

export default function AuthOOptions() {
  const [user, setUser] = React.useState(null);
  const [customState, setCustomState] = React.useState(null);
  console.log(updatedAwsConfig)

  console.log('user')
  console.log(user)
  console.log('customstate')
  console.log(customState)

  useEffect(() => {
    const unsubscribe = Hub.listen("auth", ({ payload: { event, data } }) => {
      switch (event) {
        case "signIn":
          setUser(data);
          break;
        case "signOut":
          setUser(null);
          break;
        case "customOAuthState":
          setCustomState(data);
      }
    });

    Auth.currentAuthenticatedUser()
      .then(currentUser => (setUser(currentUser), console.log(currentUser)))
      .catch(() => console.log("Not signed in"));

    return unsubscribe;
  }, [])

  

  return (
    <Container>
      <h2 style={{ marginBottom: '20px' }}>OR SIGN IN WITH...</h2>
      <button onClick={() => Auth.federatedSignIn()}>Open Hosted UI</button>

      <SocialLinks>
        <button onClick={() => Auth.federatedSignIn({
          provider: CognitoHostedUIIdentityProvider.Google,
          
          })
        }
        >Open Google</button>

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