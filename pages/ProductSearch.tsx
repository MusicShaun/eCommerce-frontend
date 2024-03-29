import React from 'react';
import ClothesGallery from '../components/clothes/ClothesGallery';
import { useAppSelector } from 'lib/hooks/hooks';
import styled from 'styled-components';
import { selectSearchBar } from '@/lib/slices/searchBarSlice';

export default function ProductSearch() {

  const info = useAppSelector(selectSearchBar)


  return (
    <Wrapper>
      <Title>
        {info.length === 0 ? `Your search had no results` : `${info.length} results`}
      </Title>
      <ClothesGallery info={info} />
    </Wrapper>
  )
}


const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: calc(100% - 155px);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin-bottom: 40px;

  @media ${({ theme }) => theme.mobileL }{
    padding-bottom: 50px;
  }
  `
const Title = styled.h1`
  margin-top: 50px;
  font-size: 2.2rem;
  width: 100%;
  text-align: center;
  padding-bottom: 40px;;
  `