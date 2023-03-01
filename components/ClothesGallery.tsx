
import styled from "styled-components"
import ClothesCard from "./ClothesCard"
import { useState, useEffect } from 'react'
import { ClotheType } from "lib/clothesSlice"

interface IProps { 
  info: unknown[]
}

export default function ClothesGallery({ info }: IProps) {
  
  const [theWidth, setTheWidth] = useState<number>(33)

 //* ADJUST SIZE OF TILES PER PAGE WIDTH
  // useEffect(() => {
  //   if (onlyWidth > 1080) {
  //     setTheWidth(25)
  //   } else if (onlyWidth > 810) {
  //     setTheWidth(33)
  //   } else if (onlyWidth > 570) {
  //     setTheWidth(40)
  //   } else  {
  //     setTheWidth(51)
  //   }
  // }, [onlyWidth])

 

  let content
  if (info) {
    content =
      <Box >
      {
        info.map((item: any, index: number) =>
          <ClothesCard info={item} key={index} containerWidth={theWidth} />)
      }
      </Box>
  }

  return (
   
    <Wrapper>
      <Container>
        {content}
      </Container>
      </Wrapper>

  )
}

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Container = styled.div`
  max-width: 1300px;
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Box = styled.div`
  width: 100%;
  height: auto;
  
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 290px));
  grid-template-rows: auto;
  justify-content: center;

  padding: 20px;
  margin: auto 0px;
  gap: 20px;


`
