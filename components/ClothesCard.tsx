import styled, {keyframes} from "styled-components"
import Image from 'next/image'
import { ClotheType } from 'lib/clothesSlice'
import heart from '../images/hearty.png'
import { useAppSelector } from 'lib/hooks/hooks'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { selectWishlist } from 'lib/userSlice'
import heartOutline from '@/images/heart-outline.svg'
import heartFilled from '@/images/heart-filled.svg'

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
  const [heartAnimation, setHeartAnimation] = useState(false)

  useEffect(() => {
    let listed = wishlist?.find((l: any) => l._id === info._id)
    if (listed && !hearted) {
      setHearted(true)
    } else if (!listed && hearted) {
      setHearted(false)
    }
  }, [wishlist])
  
  let url = info.heading.replaceAll(' ', '-')

  function handleHeartAnimation() {
    setHeartAnimation(true)
    const timer = setTimeout(() => {
      setHeartAnimation(false)
    }, 2000)
    return () => clearTimeout(timer)
  }
  console.log(heartAnimation)
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
      
      <AddToWishList onClick={() => handleAddClotheItemToWishList(info._id)}>
        <Image
          onClick={handleHeartAnimation}
            src={!hearted ? heartOutline : heartFilled}
            alt=''
            fill
            sizes="(width: 100%, height: 100%)"
          />
        <Image
            style={{display: heartAnimation ? 'flex' : 'none'}}
            src={ heartFilled}
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
const wiggle = 
  keyframes`
    0% {
      transform: rotate(0deg) scale(1.2) translateY(2px) ;
    } 20% {
      transform: rotate(-10deg) scale(1.2) translateY(2px);
    } 40% {
      transform: rotate(10deg) scale(1.2) translateY(2px);
    } 60% {
      transform: rotate(-10deg)scale(1.2) translateY(2px);
    } 80% {
      transform: rotate(10deg)  translateY(2px);
    } 100% {
      transform: rotate(-10deg) scale(1.2) translateY(2px);
    }
  `
const heartAnimation = keyframes`
  from {
    transform: scale(1) ;
    opacity: 1;
  } to {
    transform: scale(15);
    opacity: 0;
    display: none;
  }
`
const AddToWishList = styled.div`
  position: absolute;
  top: 68%;
  right: 2%;

  width: 50px;
  height: 50px;
  background-color: ${({ theme }) => theme.lightGrey};
  border-radius: 50%;
  

  & img {
    transform: translateY(2px);
    object-fit: contain;
    transition: transform 0.2s ease-in-out;
    z-index: 100;
  }
  &:hover img:first-child  {
    transform: scale(1.2) translateY(2px);
    animation: ${wiggle} 1s ease-in-out infinite 0.2s alternate;
    transition: transform 0.2s ease-in-out;
  } 
  & > img + img {
    animation: ${heartAnimation} 0.6s ease-in-out 1;
    animation-fill-mode: forwards;
  } 
`



