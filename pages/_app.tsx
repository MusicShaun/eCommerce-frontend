import Header from '@/components/header/Header'
import { theme } from '@/config/ThemeConfig'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useState } from 'react'
import { ThemeProvider } from 'styled-components'
import { Provider } from 'react-redux'
import { store } from 'lib/store'
import { GoogleOAuthProvider } from '@react-oauth/google';


import awsconfig from '../src/aws-exports'
import { Amplify, Auth } from 'aws-amplify'
import AuthListener from '@/lib/services/AuthListener'
import Head from 'next/head'
import MobileHeader from '@/components/header/MobileHeader'
Amplify.configure({awsconfig})
Auth.configure(awsconfig)




function App({ Component, pageProps }: AppProps) {

  const [isTheme, setIsTheme] = useState(false)

  
  return (<>
    <Head>
      <meta property="og:type" content="website" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
      <meta name="theme-color" content="#003666" />
    </Head>

    <Provider store={store}> 

      <GoogleOAuthProvider clientId="60533903973-bjhrej7b8ei1p9jj75nupo2gdb0v7ttj.apps.googleusercontent.com">
        
        <ThemeProvider theme={!isTheme ? theme.light : theme.dark}>
          <Header />
          <MobileHeader />
              <Component {...pageProps} />
          <AuthListener />
          
        </ThemeProvider>
      </GoogleOAuthProvider> 
    </Provider>
  </>)
}
export default (App)

