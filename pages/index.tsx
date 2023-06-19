import Head from 'next/head'
import { Inter } from '@next/font/google'
import styled from 'styled-components'
import Banner from '@/components/banners/Banner'
import { extendedClothesSlice, useGetAllClothesQuery , selectAllClothes, ClotheType} from '@/lib/slices/clothesSlice'
import ClothesGallery from '@/components/clothes/ClothesGallery'
import { useAppDispatch, useAppSelector } from 'lib/hooks/hooks'
import PacmanLoader from 'react-spinners/PacmanLoader'
import { useGetUserQuery } from '@/lib/slices/userSlice'
import { useEffect, useState } from 'react'
import { logout } from '@/lib/services/handleLogout'

const inter = Inter({ subsets: ['latin'] })

extendedClothesSlice.endpoints.getAllClothes.initiate()

export default function Home() {

  const dispatch = useAppDispatch()
  const selectAll = useAppSelector(selectAllClothes)
  const [randomClothes, setRandomClothes] = useState<ClotheType[]>([])
  const userEmail = useAppSelector(state => state.auth.email)
  const hasToken = useAppSelector(state => state.auth.token !== null)
  
  const {
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetAllClothesQuery()

  const { } = useGetUserQuery(userEmail, {
    skip: !hasToken
  })

  // Wrapped in a useEffect to avoid re rendering when getUser fires
  useEffect(() => {
    if (isLoading) {
    } else if (isSuccess) {
      setRandomClothes([...selectAll].sort(() => Math.random() - 0.5))
    } else if (isError) {
      console.log(JSON.stringify(error))
    }
  }, [isSuccess, isError, selectAll, isLoading])


  async function handleLogout() {
    await logout({dispatch})
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
        <title>Trendy Fashion & Outfits</title>
        <meta property="og:title" content="Trendy Fashion & Outfits" />
	      <meta property="og:image" content="" />
        <meta property="og:description" content=" Discover clothes online with ASOS. Explore the latest fashion trends, shoes, dresses, accessories, beauty and more." />
        <meta name="description" content=" Discover clothes online with ASOS. Explore the latest fashion trends, shoes, dresses, accessories, beauty and more." />
        <link rel="canonical" href="https://shaunysshop.com/" />
      </Head>

      <Wrapper>
      <button onClick={() => handleLogout()}>
              Log out for testing
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
