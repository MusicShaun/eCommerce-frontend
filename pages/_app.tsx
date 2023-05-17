import Header from '@/components/header/Header'
import { theme } from '@/config/ThemeConfig'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useState } from 'react'
import { ThemeProvider } from 'styled-components'
import { Provider } from 'react-redux'
import { store } from 'lib/store'



function App({ Component, pageProps }: AppProps) {

  
  const [isTheme, setIsTheme] = useState(false)
  
  return (
    <ThemeProvider theme={!isTheme ? theme.light : theme.dark}>
        <Provider store={store}> 
          <Header />
          <Component {...pageProps} />
        </Provider>

    </ThemeProvider>)
}
export default (App)

