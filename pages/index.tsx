import { Inter } from '@next/font/google'
import styled from 'styled-components'
import Banner from '@/components/banners/Banner'
import { extendedClothesSlice, useGetAllClothesQuery , selectAllClothes, ClotheType} from '@/lib/slices/clothesSlice'
import ClothesGallery from '@/components/clothes/ClothesGallery'
import { useAppDispatch, useAppSelector } from 'lib/hooks/hooks'
import PacmanLoader from 'react-spinners/PacmanLoader'
import { useGetUserQuery } from '@/lib/slices/userSlice'
import { useEffect, useState } from 'react'
import { HomePageHead } from '@/lib/head'
import BigBanner from '@/components/banners/BigBanner'
import MobileBanner from '@/components/banners/MobileBanner'
import { selectFirstWarning, setFirstWarning } from '@/lib/slices/firstWarningPopupSlice'
import { mobileBanner, secondBanner, firstBanner } from '@/components/banners/bannerObjects'

const inter = Inter({ subsets: ['latin'] })

extendedClothesSlice.endpoints.getAllClothes.initiate()

export default function Home() {
  
  const selectAll = useAppSelector(selectAllClothes)
  const [randomClothes, setRandomClothes] = useState<ClotheType[]>([])
  const userEmail = useAppSelector(state => state.auth.email)
  const hasToken = useAppSelector(state => state.auth.token !== null)
  const warningPopup = useAppSelector(selectFirstWarning)
  const dispatch = useAppDispatch()

  useEffect(() => { // THIS LETS THE USER KNOW TO NOT USE PERSONAL INFO 
    if (!warningPopup) {
      window.alert('This is a demonstration site. You can safely login with your email, but please refrain from attempting to purchase or adding personal information')
      dispatch(setFirstWarning(true))
    } else return 
  }, [warningPopup])
  

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





  return (
    <>
      <HomePageHead />
      <Wrapper>
        <MobileBanner info={mobileBanner} />

        <BigBanner info={secondBanner} />
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
        <Banner info={firstBanner} />
      </Wrapper>
    </>
  )
}

const Wrapper = styled.section`
  position: relative;
  width: 100%;
  height: auto;


`
