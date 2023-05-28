import Header from '@/components/header/Header'
import { theme } from '@/config/ThemeConfig'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import { ThemeProvider } from 'styled-components'
import { Provider } from 'react-redux'
import { store } from 'lib/store'

import awsconfig from '../src/aws-exports'
import { Amplify, Auth, Hub } from 'aws-amplify'
Amplify.configure({awsconfig})
Auth.configure(awsconfig)

import { GoogleOAuthProvider } from '@react-oauth/google';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/hooks'
import { selectIsAuthenticated,isAuthenticated, setAuth, setEmailOnLogin, signOut } from '@/lib/slices/authSlice'
import { useRegisterMutation } from '@/lib/slices/userSlice'


function App({ Component, pageProps }: AppProps) {

  const [isTheme, setIsTheme] = useState(false)
  const dispatch = useAppDispatch()
  const isAuthorised = useAppSelector(selectIsAuthenticated)
  const hasToken = useAppSelector(state => state.auth.token !== null)

  const [registerUser, {
    data,
    isLoading: registerLoading,
    error: registerError }
  ] = useRegisterMutation()

  
  // CHECK IF AUTHENTICATED
  // IF NOT, CHECK LOCAL STORAGE FOR AUTH STATE
  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      const authState = localStorage.getItem('authState')
    
      if (authState && !isAuthorised) {
        const { email, token } = JSON.parse(authState)
        dispatch(setEmailOnLogin(email))
        dispatch(setAuth(token))
      }
    }
  },[])
  

  // COGNITO AUTH & SOCIAL SIGN IN 
  useEffect(() => {
    const unsubscribe = Hub.listen("auth", ({ payload: { event, data } }) => {
      switch (event) {
        case "signIn":
          console.log('SIGN IN :: :: ::')
          break;
        case "signOut":
          dispatch(signOut)
          break;
        case "customOAuthState":
      }
    });

    Auth.currentAuthenticatedUser() // EMAIL AND JWT IS USED FOR THE SERVER SIDE AUTH 
      .then(currentUser => {
        const { signInUserSession } = currentUser;
        const { accessToken, idToken } = signInUserSession;
        const { email } = currentUser.attributes;

        // SET HEADER TOKEN 
        if (accessToken.jwtToken) dispatch(setAuth(accessToken.jwtToken))
        else { dispatch(setAuth(accessToken)) }

        // SEND BACKEND PAYLOAD
        handleUserRegistration(idToken.payload.email, accessToken.payload.sub)
        dispatch(setEmailOnLogin(email))
        dispatch(isAuthenticated(true))
        },
      )
      .catch((error) => {
        const errorMessage = `Error: ${error.message}`
        console.log(errorMessage)
        console.log("Not signed in")
      });
    return unsubscribe;
  }, [])


  const handleUserRegistration = (idToken: string, accessToken: string) => {
    if (hasToken && !isAuthorised) registerUser({
      email: idToken,
      cognitoId: accessToken
    })
    else console.log('No token ')
  };
  
  return (
    <GoogleOAuthProvider clientId="60533903973-bjhrej7b8ei1p9jj75nupo2gdb0v7ttj.apps.googleusercontent.com">
    <ThemeProvider theme={!isTheme ? theme.light : theme.dark}>
        <Provider store={store}> 
          <Header />
          <Component {...pageProps} />
        </Provider>

    </ThemeProvider>
    </GoogleOAuthProvider>
    )
}
export default (App)

