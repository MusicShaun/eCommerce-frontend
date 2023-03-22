import { useRouter } from 'next/router'
import { useAppSelector } from 'lib/hooks/hooks'
import { ClotheType, selectShirts, selectShoes, selectShorts } from 'lib/clothesSlice'
import styled from 'styled-components'
import ClothesGallery from '@/components/ClothesGallery'
import ProductFilterSideBar from '@/components/ProductFilterSideBar'
import { useState } from 'react'

interface SelectorMap {
  [key: string]: (state: any) => ClotheType[];
}

export default function ProductGrouped() {

  const [filteredClothes, setFilteredClothes] = useState<ClotheType[]>([])
  const router = useRouter()
  const { productType } = router.query

  const selectorMap: SelectorMap = {
    shoes: selectShoes,
    shorts: selectShorts,
    shirts: selectShirts,
  }

  const productList: ClotheType[] = useAppSelector(selectorMap[productType!]);

  function getFilteredClotheArray(arr: ClotheType[]) {
    setFilteredClothes(arr)
  }


  const truthyCheckFilteredArray = filteredClothes && filteredClothes.length > 0 


  console.log(filteredClothes)
  
  return (
    <Wrapper>
      <Container>


        <ProductFilterSideBar
          info={productList}
          setFilteredClothes={setFilteredClothes}
          filteredClothes={filteredClothes}
        />

        <button onClick={() => getFilteredClotheArray(filteredClothes)}>SUBMIT</button>

        <ClothesGallery info={truthyCheckFilteredArray ? filteredClothes : productList} />

        
      </Container>
    </Wrapper>
  )
}

// function handleFilterSubmit() {
//   console.log('function called')
//   getFilteredClotheArray
// }

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

`