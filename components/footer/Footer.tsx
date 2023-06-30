import React from 'react'
import styled from 'styled-components'




function Footer() {
  return (
    <Wrapper>
      <Container>
        <List>
          <li>HELP AND INFORMATION</li> 
          <li>Home</li>
          <li>Shop</li>
          <li>Blog</li>
          <li>About</li>
          <li>Contact</li>
        </List>
        <List>
          <li>ABOUT SHAUNY'S SHOP </li>
          <li>Home</li>
          <li>Shop</li>
          <li>Blog</li>
          <li>About</li>
          <li>Contact</li>
        </List>
        <List>
          <li>MORE FROM SHAUNY'S </li>
          <li>Home</li>
          <li>Shop</li>
          <li>Blog</li>
          <li>About</li>
          <li>Contact</li>
        </List>
        <List>
          <li>SHOPPING FROM </li>
          <li>Home</li>
          <li>Shop</li>
          <li>Blog</li>
          <li>About</li>
          <li>Contact</li>
        </List>
      </Container>
      <Container> 

      </Container>
    </Wrapper>
  )
}

export default Footer

const Wrapper = styled.footer`
  position: relative;
  width: 100%;
  height: fit-content;
  background-color: ${({ theme }) => theme.backgroundSecondary};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const Container = styled.div`
  position: relative;
  max-width: 1300px;
  width: 100%;
  height: auto; 
  display: flex;
  padding: 2rem;

  &:nth-child(2) {
    background-color: ${({ theme }) => theme.lightGrey};
    height: 60px;
    max-width: 100%;
  }
`
const List = styled.ul`
  position: relative;
  width: 25%;
  height: 100%;
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  color: ${({ theme }) => theme.mediumGrey};
  line-height: 2.4;
  font-size: 0.8rem;

  & li {
    width: 100%;
    
    &:first-child {
      font-size: 1rem;
      font-weight: 600;
      &:hover {
        color: inherit;
        cursor: default;
      }
    }
    &:hover {
      color: ${({ theme }) => theme.headerMiddle};
      cursor: pointer;
    }
  }

`