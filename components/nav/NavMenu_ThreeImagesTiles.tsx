import styled from "styled-components"
import Image from "next/image"

interface IProps {
  info: any
}
export default function NavMenu_ThreeImageTiles({info}: IProps) {

  let content = info.map((item: any, index: number) => 
    <Box key={index}  >
      <TheImage >
        <Image
          src={item}
          fill
          alt=''
          />
      </TheImage>
    </Box>
  )


  return (
    <Container>
      {content}
    </Container>
  )
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: space-around;
  width: 100%;
  height: 85%;
  gap: 20px;
`
const Box = styled.div  `
  position: relative;
  width: 100%;
  height: 30%;
  border:2px solid lightgrey;
  border-radius: 3px;
`
const TheImage = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  &:hover {
    border: 1px solid green;
  }
`