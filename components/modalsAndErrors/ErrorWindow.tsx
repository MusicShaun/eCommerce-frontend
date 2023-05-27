//write a pop up error window that will display the error message from the backend
import { Dispatch, SetStateAction } from 'react'
import styled from 'styled-components'

interface IProps {
  header: string 
  message: string
  closeWindow: Dispatch<SetStateAction<boolean>>
}

export default function ErrorWindow({header, message, closeWindow}: IProps) {
  
  return (
    <Wrapper>
      <Box>
        <h2>{header}</h2>
        <p>{message}</p>
        <Btn onClick={() => closeWindow(false)}>Okay</Btn>
      </Box>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed; 
  top: 0;
  left: 0;
  background-color: rgba(0,0,0,0.5);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Box = styled.div`
  width: 400px;
  height: auto;
  min-height: 200px;
  background-color: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & h1 {
    margin-bottom: 20px;
  }

`
const Btn = styled.button`
  width: 100px;
  height: 50px;
  border-radius: 5px;
  border: none;
  background-color: ${({ theme }) => theme.error};
  color: white;
  font-size: ${({ theme }) => theme.fontL};
  margin-top: 20px;
`

