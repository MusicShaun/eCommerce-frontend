import React from 'react'
import styled from 'styled-components'

function HeartIcon() {
  return (
    <Wrapper>
<svg fill="#000000" height="100%" width="100%" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" 
	 viewBox="0 0 505 505" xmlSpace="preserve">
<g>
	<path  d="M453.601,67.001c-24.7-24.7-57.4-38.2-92.3-38.2s-67.7,13.6-92.4,38.3l-12.9,12.9l-13.1-13.1
	c-24.7-24.7-57.6-38.4-92.5-38.4c-34.8,0-67.6,13.6-92.2,38.2c-24.7,24.7-38.3,57.5-38.2,92.4c0,34.9,13.7,67.6,38.4,92.3
	l187.8,187.8c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-3.9l188.2-187.5c24.7-24.7,38.3-57.5,38.3-92.4
	C491.801,124.501,478.301,91.701,453.601,67.001z M434.401,232.701l-178.7,178l-178.3-178.3c-19.6-19.6-30.4-45.6-30.4-73.3
	s10.7-53.7,30.3-73.2c19.5-19.5,45.5-30.3,73.1-30.3c27.7,0,53.8,10.8,73.4,30.4l22.6,22.6c5.3,5.3,13.8,5.3,19.1,0l22.4-22.4
	c19.6-19.6,45.7-30.4,73.3-30.4c27.6,0,53.6,10.8,73.2,30.3c19.6,19.6,30.3,45.6,30.3,73.3
	C464.801,187.101,454.001,213.101,434.401,232.701z"
          stroke='#FFF' strokeWidth={28}/>
</g>
</svg>
    </Wrapper>
  )
}

export default HeartIcon

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  aspect-ratio: 1/1;
  left: 50%;
  top:52%;
  transform: translate(-50%, -50%);

  display: none;
  @media ${({ theme }) => theme.mobileL} {
    display: block;
  }
`
