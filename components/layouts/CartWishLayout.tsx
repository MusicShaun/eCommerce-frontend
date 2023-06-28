


import React from 'react'
import styled from 'styled-components'

interface IProps {
  title: string
  children: React.ReactNode
}

function CartWishLayout({ title, children }: IProps ) {
  return (
    <Wrapper>
      <TitleBanner>{title}</TitleBanner>
      {children}
    </Wrapper>
  )
}

export default CartWishLayout


const Wrapper = styled.div`
  display: none;
  @media ${({ theme }) => theme.mobileL} {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 60px;
    left: 0;
    width: 100%;
    height: auto;
    z-index: 99;
    color: ${({ theme }) => theme.text};

  }
`
const TitleBanner = styled.h1`
  height: 75px; 
  width: 100%;
  background-color: ${({ theme }) => theme.backgroundSecondary };
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-weight: 600;
`