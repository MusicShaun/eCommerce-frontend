import Banner from '@/components/banners/Banner'
import styled from 'styled-components'
import { ClotheType,  selectAllClothes,  useGetAllClothesQuery } from '@/lib/slices/clothesSlice'
import ClothesGallery from '@/components/clothes/ClothesGallery'
import { useAppSelector } from 'lib/hooks/hooks'
import { WomensPageHead } from '@/lib/head'
import { womensFirstBanner, womensSecondBanner } from '@/components/banners/bannerObjects'

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



  return (<>
    <WomensPageHead />

    <Wrapper>
      <Banner info={womensFirstBanner} />
      {isSuccess && <ClothesGallery info={randomClothes} />}
      <Banner info={womensSecondBanner} />
    </Wrapper>
    
    </>)
}
const Wrapper = styled.section`
  position: relative;
  width: 100%;
  height: auto;

  @media ${({ theme }) => theme.mobileL} {
    margin-top: 60px;
  }
`
