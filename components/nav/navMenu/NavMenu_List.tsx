import { ClotheType, Clothes } from '@/lib/slices/clothesSlice'
import Link from 'next/link'
import styled from 'styled-components'

interface IProps {
  info: ClotheType[]
}

export default function NavMenu_List({ info }: IProps) {
  
  


  let content
  content = info.map((i: ClotheType, index: number) => 
    <LISmallList key={index}>
      <Link href={`/products/${i.heading.replace(/\s/g, '-')}`} style={{ height: '100%', color: 'inherit', textDecoration: 'none' }}>
        {i.name}
      </Link>
    </LISmallList >
    )
  

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