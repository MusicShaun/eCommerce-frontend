import { ClotheType } from '@/lib/slices/clothesSlice'
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
          fill
          sizes="(width: 100%, height: 100%)"
          style={{ objectFit: "contain", padding: '0 16px'}}
        />
      </Container>
    )
  }
  
  const Container = styled.div`
    position: relative;
    width: 550px;
    height: auto;
    min-height: 500px;
    padding: 0 10px;
    display: flex;
    flex-direction: column;
    background-color: white;

    
    @media ${({ theme }) => theme.mobileL} {
      width: 100%;
      min-height: 100%;
      height: 100%;
      margin-top: 460px;
    }

    & img {
      @media ${({ theme }) => theme.mobileL} {
        height: fit-content;
      }
    }
  `