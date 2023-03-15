import styled from 'styled-components'
import Image from 'next/image'
import { ClotheType } from 'lib/clothesSlice'

interface IProps {
  info: ClotheType[]
}

export default function NavMenu_LargeImageTiles({ info }: IProps) {


  let content
  content = info.map((l: ClotheType, index: number) =>
    <TheImage key={index}>
      <Image
        src={l.image}
        fill
        alt=''
      />
    </TheImage>

  )

  return (
    <Container>
      <Box>
        {content}
      </Box>
    </Container>
  )
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 90%;
  gap: 20px;
`
const Box = styled.div  `
  width: 100%;
  height: 94%;
  border-radius: 3px;
  display: flex;
  gap: 22px;
`
const TheImage = styled.div`
  width: 33%;
  height: 100%;
  border: 1px solid lightgrey;
  position: relative;

  &:hover {
    border: 1px solid green;
  }
`