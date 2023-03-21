import styled from "styled-components"
import Image from 'next/image'
import { ClotheType } from 'lib/clothesSlice'
import heart from '../images/hearty.png'
import { useAppSelector } from 'lib/hooks/hooks'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { selectWishlist } from 'lib/userSlice'

interface IProps {
  info: ClotheType
  handleAddClotheItemToWishList: (_id: string) => void
}

export const getStaticProps = async () => {
  const res = await fetch('http://localhost:5000/api/asos/getshirts')
  const data = await res.json()

  return {
    props: { products: data },
    
  }
}

export default function Product_Tile({ info, handleAddClotheItemToWishList }: IProps) {

  const [hearted, setHearted] = useState(false)
  const wishlist = useAppSelector(selectWishlist)  
  
  useEffect(() => {
    let listed = wishlist?.find((l: any) => l._id === info._id)
    if (listed && !hearted) {
      setHearted(true)
    } else if (!listed && hearted) {
      setHearted(false)
    }
  }, [wishlist])
  
  let url = info.heading.replaceAll(' ', '-')

  return (
    <Tile>
      <Link href={`/products/${url}`} style={{height: '100%', color: 'inherit', textDecoration: 'none'}}>
        
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
      </Link>
      
      <AddToWishList onClick={() => handleAddClotheItemToWishList(info._id)}
          style={{ filter: hearted ? 'invert(1)' : ''}}  
        >
          <Image
            src={heart}
            alt=''
            fill
            sizes="(width: 100%, height: 100%)"

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
    filter: invert(0.1)
  }
`

