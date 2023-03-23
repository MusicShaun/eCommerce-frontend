import { ClotheType } from 'lib/clothesSlice'
import React, { FormEvent, SetStateAction, useRef, useState } from 'react'
import styled from 'styled-components'

interface IProps {
  priceRange: number[]
  setPriceRange: React.Dispatch<SetStateAction<number[]>>
}

export default function PriceSlider({ priceRange, setPriceRange } : IProps) {

  const minRef = useRef<HTMLInputElement>(null)
  const maxRef = useRef<HTMLInputElement>(null)

  // SET MIN AND MAX VALUES
  // IF SLIDERS GO PAST ONE ANOTHER, SWAPS VALUES
  // Convert intial values to numbers
  function validateRange(minRef: any, maxRef: any) {
    let minValue = Number(minRef.current.value);
    let maxValue = Number(maxRef.current.value);

    if (minValue > maxValue) {
      let tempValue = maxValue;
      maxValue = minValue;
      minValue = tempValue;
    }
    setPriceRange([minValue, maxValue])
  }


  return (

    <SliderWrapper >
      <SmallDarkText>Price: </SmallDarkText>
      <SpaceEm>
        <SmallDarkText>{priceRange[0]}</SmallDarkText>
        <SmallDarkText>{priceRange[1]} </SmallDarkText>
      </SpaceEm>
      <SliderContainer>
        <label htmlFor='min'></label>
        <input ref={minRef} id='min' type="range" min="10" max='500' step="10" defaultValue='10'
          onChange={() => validateRange(minRef, maxRef)}
          />
        <label htmlFor='max'></label>
        <input ref={maxRef} id='max' type="range" min="10" max='500' step="10" defaultValue='500'
           onChange={() => validateRange(minRef, maxRef)}
          />
      </SliderContainer>
    </SliderWrapper>
  )
}



const SliderWrapper = styled.form`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
`
const SpaceEm = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const SliderContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;

  & input[type=range]  {
    position: absolute;
    left: 5%;
    -webkit-appearance: none;
    width: 90%;
    background: transparent; 
  }
  & input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 15px;
    width: 15px;
    border-radius: 50%;
    background: #36b37e;
    cursor: pointer;
    margin-top: -5px;
    position: relative;
    z-index: 1;
  }
  & input[type=range]::-webkit-slider-runnable-track {
    width: 100%;
    height: 5px;
    background: #e8e8e8;
    border-radius: 3px;
    border: none;
  }
`
  const SmallDarkText = styled.div`
  color: black;
  padding: 10px 0;
`