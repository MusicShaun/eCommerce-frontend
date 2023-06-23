

import {  cssLoaderSpecs } from '@/lib/services/cartServices'

import React from 'react'
import { PacmanLoader } from 'react-spinners'
import styled from 'styled-components'

interface IProps {
  isWishLoading: boolean
}
function LoadingSpinner({ isWishLoading }: IProps) {
  return (
    <SpinnerContainer style={{display: isWishLoading ? 'flex' : 'none'}}>
      <PacmanLoader
        color={'#2d2d2d'}
        size={50}
        loading={isWishLoading}
        cssOverride={cssLoaderSpecs}
        speedMultiplier={1.5}
        />
  </SpinnerContainer>
  )
}

export default LoadingSpinner

const SpinnerContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9000;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.446);
`
