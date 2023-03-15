import { ClotheType, Clothes } from 'lib/clothesSlice'
import styled from 'styled-components'

interface IProps {
  info: ClotheType[]
}

export default function NavMenu_List({ info }: IProps) {
  
  let content
  content = info.map((i: ClotheType, index: number) =>
    <LISmallList key={index}>
      <a href='/'>{i.name}</a>
    </LISmallList>)
  

  return (
    <ULSmallList>
      {content}
    </ULSmallList>
  )
}
const ULSmallList = styled.ul`
  padding: 0;

`
const LISmallList = styled.li`
  text-decoration: none;
  list-style: none;
  padding: 5px;
  display: flex;
  margin-bottom: 5px;

  & a, a:active, a:visited, a:link {
    text-decoration: none;
    color: inherit;
  }
  & a:hover {
    color: green;
  }
`