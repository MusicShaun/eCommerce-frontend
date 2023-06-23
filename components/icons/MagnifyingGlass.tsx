


import React from 'react'
import styled from 'styled-components'

function MagnifyingGlass() {
  return (
    <Wrapper>
<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 512 512">
  <circle cx="244" cy="244" r="202" stroke="#FFFFFF" stroke-width="50" fill="none" />
  <rect x="460" y="444" width="124" height="45" rx="32" ry="32" fill="#FFFFFF" transform="rotate(45 504 364)" />
</svg>
    </Wrapper>
  )
}

export default MagnifyingGlass

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  aspect-ratio: 1/1;
  left: 50%;
  top:50%;
  transform: translate(-50%, -50%);
  display: none;
  @media ${({ theme }) => theme.mobileL} {
    display: block;
  }
`