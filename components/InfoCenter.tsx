import React from 'react'
import styled from 'styled-components'


export default function Info_Center() {

  function handleclick() {
    alert('Using personal information is prohibited. Thank you!')
  }

  return (
    <Container>
      <h2 style={{marginBottom: '20px'}}>OR SIGN IN WITH...</h2>
      <SocialLinks>
        <SocialLink onClick={handleclick}>
          <Icon />
          <Text>Google</Text>
        </SocialLink>
        <SocialLink  onClick={handleclick}>
          <Icon />
          <Text>Facebook</Text>
        </SocialLink>
        <SocialLink onClick={handleclick}>
          <Icon />
          <Text>Apple</Text>
        </SocialLink>
      </SocialLinks>
    </Container>
  )
}


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 25px 10px 25px 0;
  margin: 0 30px  30px;
  height: 180px;

`
const SocialLinks = styled.div`
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: space-around;


`
const SocialLink = styled.a`
  width: 30%;
  height: 100%;
  border: 1px dashed grey;
  display: flex;
  align-items: center;

  &:hover {
    cursor: pointer;
    background-color: #f5f5f5;
  }
`
const Icon = styled.div`
  width: 50px;
  height: 50px;   
`
const Text = styled.span`
  
`