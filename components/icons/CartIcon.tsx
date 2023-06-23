

import { colors } from '@/config/ThemeConfig'
import React from 'react'
import styled from 'styled-components'

function PersonIcon() {
  return (
    <Wrapper>
<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 512 512" style={{zIndex: 2}} >

{/* Bag */}
<rect x="5%" y="25%" width="90%" height="72%" rx="20" ry="20" stroke="#FFFFFF" strokeWidth="50" fill={colors.DARK_BLUE}/>


      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 512 512">
        {/* Handle */}
<circle cx="50%" cy="35%" r="160" fill="none" stroke="#FFFFFF" strokeWidth="42" clipPath="url(#handleClip)">
</circle>

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

   & svg {
    position: absolute;
   }
`