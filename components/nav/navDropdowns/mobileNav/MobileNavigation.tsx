
import styled from 'styled-components'
import React, {useState} from 'react'
import CloseBtn from './CloseBtn'
import TabContainer from './TabContainer'
import WomenOrMen from './WomenOrMen'
import GoHomeTab from './GoHomeTab'

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  isOpen: boolean
}

function MobileNavigation({ setOpen, isOpen }: IProps) {

  const [isWomen, setIsWomen] = useState<boolean>(true)

  const styling = isOpen ? {
    transform: 'translateX(100vw)',
  } : {
      transform: 'translateX(0)',
  }


  const menArray = [
    {
      heading: "NEW ARRIVALS",
      picture: "https://res.cloudinary.com/dyneqi48f/image/upload/v1677291103/shorts2_f6a1zc.webp",
      alt: "placeholder image"
    },
    {
      heading: "CLOTHING",
      picture: "https://res.cloudinary.com/dyneqi48f/image/upload/v1677291103/shorts2_f6a1zc.webp",
      alt: "placeholder image"
    },
    {
      heading: "SHOES",
      picture: "https://res.cloudinary.com/dyneqi48f/image/upload/v1677291103/shorts2_f6a1zc.webp",
      alt: "placeholder image"
    },
    {
      heading: "SHIRTS",
      picture: "https://res.cloudinary.com/dyneqi48f/image/upload/v1677291103/shorts2_f6a1zc.webp",
      alt: "placeholder image"
    },
    {
      heading: "SHORTS",
      picture: "https://res.cloudinary.com/dyneqi48f/image/upload/v1677291103/shorts2_f6a1zc.webp",
      alt: "placeholder image"
    },
    {
      heading: "BRANDS",
      picture: "https://res.cloudinary.com/dyneqi48f/image/upload/v1677291103/shorts2_f6a1zc.webp",
      alt: "placeholder image"
    }
  ];
  const womenArray = [
    {
      heading: "NEW ARRIVALS",
      picture: "https://res.cloudinary.com/dyneqi48f/image/upload/v1677291103/shoe3_cf0fcr.webp",
      alt: "placeholder image"
    },
    {
      heading: "CLOTHING",
      picture: "https://res.cloudinary.com/dyneqi48f/image/upload/v1677291103/shoe3_cf0fcr.webp",
      alt: "placeholder image"
    },
    {
      heading: "SHOES",
      picture: "https://res.cloudinary.com/dyneqi48f/image/upload/v1677291103/shoe3_cf0fcr.webp",
      alt: "placeholder image"
    },
    {
      heading: "SHIRTS",
      picture: "https://res.cloudinary.com/dyneqi48f/image/upload/v1677291103/shoe3_cf0fcr.webp",
      alt: "placeholder image"
    },
    {
      heading: "SHORTS",
      picture: "https://res.cloudinary.com/dyneqi48f/image/upload/v1677291103/shoe3_cf0fcr.webp",
      alt: "placeholder image"
    },
    {
      heading: "BRANDS",
      picture: "https://res.cloudinary.com/dyneqi48f/image/upload/v1677291103/shoe3_cf0fcr.webp",
      alt: "placeholder image"
    }
  ];



  return (
    <Wrapper style={{...styling}}>
      <Container>

        <WomenOrMen setIsWomen={setIsWomen} isWomen={isWomen} /> 

        <GoHomeTab isWomen={isWomen} />

        <TabContainer tabArray={isWomen ? womenArray : menArray} />

      </Container>

      <CloseButton onClick={() => setOpen(false)}>
        <CloseBtn />
      </CloseButton>
    </Wrapper>
  )
}

export default MobileNavigation


const Wrapper = styled.nav`
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: 104;
  left: -100vw;
  transition: transform 0.3s ease-in-out;
`
const Container = styled.div`
  position: relative;
  width: calc(100% - 60px);
  height: 100%;
  background-color: white;
`
const CloseButton = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 60px;
  aspect-ratio: 1/1;
  background-color: ${({ theme }) => theme.headerTop};

  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;

  &:hover {
    border: 4px solid ${({ theme }) => theme.headerBottom};
  }
  `