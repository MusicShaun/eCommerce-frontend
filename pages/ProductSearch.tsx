
import React from 'react';
import ClothesGallery from '../components/ClothesGallery';
import { useAppSelector } from 'lib/hooks/hooks';
import styled from 'styled-components';
import { selectSearchBar } from 'lib/searchBarSlice';

export default function ProductSearch() {

  const info = useAppSelector(selectSearchBar)

  return (
    <Wrapper>
      <Title>
        {info.length === 0 ? `Your search had no results` :  `${info.length} results`}
      </Title>
      <ClothesGallery info={info} />
    </Wrapper>
  )
}


const Wrapper = styled.div`
  position: absolute;
  top: 155px;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;

  `
const Title = styled.h1`
  margin-top: 50px;
  font-size: 2.2rem;
  width: 100%;
  text-align: center;
  `