import styled from 'styled-components'
import React, { Dispatch, SetStateAction } from 'react'

interface IProps {
  setEmptyHover: Dispatch<SetStateAction<boolean>>
}

export default function Nav4Panel({ setEmptyHover }: IProps) {
  

  
  return (<BoxContainer
    onMouseEnter={() => setEmptyHover(true)}
    onMouseLeave={() => setEmptyHover(false)}>
    <Box>

    </Box>
    <Box>

    </Box>
    <Box>

    </Box>
    <Box>
      
    </Box>
    </BoxContainer>)
}

const BoxContainer = styled.div`
  position: absolute;
  top: 50px;
  left: 0;
  padding-top: 20px;

  display: flex;
  height: 340px;
  width: 100%;
  background-color: #e2e2da;
`
const Box = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 100%;
  width: 25%;
  padding: 0px 40px;

  border-right: 1px solid lightgrey;

  &:last-child {
    border-right: none;
  }
`