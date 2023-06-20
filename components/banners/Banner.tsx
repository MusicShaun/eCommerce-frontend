
import Image from 'next/image'
import React from 'react'
import styled from 'styled-components'
import banner from '@/public/home-banner.webp'

interface IProps {
  [key: string]: any
}

export default function Banner({ info }: IProps) {
  


  return (
    <BannerContainer>
      {info.banner ?
        <>
        <ColorBanner style={{ background: info.banner }} />
          {info.banner2 ? <ColorBanner style={{ background: info.banner2 }} /> : false}
        </>
        :
        <Image
          src={banner}
          fill
          alt=''
        />}
      
    <TextBox>
      <h1>{info.header}<br />{info.header2}</h1>
        <h3>{info.subheader}</h3>
        <h3>{info.subheader2}<span>{info.subheader3}</span></h3>
    </TextBox>
  </BannerContainer>
  )
}

const BannerContainer = styled.div`
  position: relative;
  width: 100%;
  height: 280px;
  display: flex;
  justify-content: center;
  align-items: center;

  & img {
    z-index: -1;
  }

`
const ColorBanner = styled.div`
position: absolute;
  width: 100%;
  height: 100%;
  z-index: -1;
`
const TextBox = styled.a`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px;

  &:hover {
    cursor: pointer;
  }

  & span {
    border: 2px solid black;
  }
`