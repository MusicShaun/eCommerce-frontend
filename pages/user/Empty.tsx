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
export default function Empty({ info } : IProps) {

  
  return (<>

      <Second>
        <h3>{info.title}</h3>
        <p>{info.body}</p>
        <Button>
          <h3>
          <a href='/'>{info.button}</a></h3></Button>
      </Second>


    </>)
}


const Second = styled.div`
  width: 100%;
  height: 300px;
  background-color:white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 20px;
`
const Button = styled.button`
position: relative; 
  height: 48px;
  width: 248px;
  color: white;
  background-color: black;

  & a {
    text-decoration: none;
    color: inherit;
  }
`