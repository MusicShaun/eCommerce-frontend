import React, { useRef, useState } from 'react'
import styled from 'styled-components'


export default function PriceSlider() {

  const [min, setMin ] = useState(10)
  const [max, setMax] = useState(500)
  const minRef = useRef(null)
  const maxRef = useRef(null)

  // SET MIN AND MAX VALUES
  // IF SLIDERS GO PAST ONE ANOTHER, SWAPS VALUES
  function validateRange(minRef, maxRef) {
    let minValue = minRef.current.value;
    let maxValue = maxRef.current.value;

    console.log(minValue, maxValue)
    if (minValue > maxValue) {
      let tempValue = maxValue;
      maxValue = minValue;
      minValue = tempValue;
    }
    setMin(minValue)
    setMax(maxValue)
  }


  return (

    <SliderWrapper>
      <SmallDarkText>Price: </SmallDarkText>
      <SpaceEm>
        <SmallDarkText>{min}</SmallDarkText>
        <SmallDarkText>{max} </SmallDarkText>
      </SpaceEm>
      <SliderContainer>
        <label htmlFor='min'></label>
        <input ref={minRef} id='min' type="range" min="10" max='500' step="5"
          onChange={() => validateRange(minRef, maxRef)}
          />
        <label htmlFor='max'></label>
        <input ref={maxRef} id='max' type="range" min="10" max='500' step="5"
           onChange={() => validateRange(minRef, maxRef)}
          />
      </SliderContainer>
    </SliderWrapper>
  )
}



const SliderWrapper = styled.div`
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