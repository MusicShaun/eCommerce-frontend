import styled, { useTheme } from "styled-components";
import Image from "next/image";
import React, { useState } from 'react'
import Magnifying from '@/public/magnifying.webp'
import { selectAllClothes } from "@/lib/slices/clothesSlice";
import { useAppDispatch, useAppSelector } from "lib/hooks/hooks";
import { updateSearchBar } from "@/lib/slices/searchBarSlice";
import router from "next/router";
import ModalErrorWindow from "../modalsAndErrors/ModalErrorWindow";

export default function SearchBar() {
  
  const dispatch = useAppDispatch()
  const clothes = useAppSelector(selectAllClothes)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [userTyping, setUserTyping] = useState(false)

  function handleSearch(e: any) {
    e.preventDefault()
    let searchInput = inputRef.current ? inputRef.current.value : ''

    // Filter clothes
    const filteredClothes = clothes.filter(clothing =>
      Object.values(clothing).some((cloth) =>
       cloth.toString().toLowerCase().includes(searchInput.toLowerCase())
      )
    )
      console.log(filteredClothes)
    if (filteredClothes.length === 0) { // NO SEARCH RESULTS / SHOW ERROR 
        setIsModalOpen(true),
        dispatch(updateSearchBar(clothes)),
        inputRef.current!.value = '',
        setUserTyping(false)

    } else { // NAVIGATE TO RESULTS 
      dispatch(updateSearchBar(filteredClothes))
      setUserTyping(false)
      inputRef.current!.value = ''
      router.push('/ProductSearch')
    }
  }

  function handleInputChange(e: any) {
    if (e.target.value.length > 0) setUserTyping(true)
    else setUserTyping(false)
  }

  function handleCloseSearch() {
    setUserTyping(false)
    inputRef.current!.value = ''
    dispatch(updateSearchBar(clothes))
  }

  return (<>
    <ModalErrorWindow isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} errorMessage={'Your search has no results'} />

      <Form onSubmit={(e) => handleSearch(e)}>

      <label> </label>
      <Input type='text' placeholder='Search for clothing items' ref={inputRef} onChange={handleInputChange}
        style={{zIndex: userTyping ? 2 : 0}}
      />
      {userTyping ? <CloseSearch onClick={handleCloseSearch}><X></X></CloseSearch> : false}
      <Image
        src={Magnifying}
        width='18'
        height='18'
        alt=''
        style={{position: 'absolute', right: '20px'}}
      />
    </Form>

    <BlackenWindow style={{ opacity: userTyping ? 1 : 0 , width: userTyping ? '100%' : '0px'}}  />
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
  height: 75%;
  border-radius: 30px;
  border: none;
  padding-left: 16px;
  font-size: ${({ theme }) => theme.fontML};
`

const BlackenWindow = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.5s ease 0s;
`
const CloseSearch = styled.div`
  position: absolute;
  right: 20px;
  width: 40px;
  height: 40px;
  z-index: 3;
  cursor: pointer;

`
const X = styled.div`
  &::before, &::after {
    content: '';
    position: absolute;
    width: 3px;
    height: 75%;
    right: 16px;
    top: 5px;
    background-color: black;


  }
  &::before {
    transform: rotate(45deg);
  }
  &::after {
    transform: rotate(-45deg);
  }
  `