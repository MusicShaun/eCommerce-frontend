



import Image from 'next/image'
import React from 'react'
import styled from 'styled-components'

interface IProps {
  heading: string
  picture: string
  alt: string
}

function Tabs({ heading, picture, alt }: IProps) {



  return (
    <Container>
      <Box>{heading}</Box>
      <ImageBox>
        <Image src={picture} alt={alt} width={100} height={100} />
      </ImageBox>
    </Container>
  )
}

export default Tabs


const Container = styled.div`
  position: relative;
  width: 90%;
  height: 100px;
  background-color: ${({ theme }) => theme.backgroundSecondary};

  margin: 0 1rem ;
`

const Box = styled.h3`
  color: ${({ theme }) => theme.darkGrey};
  font-size: 1rem;
  font-weight: 600;
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