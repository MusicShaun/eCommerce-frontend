
import Image from 'next/image'
import React from 'react'
import styled from 'styled-components'
import banner from '@/public/home-banner.webp'

interface IProps {
  [key: string]: any
}
function MobileBanner({ info }: IProps) {

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
export default MobileBanner

const BannerContainer = styled.div`
  display: none;
  position: relative;
  width: 100%;
  height: 150px;
  justify-content: center;
  align-items: center;

  & img {
    z-index: -1;
  }

    @media ${({ theme }) => theme.mobileL} {
    display: flex;
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
    font-weight: 700;
  }
  & h3 {
    background-color: white;
    font-style: italic;
    color: ${({ theme }) => theme.headerMiddle};
    font-size: 1.6rem;
    vertical-align: middle;
    padding: 0.5rem;
    margin-bottom: 5px;

  }
  & h4 {
    font-size: 1.1rem;
    font-weight: 400;
    line-height: 1.5;
  }

`
