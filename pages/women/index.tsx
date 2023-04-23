import Banner from '@/components/Banner'
import styled from 'styled-components'
import { ClotheType,  selectAllClothes,  useGetAllClothesQuery } from 'lib/clothesSlice'
import ClothesGallery from '@/components/ClothesGallery'
import { useAppSelector } from 'lib/hooks/hooks'
import Head from 'next/head'




export default function Women() {

  const selectAll = useAppSelector(selectAllClothes)
  let randomClothes: ClotheType[] = []


  const {
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetAllClothesQuery()


  if (isLoading) {
  } else if (isSuccess) {
    randomClothes = [...selectAll].sort(() => Math.random() - 0.5)
  } else if (isError) {
    console.log(JSON.stringify(error))
  }


  const firstBanner = {
    banner: '#ff82bc',
    header: 'UP TO 30% OFF ',
    header2: ' OUTLET ICONS',
    subheader: 'Surprise discount unlocked',
    subheader2: 'With code: ',
    subheader3: 'SURPRISE'
  } as const
  const secondBanner = {
    banner: '#95f7e5',
    header: 'UP TO 50% OFF ',
    header2: ' SUMMER STUFF',
    subheader: 'ITS HOT OUT THERE',
    subheader2: '',
    subheader3: ''
  } as const

  return (<>
    <Head>
      <title>Womens Clothes</title>
    </Head>
    <Wrapper>

        
      <Banner info={firstBanner} />


      {isSuccess && <ClothesGallery info={randomClothes} />}

      <Banner info={secondBanner} />

    </Wrapper>
    </>)
}
const Wrapper = styled.main`
  position: absolute;
  left: 0;
  top: 155px;
  width: 100%;
  height: auto;
`
