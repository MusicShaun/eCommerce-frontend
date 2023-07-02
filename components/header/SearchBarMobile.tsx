import styled, { useTheme } from "styled-components";
import Image from "next/image";
import React, { useState } from 'react'
import Magnifying from '@/public/magnifying.webp'
import { selectAllClothes } from "@/lib/slices/clothesSlice";
import { useAppDispatch, useAppSelector } from "lib/hooks/hooks";
import { updateSearchBar } from "@/lib/slices/searchBarSlice";
import router from "next/router";
import { colors } from "@/config/ThemeConfig";

export default function SearchBarMobile({setShowSearch}: {setShowSearch: React.Dispatch<React.SetStateAction<boolean>>}) {
  
  const dispatch = useAppDispatch()
  const clothes = useAppSelector(selectAllClothes)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [userTyping, setUserTyping] = useState(false)
  const [searchComponent, setSearchComponent] = useState(<></>)

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
        dispatch(updateSearchBar(clothes))
        inputRef.current!.value = ''
        setSearchComponent(<></>)
        setShowSearch(false)
        setUserTyping(false)

    } else { // NAVIGATE TO RESULTS 
      dispatch(updateSearchBar(filteredClothes))
      setUserTyping(false)
      inputRef.current!.value = '' 
      setSearchComponent(<></>)
      setShowSearch(false)
      router.push('/ProductSearchMobile')
    }
  }

  function handleInputChange(e: any) {
    if (e.target.value.length > 0) setUserTyping(true)
    else { return setSearchComponent(<></>), setUserTyping(false)}

    if (inputRef.current) {
      const searchInput = inputRef.current.value.trim();
      const filteredClothes = clothes.filter(clothing =>
        Object.values(clothing).some((cloth) =>
          cloth.toString().toLowerCase().includes(searchInput.toLowerCase())
        )
      )
      if (filteredClothes.length === 0) { 
        return setSearchComponent(<></>)
      } else {
        setSearchComponent(
          <UL>
            {filteredClothes.map((cloth, index) => {
              return <li key={index}>{cloth.name}</li>
            })
            }
          </UL>
        )
      }
    }
  }

  function handleCloseSearch() {
    setUserTyping(false)
    inputRef.current!.value = ''
    setSearchComponent(<></>)
    dispatch(updateSearchBar(clothes))
  }

  function handleImageClick() {
    if (inputRef.current) {
      const searchInput = inputRef.current.value.trim();
      if (searchInput) {
        handleSearch(new Event('submit'));
      }
    }
  }


  return (<>

    <Wrapper>
      <Form onSubmit={(e) => handleSearch(e)}>

        <label>SEARCH: </label>
        <Bar>
          <Input type='text' placeholder='' ref={inputRef} onChange={handleInputChange} />
          
          {userTyping ? <CloseSearch onClick={handleCloseSearch}><X></X></CloseSearch> : false}

          <ImageContainer onClick={handleImageClick}
            style={{ backgroundColor: userTyping ? colors.LIGHT_BLUE : 'transparent', }}>
            <Image
              src={Magnifying}
              width='18'
              height='18'
              alt=''
              style={{ cursor: 'pointer',
                top: '50%', left: '50%', transform: 'translate(30%, 30%)'}}
              
            />
          </ImageContainer>
        </Bar>

        {searchComponent}
    </Form>
    </Wrapper>
  </>)
}

const Wrapper = styled.div`
  display: none;
  @media ${({ theme }) => theme.mobileL}{
    display: flex;
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 100000;
    background-color: ${({ theme }) => theme.backgroundSecondary};
    padding: 0 1rem;
    transition: opacity 0.5s ease 0s;
    opacity: 1;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
  }
`

const Form = styled.form`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 2rem;

  & label {
    margin-bottom: 6px;
  }
`
const Bar = styled.div`
  position: relative;
  width: 100%;

`

const Input = styled.input`
  width: 100%;
  height: 36px;
  border-radius: 12px;
  border: none;
  padding-left: 16px;
  font-size: ${({ theme }) => theme.fontML};
  border: 2px solid ${({ theme }) => theme.headerBottom};
`

const ImageContainer = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 10px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
`

const CloseSearch = styled.div`
  position: absolute;
  right: 36px;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  z-index: 3;
  cursor: pointer;
`
const X = styled.div`
  &::before, &::after {
    content: '';
    position: absolute;
    width: 2px;
    height: 20px;
    top: 25%;
    left: 50%;
    background-color: black;

  }
  &::before {
    transform: rotate(45deg);
  }
  &::after {
    transform: rotate(-45deg);
  }
  `


const UL = styled.ul`
  position: relative;
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  margin: 1rem;
  color: ${({ theme }) => theme.text};

  & li {
    list-style: none;
    padding: 0.3rem 0;
  }
`