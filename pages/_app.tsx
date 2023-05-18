import Header from '@/components/header/Header'
import { theme } from '@/config/ThemeConfig'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useState } from 'react'
import { ThemeProvider } from 'styled-components'
import { Provider } from 'react-redux'
import { store } from 'lib/store'

import awsconfig from '../src/aws-exports'
import { Amplify, Auth } from 'aws-amplify'
Amplify.configure({awsconfig})
Auth.configure(awsconfig)

import { GoogleOAuthProvider } from '@react-oauth/google';


function App({ Component, pageProps }: AppProps) {

  
  const [isTheme, setIsTheme] = useState(false)
  
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

