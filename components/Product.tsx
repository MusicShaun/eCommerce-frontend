
import { ClotheType } from 'lib/clothesSlice'
import Image from 'next/image'
import React from 'react'
import styled from 'styled-components'

type ProductProps = {
  productItem: ClotheType;
}


export default function Product({productItem}: ProductProps) {
  

    return (
      <Container>
        <Image
          src={productItem.image}
          alt=''
          fill sizes="(width: 100%, height: 100%)"
        />
      </Container>
    )
  }
  
  const Container = styled.div`
    position: relative;
    height: 100%;
    width: 620px;
    padding: 0 10px;
    display: flex;
    flex-direction: column;
    background-color: white;
  `