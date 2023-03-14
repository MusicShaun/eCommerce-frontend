import styled from "styled-components"
import Image from "next/image"
import User from '@/images/user.png'
import Heart from '@/images/heart.png'
import Bag from '@/images/bag.png'
import NavUserDropdown from "../nav/NavUserDropdown"
import { useState } from "react"
// import { selectWishList } from "lib/userSlice"
import { useAppSelector } from "lib/hooks/hooks"
import Link from "next/link"

export default function HeaderRight() {

  const [showDropdown, setShowDropdown ] = useState(false)
  // const wishlist = useAppSelector(selectWishList)  

  return (
    <ButtonContainer>
      <Button
      >
        <Image
          src={User}
          width='30'
          height='30'
          style={{ filter: 'invert(1)' }}
          alt=''
        />
        <DropdownContainer>
          <NavUserDropdown />
        </DropdownContainer>
        
      </Button>

      <Button>
        <Link href='/user/WishList' as='wishlist'>
          <Image
            src={Heart}
            width='30'
            height='30'
            style={{ filter: 'invert(1)' }}
            alt=''
          /> 
            {/* <HeartNumber>{wishlist.length}</HeartNumber> */}
        </Link>
      </Button>

      <Button>
        <Image
          src={Bag}
          width='30'
          height='30'
          style={{ filter: 'invert(1)' }}
          alt=''
        />

      </Button>
    </ButtonContainer>
  )
}
const ButtonContainer = styled.div`
  width: 12%;
  height: 100%;
  display: flex;

`
const Button = styled.div`
  position: relative;
  height: 100%;
  width: 60px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:first-child:hover {
    & > div {
      height: 350px;
    }
    & > div > div:last-child {
      transform: translateY(0px);
      transition: transform 0.5s cubic-bezier(0.31, 0.71, 0.56, 0.98) height 0.5s cubic-bezier(0.31, 0.71, 0.56, 0.98); // in
    }
  }
`
const DropdownContainer = styled.div`
  position: absolute;
  top: 60px;
  width: 280px;
  height: 0px;
  overflow: hidden;
  transition:  height 0.5s cubic-bezier(0.31, 0.71, 0.56, 0.98) 0.4s; // in
  z-index: 3000;
`
const HeartNumber = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: white;

`