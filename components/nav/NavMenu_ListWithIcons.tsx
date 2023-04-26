import styled from 'styled-components'
import { ClotheType } from 'lib/clothesSlice'
import Image from 'next/image'
import Link from 'next/link'
interface IProps {
  info: ClotheType[] 
}

export default function NavMenu_ListWithIcons({ info }: IProps) {

  let content =
    info.map((l: ClotheType, index: number) =>
    <LIWithImage key={index}>
        <DropdownIcons>
          <Image
            src={l.image}
            fill
            alt=''
          />
        </DropdownIcons>  
        <Link href={`/products/${l.heading.replace(/' '/g, '-')}`} style={{ height: '100%', color: 'inherit', textDecoration: 'none' }}>
          {l.heading}
          </Link>
    </LIWithImage>)
  

  return (
    <ULWithImage>
      {content}
    </ULWithImage>
  )
}

const ULWithImage = styled.ul`
  padding: 0;
  display: flex;
  flex-direction: column;
`
const LIWithImage = styled.li`
  text-decoration: none;
  list-style: none;
  display: flex;
  align-items: center;
  padding-bottom: 5px;

  & a {
    display: flex;
    align-items: center;
    width: 60%;
    height: 100%;
    border-bottom: 1px solid lightgrey;
    margin-left: 10px;
  }
  & a:active, a:visited, a:link {
    text-decoration: none;
    color: inherit;
  }
  & a:hover {
    color: green;
  }
`

const DropdownIcons = styled.div`
  position: relative;
  min-width: 40px;
  min-height: 40px;
  display: flex;
  background-size: contain;
  border-radius: 50%;
  overflow: hidden;
`