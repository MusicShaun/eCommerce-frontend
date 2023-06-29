
import React, { Dispatch, SetStateAction } from 'react'
import Tabs from './Tabs'
import styled from 'styled-components'
import Link from 'next/link'

interface ObjectType {
  heading: string
  picture: string
  alt: string
  link: string

}
interface IProps {
  tabArray: ObjectType[]
  setOpen: Dispatch<SetStateAction<boolean>>
}

function TabContainer({ tabArray, setOpen }: IProps) {




  return (
    <Container>
      {tabArray.map((tab, index) => ( 
        <Link href={tab.link} title={tab.link} onClick={() => setOpen(false)}>
          <Tabs
            key={index}
            heading={tab.heading}
            picture={tab.picture}
            alt={tab.alt}
            />
        </Link>
      ))}
    </Container>
  )
}

export default TabContainer


const Container = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  & a {
    width: 100%;
    height: 100%;
    text-decoration: none;

    &:hover {
      background-color: inherit;
    }

    &:active > div{
      border: 3px solid ${({ theme }) => theme.headerBottom};
      box-sizing: border-box;
    }
  }

  `
