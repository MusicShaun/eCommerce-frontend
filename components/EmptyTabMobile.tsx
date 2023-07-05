import React from 'react'
import styled from 'styled-components'

interface objectType {
  title: string;
  body: string;
  button: string;
}
interface IProps {
  info: objectType;

}
export default function Empty({ info} : IProps) {

  
  return (<>

      <Second>
        <h3>{info.title}</h3>
        <p>{info.body}</p>
        <Button>
          <h3>
          <a href='/login'>{info.button}</a></h3></Button>
      </Second>


    </>)
}


const Second = styled.div`
  display: none;
  @media ${({ theme }) => theme.mobileL} {
    width: 100%;
    height: 300px;
    background-color:white;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 20px;
    text-align: center;
    color: ${({ theme }) => theme.text};

    & h3 {
      font-size: 1rem;
    }
    & p {
      margin-top: 5px;
    }

}
`
const Button = styled.button`
position: relative; 
  height: 48px;
  width: 248px;
  color: white;
  margin-top: 10px;
  background-color: ${({ theme }) => theme.headerTop};
  border: 1px solid ${({ theme }) => theme.headerMiddle};
  border-radius: 3px;
  text-align: center;
  & a {
    text-decoration: none;
    color: inherit;
    font-size: 1rem;
  }
`