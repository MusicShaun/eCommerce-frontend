
import React from 'react'
import Tabs from './Tabs'
import styled from 'styled-components'

interface ObjectType {
  heading: string
  picture: string
  alt: string
}
interface IProps {
  tabArray: ObjectType[]
}

function TabContainer({ tabArray }: IProps) {




  return (
    <Container>
      {tabArray.map((tab, index) => (
        <Tabs
          key={index}
          heading={tab.heading}
          picture={tab.picture}
          alt={tab.alt}
        />
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

  `