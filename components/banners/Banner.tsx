
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
      {info.header2 ? 
      <h3>{info.header}<br />{info.header2}</h3>
        : <h3>{info.header}</h3>
        }
        <h4>{info.subheader}</h4>
        <h4>{info.subheader2}<span>{info.subheader3}</span></h4>
    </TextBox>
  </BannerContainer>
  )
}

const BannerContainer = styled.div`
  position: relative;
  width: 100%;
  height: 240px;
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
  text-align: center;
  color: white;
  @media ${({ theme }) => theme.mobileL} {
    padding: 10px;
  }
  &:hover {
    cursor: pointer;
  }

  & span {
    border: 2px solid ${({ theme }) => theme.headerTop};
  }
  & h3 {
    font-size: 2.4rem;
    vertical-align: middle;
    @media ${({ theme }) => theme.mobileL} {
      font-size: 2.1rem;
      width: 100%;
    } 
  }
  & h4 {
    font-size: 1.6rem;
  }
  & h3, h4 {
    text-shadow: -1px -1px 1px rgba(0,0,0,0.2), -10px -10px 10px rgba(0,0,0,0.05);
  }
`