import styled, { useTheme } from "styled-components";
import Image from "next/image";
import React from 'react'
import Magnifying from '@/public/magnifying.webp'
import { selectAllClothes } from "lib/clothesSlice";
import { useAppDispatch, useAppSelector } from "lib/hooks/hooks";
import { updateSearchBar } from "lib/searchBarSlice";
import router from "next/router";
import ModalErrorWindow from "../ModalErrorWindow";

export default function SearchBar() {
  
  const dispatch = useAppDispatch()
  const clothes = useAppSelector(selectAllClothes)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [isModalOpen, setIsModalOpen] = React.useState(false)

  function handleSearch(e: any) {
    e.preventDefault()
    let searchInput = inputRef.current ? inputRef.current.value : ''
    console.log(searchInput)

    // Filter clothes
    const filteredClothes = clothes.filter(clothing =>
      Object.values(clothing).some((cloth) =>
       cloth.toString().toLowerCase().includes(searchInput.toLowerCase())
      )
    )

  
    if (filteredClothes.length === 0) return setIsModalOpen(true), dispatch(updateSearchBar(clothes))
    
    dispatch(updateSearchBar(filteredClothes))
    router.push('/ProductSearch')
  }


  return (<>
    <ModalErrorWindow isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} errorMessage={'Your search has no results'} />

        <Form onSubmit={(e) => handleSearch(e)}>

      <label> </label>
      <Input type='text' placeholder='Search for clothing items' ref={inputRef} />
      <Image
        src={Magnifying}
        width='18'
        height='18'
        alt=''
        style={{position: 'absolute', right: '20px'}}
      />
    </Form>
  </>)
}


const Form = styled.form`
  position: relative;
  width: 60%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media ${({ theme }) => theme.mobileS} {
    width: auto;
  }

  & > * {
    @media ${({ theme }) => theme.mobileL} {
    display: none;
    }
  }

`
const Input = styled.input`
  width: 100%;
  height: 60%;
  border-radius: 30px;
  border: none;
  padding-left: 16px;
`

