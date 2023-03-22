import { useRouter } from 'next/router'
import { useAppSelector } from 'lib/hooks/hooks'
import { ClotheType, selectShirts, selectShoes, selectShorts } from 'lib/clothesSlice'
import styled from 'styled-components'
import ClothesGallery from '@/components/ClothesGallery'
import ProductFilterSideBar from '@/components/ProductFilterSideBar'

export default function ProductGrouped() {

  const selectorMap = {
    shoes: selectShoes,
    shorts: selectShorts,
    shirts: selectShirts,
  }
  const router = useRouter()
  const { productType } = router.query

  const productList: ClotheType[] = useAppSelector(selectorMap[productType as string] || (() => null));


  return (
    <Wrapper>
      <Container>
        <ProductFilterSideBar info={productList} />
        <ClothesGallery info={productList} />
      </Container>
    </Wrapper>
  )
}



const Wrapper = styled.div`
  position: absolute;
  left: 0;
  top: 155px;
  width: 100%;
  height: calc(90% - 155px);
  display: flex;
  justify-content: center;
`
const Container = styled.div`
  width: 1300px;
  height: auto;
  display: flex;
  flex-direction: columns;
  justify-content: space-between;
  margin-top: 60px;

  border: 1px solid red;
`