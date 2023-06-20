import React from 'react'
import styled from 'styled-components'




function Footer() {
  return (
    <Wrapper>
      <h3> insert footer text </h3>
    </Wrapper>
  )
}

export default Footer

const Wrapper = styled.footer`
display: none; 
  position: relative;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 155px;
  background-color: ${({ theme }) => theme.lightBlue};

  display: flex;
  align-items: center;
  justify-content: center;
`