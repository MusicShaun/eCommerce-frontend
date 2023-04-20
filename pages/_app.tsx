import Header from '@/components/header/Header'
import { theme } from '@/config/ThemeConfig'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useState } from 'react'
import { ThemeProvider } from 'styled-components'
import { Provider } from 'react-redux'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { store } from 'lib/store'
import { extendedClothesSlice } from 'lib/clothesSlice'

// store.dispatch(extendedClothesSlice.endpoints.getAllClothes.initiate())


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
export default App

        {/* <ReactQueryDevtools initialIsOpen={false} /> Switches off in production mode */} //! circle back to this. React devtools sounds great
