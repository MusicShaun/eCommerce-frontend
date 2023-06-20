import Banner from '@/components/banners/Banner'
import styled from 'styled-components'
import { ClotheType,  selectAllClothes,  useGetAllClothesQuery } from '@/lib/slices/clothesSlice'
import ClothesGallery from '@/components/clothes/ClothesGallery'
import { useAppSelector } from 'lib/hooks/hooks'
import { WomensPageHead } from '@/lib/head'
import { colors } from '@/config/ThemeConfig'


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
    banner: colors.PINK,
    header: 'UP TO 30% OFF ',
    header2: ' OUTLET ICONS',
    subheader: 'Surprise discount unlocked',
    subheader2: 'With code: ',
    subheader3: 'SURPRISE'
  } as const

  const secondBanner = {
    banner: colors.BANNER_1, 
    banner2: colors.BANNER_3, 
    header: 'UP TO 50% OFF ',
    header2: ' SUMMER STUFF',
    subheader: 'ITS HOT OUT THERE',
    subheader2: '',
    subheader3: ''
  } as const

  return (<>
    <WomensPageHead />

    <Wrapper>
      
    <Banner info={secondBanner} />
    
      {isSuccess && <ClothesGallery info={randomClothes} />}

      
      <Banner info={firstBanner} />
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
