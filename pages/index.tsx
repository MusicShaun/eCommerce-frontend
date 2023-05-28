import Head from 'next/head'
import { Inter } from '@next/font/google'
import styled from 'styled-components'
import Banner from '@/components/banners/Banner'
import { extendedClothesSlice, useGetAllClothesQuery , selectAllClothes, ClotheType} from '@/lib/slices/clothesSlice'
import ClothesGallery from '@/components/clothes/ClothesGallery'
import { useAppDispatch, useAppSelector } from 'lib/hooks/hooks'
import PacmanLoader from 'react-spinners/PacmanLoader'
import { useGetUserQuery, useRegisterMutation } from '@/lib/slices/userSlice'
import { useEffect, useState } from 'react'
import {   selectIsAuthenticated, isAuthenticated, setAuth, setEmailOnLogin, signOut } from '@/lib/slices/authSlice'
import { Auth, Hub } from 'aws-amplify'
import { logout } from '@/lib/services/handleLogout'

const inter = Inter({ subsets: ['latin'] })

extendedClothesSlice.endpoints.getAllClothes.initiate()

export default function Home() {

  const selectAll = useAppSelector(selectAllClothes)
  const [randomClothes, setRandomClothes] = useState<ClotheType[]>([])
  const userEmail = useAppSelector(state => state.auth.email)
  const dispatch = useAppDispatch()
  const hasToken = useAppSelector(state => state.auth.token !== null)
  const isAuthorised = useAppSelector(selectIsAuthenticated)

  const {
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetAllClothesQuery()

  const {
    data: user,
    isLoading: userIsLoading,
    isSuccess: userIsSuccess,
    isError: userIsError,
    error: userError
  } = useGetUserQuery(userEmail, {
    skip: !hasToken
  })
  
  const [registerUser, {
    data,
    isLoading: registerLoading,
    error: registerError }
  ] = useRegisterMutation()



  // Wrapped in a useEffect to avoid re rendering when getUser fires
  useEffect(() => {
    if (isLoading) {
    } else if (isSuccess) {
      setRandomClothes([...selectAll].sort(() => Math.random() - 0.5))
    } else if (isError) {
      console.log(JSON.stringify(error))
    }

  }, [isSuccess, isError, selectAll, isLoading])

  const handleUserRegistration = (idToken: string, accessToken: string) => {
    if (hasToken && !isAuthorised) registerUser({
      email: idToken,
      cognitoId: accessToken
    })
    else console.log('No token ')
  };
  

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

  async function handleLogout() {
    await logout()
  }


  const firstBanner = {
    banner: '#95f7e5',
    header: 'UP TO 30% OFF ',
    header2: ' SELECTED STOCK',
    subheader: 'Surprise discount unlocked',
    subheader2: 'With code: ',
    subheader3: 'SURPRISE'
  } as const
  const secondBanner = {
    banner: '#FF385C',
    header: 'UP TO 50% OFF ',
    header2: ' SUMMER STUFF',
    subheader: 'ITS HOT OUT THERE',
    subheader2: '',
    subheader3: ''
  } as const


  return (
    <>
      <Head>
        <title>Welcome!</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Wrapper>
      <button onClick={() => handleLogout()}>
              Log out
            </button>
        <Banner info={firstBanner} />
        <PacmanLoader
          color={'#2d2d2d'}
          size={50}
          loading={isLoading}
          cssOverride={{
            display: 'block', height: '450px', margin: 'auto', marginTop: '200px'
          }}
        />
        {isSuccess &&
          <ClothesGallery info={randomClothes!} />
        }
        <Banner info={secondBanner} />
      </Wrapper>

    </>
  )
}

const Wrapper = styled.main`
  position: absolute;
  left: 0;
  top: 155px;
  width: 100%;
  height: auto;
`
