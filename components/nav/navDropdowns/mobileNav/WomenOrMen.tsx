

import { colors } from '@/config/ThemeConfig'
import React from 'react'
import styled from 'styled-components'

interface IProps {
  setIsWomen: React.Dispatch<React.SetStateAction<boolean>>
  isWomen: boolean
}


function WomenOrMen({setIsWomen, isWomen}: IProps) {

  const women = 
    isWomen ? {
      borderBottom: `2px solid ${colors.DARK_GREY}`,
      color: `${colors.DARK_GREY}`
    } : false 
  
  const men = 
    !isWomen ? {
      borderBottom: `2px solid ${colors.DARK_GREY}`,
      color: `${colors.DARK_GREY}`
    } : false

  return (
    <Box>
      <Button onClick={() => setIsWomen(true)} style={{...women}}>Women</Button>
      <BorderMiddle />
      <Button onClick={() => setIsWomen(false)} style={{...men}}>Men</Button>
    </Box>
  )
}

export default WomenOrMen


const Box = styled.div`
  position: relative;
  width: 100%;
  height: 60px;
  border-bottom: 1px solid grey;

  margin-bottom: 1rem;

  `

const Button = styled.button`
width: 50%;
height: 100%;
background-color: transparent;
border: none;
font-weight: 600;;
font-size: 1.2rem;
color: grey;
`
const BorderMiddle = styled.div`
  position: absolute;
  width: 1px;
  height: 50%;
  top: 25%;
  left: 50%;
  background-color: ${({ theme }) => theme.lightGrey};
`