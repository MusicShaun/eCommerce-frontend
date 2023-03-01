import shoe from '../images/shoe.jpeg'
import styled from "styled-components"
import Image from 'next/image'
import { ClotheType } from 'lib/clothesSlice'
import heart from '../images/hearty.png'

interface IProps {
  info: ClotheType
  containerWidth: number
}

export default function Product_Tile({ info, containerWidth }: IProps) {

  //! The heart needs to be a state that can stay selected from localstate

  return (
    <Tile>
      <PicturePlacement>
        <Image src={info.image} alt='' fill sizes="(width: 100%, height: 100%)"/> 
      </PicturePlacement>

      <Header>
        <h3>{info.heading}</h3>
      </Header>

      <BottomP>
        {info.price} 
        <span> {info.price} </span>
      </BottomP>

      <AddToWishList>
        <Image
          src={heart}
          alt=''

        />
      </AddToWishList>
    </Tile>
    )
}


const Tile = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  
  width: 100%;
  height: 100%;
  margin: 12px ;
  aspect-ratio: 2/3;
  flex: 1;
  cursor: pointer;
  text-decoration: none;
  color: black; 

`
const PicturePlacement = styled.div`
  position: relative;
  width: 100%;
  height: 80%;


`
const Header = styled.div`
  padding: 10px;

  & h3 {
    margin: 0px;
    padding: 0;    
  }
`

const BottomP = styled.div`
  margin: 0; 
  padding: 0px 10px;

  & span {
    color: red;
    font-weight: bold;
  }
`

const AddToWishList = styled.div`
  position: absolute;
  top: 68%;
  right: 2%;

  width: 50px;
  height: 50px;
  background-color: white;
  border-radius: 50%;

  &:hover {
    filter: invert(1)
  }
`

