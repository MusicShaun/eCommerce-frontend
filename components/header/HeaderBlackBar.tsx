


import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'

export default function HeaderBlackBar() {
  return (
    <BlackBar>
      <Container>
        <Link href='/women/Women' as='/women'><Tag>WOMEN</Tag></Link>
        <h4>NEW HERE? Get 20% off 100,000 styles! <br /> With code : NEWFRIEND</h4>
        <Link href='/men/Men' as='/men'><Tag>MEN</Tag></Link>
      </Container>

    </BlackBar>
  )
}


const BlackBar = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  height: 45px;
  background-color: ${({ theme }) => theme.headerBottom};
  z-index: -1;
`
const Container = styled.div`
  width: 900px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;

  & h4 {
    text-align: center;
  }

  & a {
    height: 70%;
    border: 2px solid white;
    padding: 0 10px;
    color: inherit;
    
    &:hover {
      cursor: pointer;
    }
  }

`
const Tag = styled.button`
  color: white;
  background-color: black;
  height: 100%;
  border: none;
  

  &:hover {
      cursor: pointer;
    }
`