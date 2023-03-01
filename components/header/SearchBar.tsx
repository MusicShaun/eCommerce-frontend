import styled, { useTheme } from "styled-components";
import Image from "next/image";
import React from 'react'
import Magnifying from '@/images/magnifying.png'

export default function SearchBar() {
  return (
    <Form >
      <label> </label>
      <Input type='text' placeholder='Search for clothing items' />
      <Image
        src={Magnifying}
        width='18'
        height='18'
        alt=''
        style={{position: 'absolute', right: '20px'}}
      />
    </Form>
  )
}


const Form = styled.form`
  position: relative;
  width: 60%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Input = styled.input`
  width: 100%;
  height: 60%;
  border-radius: 30px;
  border: none;
  padding-left: 16px;
`

