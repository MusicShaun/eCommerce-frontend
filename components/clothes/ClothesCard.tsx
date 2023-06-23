import styled, {css, keyframes} from "styled-components"
import Image from 'next/image'
import { ClotheType } from '@/lib/slices/clothesSlice'
import { useAppSelector } from 'lib/hooks/hooks'
import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import {  selectUser } from '@/lib/slices/userSlice'
import heartOutline from '@/public/heart-outline.svg'
import heartFilled from '@/public/heart-filled.svg'
import { RootState } from "@/lib/store"
import React from "react"

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

function Product_Tile({ info, handleAddClotheItemToWishList }: IProps) {

  const [hearted, setHearted] = useState(false)
  const userEmail = useAppSelector(state => state.auth.email)
  const currentUser =  useAppSelector((state: RootState) => selectUser(state, userEmail))
  const wishlist = currentUser?.wishlist
  const [triggerAnimation, setTriggerAnimation] = useState(false)
  

  useEffect(() => {
    let listed = wishlist?.find((l: any) => l._id === info._id)
    if (listed && !hearted) {
      setHearted(true)
    } else if (!listed && hearted) {
      setHearted(false)
    }
  }, [wishlist])
  
  let url = info.heading ? info.heading.replace(/\s/g, '-') : '' 

  function handleHeartAnimation() {
    setTriggerAnimation(true)
    const timer = setTimeout(() => { //!   turn back on 
      setTriggerAnimation(false)
    }, 2000)
    return () => clearTimeout(timer)
  }


  return (
    <Tile>
      <Link href={`/products/${url}`} style={{height: '100%', color: 'inherit', textDecoration: 'none'}}>
        
        <PicturePlacement>
          <Image src={info.image} alt='' fill sizes="(width: 100%, height: 100%)"
          style={{ objectFit: "contain"}}/> 
        </PicturePlacement>

        <Header>
          <h3>{info.heading}</h3>
        </Header>

        <BottomP>
          {info.price} 
          <span> {info.price} </span>
        </BottomP>
      </Link>
      
      <AddToWishList onClick={() => {handleAddClotheItemToWishList(info._id), setHearted(prev => !prev)}}>
        <Image
          onClick={handleHeartAnimation}
            src={!hearted ? heartOutline : heartFilled}
            alt=''
            fill
            sizes="(width: 100%, height: 100%)"
          />
        <Image
            style={{display: triggerAnimation ? 'flex' : 'none'}}
            src={ heartFilled}
            alt=''
            fill
            sizes="(width: 100%, height: 100%)"
        />
        <Image
            style={{display: triggerAnimation ? 'flex' : 'none'}}
            src={ heartFilled}
            alt=''
            fill
            sizes="(width: 100%, height: 100%)"
        />
        <Image
            style={{display: triggerAnimation ? 'flex' : 'none'}}
            src={ heartFilled}
            alt=''
            fill
            sizes="(width: 100%, height: 100%)"
          />
        </AddToWishList>
    </Tile>
    )
}
const memoizedProductTile = React.memo(Product_Tile)
export default memoizedProductTile


const Tile = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  
  width: 100%;
  height: 100%;
  max-width: 380px;
  min-width: 250px;
  margin: 12px 0;
  aspect-ratio: 2/3;
  flex: 1;
  cursor: pointer;
  text-decoration: none;
  color: black; 

  @media ${({ theme }) => theme.mobileL} {
    min-width: 0;
  }
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

  @media ${({ theme }) => theme.mobileL} {
    font-size: 1rem;
    font-weight: 500;
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
  0% {
    opacity: 1;
    left: -15px;
    transform: translate(-0px, -0px) scale(0.4);
  } 25% {
    transform: translate(-2px, -5px) scale(0.4);
  } 50% {
    opacity: 1;
    transform: translate(-8px, -8px) scale(0.4);
  } 75% {
    transform: translate(-15px, -10px) scale(0.4);
  } 100% {
    left: -15px;
    transform: translate(-20px, -20px) scale(0.4);
    opacity: 0;
    display: none;
  }
`
const heartAnimation2 = keyframes`
  0% {
    opacity: 1;
    left: 15px;
    transform: translate(0px, 0px) scale(0.2);
  } 25% {
    transform: translate(2px, 5px) scale(0.2);
  } 50% {
    opacity: 1;
    transform: translate(8px, 8px) scale(0.2);
  } 75% {
    transform: translate(15px, 10px) scale(0.2);
  } 100% {
    left: 15px;
    transform: translate(20px, 15px) scale(0.2);
    opacity: 0;
    display: none;
  }
  `
  const heartAnimation3 = keyframes`
  0% {
    opacity: 1;
    top: 15px;
    transform: translate(0px, 0px) scale(0.28);
  } 20% {
    transform: translate(3px, 8px) scale(0.28);
  } 40% {
    opacity: 1;
    transform: translate(-2px, 10px) scale(0.28);
  } 80% {
    transform: translate(-8px, 12px) scale(0.28);
  } 100% {
    top: 15px;
    transform: translate(-10px, 16px) scale(0.28);
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
  background-color: rgba(207, 207, 207, 0.577);
  border-radius: 50%;
  
  cursor: pointer;

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
    animation: ${heartAnimation} 1s ease-in-out 1;
    animation-fill-mode: forwards;
  } 
  & > img + img + img {
    animation: ${heartAnimation2} 2s ease-in-out 1;
    animation-fill-mode: forwards;
  } 
  & > img + img + img + img {
    animation: ${heartAnimation3} 2.2s ease-in-out 1;
    animation-fill-mode: forwards;
  } 
`



