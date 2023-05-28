import Header from '@/components/header/Header'
import { theme } from '@/config/ThemeConfig'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import { ThemeProvider } from 'styled-components'
import { Provider } from 'react-redux'
import { store } from 'lib/store'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useAppDispatch } from '@/lib/hooks/hooks'
import { setAuth, setEmailOnLogin, signOut } from '@/lib/slices/authSlice'

import awsconfig from '../src/aws-exports'
import { Amplify, Auth, Hub } from 'aws-amplify'
import AuthListener from '@/lib/services/AuthListener'
Amplify.configure({awsconfig})
Auth.configure(awsconfig)




function App({ Component, pageProps }: AppProps) {

  const [isTheme, setIsTheme] = useState(false)

  
  return (
    <Provider store={store}> 

      <GoogleOAuthProvider clientId="60533903973-bjhrej7b8ei1p9jj75nupo2gdb0v7ttj.apps.googleusercontent.com">
        
        <ThemeProvider theme={!isTheme ? theme.light : theme.dark}>
              <Header />
              <Component {...pageProps} />
          <AuthListener />
          
        </ThemeProvider>
      </GoogleOAuthProvider> 
    </Provider>
    )
}
export default (App)

