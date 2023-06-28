
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
      <h3>{info.header}<br />{info.header2}</h3>
        <h4>{info.subheader}</h4>
        <h4>{info.subheader2}<span>{info.subheader3}</span></h4>
    </TextBox>
  </BannerContainer>
  )
}

const BannerContainer = styled.div`
  position: relative;
  width: 100%;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;

  & img {
    z-index: -1;
  }

  @media ${({ theme }) => theme.mobileL} {
    height: 310px;
    margin: 1.5rem 0rem 0rem;
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
  color: white;
  text-align: center;
  width: 100%;

  @media ${({ theme }) => theme.mobileL} {
    padding: 10px;
    color: black;
  }

  &:hover {
    cursor: pointer;
  }

  & span {
    border: 2px solid white;
  }

  & h3 {
    font-size: 3rem;
    @media ${({ theme }) => theme.mobileL} {
      font-size: 2.4rem;
      width: 100%;
    } 
  }
  & h4 {
    font-size: 1.5rem;
  }
  & h3, h4 {
    text-shadow: -1px -1px 1px rgba(0,0,0,0.2), -10px -10px 10px rgba(0,0,0,0.05);
  }
`