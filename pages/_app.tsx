import Header from '@/components/header/Header'
import { theme } from '@/config/ThemeConfig'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { Provider } from 'react-redux'
import { store } from 'lib/store'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Inter } from '@next/font/google'
import { Roboto_Condensed } from '@next/font/google'

import awsconfig from '../src/aws-exports'
import { Amplify, Auth } from 'aws-amplify'
import AuthListener from '@/lib/services/AuthListener'
import Head from 'next/head'
import MobileHeader from '@/components/header/MobileHeader'
import Footer from '@/components/footer/Footer'

Amplify.configure({awsconfig})
Auth.configure(awsconfig)

const roboto_condensed = Roboto_Condensed({
  weight: ['300', '400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap'
})
const inter = Inter({ subsets: ['latin'] })

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
          <Main className={roboto_condensed.className}>
            <Header />
            <MobileHeader />
            <Component {...pageProps} />
            <AuthListener />
            <Footer /> 
          </Main>
        </ThemeProvider>
      </GoogleOAuthProvider> 
    </Provider>
  </>)
}
export default (App)

const Main = styled.main`
  position: absolute;
  min-height: 100vh;
  width: 100%;
  left: 0;
  top: 0;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
`