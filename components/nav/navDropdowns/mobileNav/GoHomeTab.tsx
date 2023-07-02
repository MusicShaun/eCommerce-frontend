

import Image from 'next/image'
import router from 'next/router'
import React from 'react'
import styled from 'styled-components'

interface IProps {
  isWomen: Boolean
}
function GoHomeTab({ isWomen}: IProps) {
  

  const picture = isWomen 
    ? 'https://res.cloudinary.com/dyneqi48f/image/upload/v1677291104/shirt1_stxokm.webp'
    : "https://res.cloudinary.com/dyneqi48f/image/upload/v1677291103/shoe3_cf0fcr.webp"
  
  const alt = isWomen
    ? 'women'
    : 'men'

  
  
  
  return (
    <Container onClick={() => router.push(`/${alt}`)}>
      <Box>HOME</Box>
      <ImageBox>
        <Image src={picture} alt={alt}
          width={50} height={50}
        />
      </ImageBox>

    </Container>
  )
}

export default GoHomeTab


const Container = styled.div`
  position: relative;
  width: 90%;
  height: 50px;
  background-color: ${({ theme }) => theme.backgroundSecondary};

  margin: 0 1rem 1rem 1rem;
  `

const Box = styled.h3`
  color: ${({ theme }) => theme.darkGrey};
  font-size: 1rem;
  font-weight: 700;
  height: 100%;
  display: flex;
  align-items: center;
  margin-left: 1rem;
`

const ImageBox = styled.div`
  position: absolute;
  height : 100%;
  right: 0;
  top: 0;
`