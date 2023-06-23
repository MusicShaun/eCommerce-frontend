


import React from 'react'
import styled from 'styled-components'

function PersonIcon() {
  return (
    <Wrapper>
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 512 512">
        

        {/* Head */}
        <circle cx="256" cy="176" r="126" fill="none" stroke="#FFFFFF" strokeWidth="50" />

        {/* Semi-Circle */}
        <circle cx="256" cy="650" r="280" fill="none" stroke="#FFFFFF" strokeWidth="50" />

      {/* Body */}
      <rect x="10" y="470" width="94%" height="50" rx="20" ry="20" fill="#FFFFFF" />
    </svg>
    </Wrapper>
  )
}

export default PersonIcon

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