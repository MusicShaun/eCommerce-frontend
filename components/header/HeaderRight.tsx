import styled from "styled-components"
import Image from "next/image"
import NavUserDropdown from "../nav/navDropdowns/NavUserDropdown"
import { useEffect, useRef, useState } from "react"
import { useAppSelector } from "lib/hooks/hooks"
import Link from "next/link"
import { selectUser } from "@/lib/slices/userSlice"
import { RootState } from "@/lib/store"
import PersonIcon from "../icons/PersonIcon"
import HeartIcon from "../icons/HeartIcon"
import CartIcon from "../icons/CartIcon"
import HeartSVG from '@/public/heart-svg.svg'
import CartSVG from '@/public/bag-svg.svg'
import UserSVG from '@/public/user-svg.svg'

import useLocalStorage from "@/lib/hooks/useGetLocalStorage"

export default function HeaderRight() {

  const [showDropdown, setShowDropdown] = useState(false)
  const userEmail = useAppSelector(state => state.auth.email)
  const currentUser =  useAppSelector((state: RootState) => selectUser(state, userEmail))
  const wishlist = currentUser?.wishlist || []
  const cart = currentUser?.cart || []
  const triangleRef = useRef<HTMLImageElement>(null); 
  const [trianglePosition, setTrianglePosition] = useState({ x: 0 })
  const [windowSize, setWindowSize] = useState({ X: 0 })

  const ICON_SIZE = 27

  let myAccountBtnLink = {destination: '/login', as: '/login'}
  const checkTokenExistence =   typeof localStorage !== 'undefined' ?  localStorage.getItem('authState') : null
  if (checkTokenExistence && Object.keys(checkTokenExistence).length > 0) myAccountBtnLink = {destination: '/user/MyAccount', as: '/account'}


  // Get position of ref and apply its x coordinates to the triangle
  // Then add event listener to window to detect resize and reposition triangle
  useEffect(() => {
    if (!triangleRef.current) return;

    const observer = new ResizeObserver(() => {
      if (triangleRef.current) {
        const { x, y } = triangleRef.current!.getBoundingClientRect();
        x < 1120
          ? setTrianglePosition({ x })
          : setTrianglePosition({ x: 1120 })
      }
    });
    const handleResize = () => setWindowSize({ X: window.innerWidth });

    window.addEventListener("resize", handleResize);
    observer.observe(triangleRef.current);
    
    return () => {
      observer.disconnect()
      window.removeEventListener("resize", handleResize)
    }
  }, [windowSize]);



  return (<>
    <LittleArrow
      style={{ left: `${trianglePosition.x}px`, opacity: showDropdown ? '1' : '0' }}
      onMouseEnter={() => setShowDropdown(true)}
    />
    
    <ButtonContainer>
      <Button
        onMouseEnter={() => setShowDropdown(true)}
        onMouseLeave={() => setShowDropdown(false)}
      >
        <Image
          src={UserSVG}
          width={ICON_SIZE}
          height={ICON_SIZE}
          alt=''
          ref={triangleRef}
        />
        <DropdownContainer>
          <NavUserDropdown /> 
        </DropdownContainer>
      </Button>

      
      <ButtonMobile>
        <Link href={myAccountBtnLink.destination} as={myAccountBtnLink.as}>
          <Image
            src={UserSVG}
            width={ICON_SIZE}
            height={ICON_SIZE}
            alt='user account icon'
          /> 
        </Link>
      </ButtonMobile>
      <ButtonMobile>
        <Link href='/user/WishList' as='wishlist'>
          <Image
            src={HeartSVG}
            width={ICON_SIZE}
            height={ICON_SIZE}
            alt='wishlist icon'
          /> 
          </Link>
      </ButtonMobile>
      <ButtonMobile>
        <Link href='/user/Cart' as='cart'>
          <Image
            src={CartSVG}
            width={ICON_SIZE}
            height={ICON_SIZE}
            alt='shopping cart icon'
          />
          </Link>
      </ButtonMobile>
      
      <Button>
        <Link href='/user/WishList' as='wishlist'>
          <Image
            src={HeartSVG}
            width={ICON_SIZE}
            height={ICON_SIZE}
            alt='wishlist icon'
          /> 
            <HeartNumber>{wishlist.length}</HeartNumber>
        </Link>
      </Button>

      <Button>
        <Link href='/user/Cart' as='cart'>
          <Image
            src={CartSVG}
            width={ICON_SIZE}
            height={ICON_SIZE}
            alt='shopping cart icon'
          />
            <HeartNumber>{cart.length}</HeartNumber>
          </Link>
        </Button>
        
    </ButtonContainer>
    </>
  )
}
const ButtonContainer = styled.div`
  min-width: 120px;
  height: 100%;
  display: flex;
  flex-grow: 0.5;

  @media ${({ theme }) => theme.tablet} {
    width: auto;
  }
  @media ${({ theme }) => theme.mobileL} {
    width: auto;
  }

`
const LittleArrow = styled.div`
  position: absolute;
  border-left: 12px solid transparent;
  border-right: 12px solid transparent;
  border-bottom: 12px solid ${({ theme }) => theme.white};
  top: 48px;
  transition: opacity 0.5s ease-out 0.6s;

  @media ${({ theme }) => theme.mobileL} {
    display: none;
  }
`
const Button = styled.div`
  position: relative;
  height: 100%;
  width: 40px;
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
  &:hover {
    cursor: pointer;
  }

  @media ${({ theme }) => theme.mobileL} {
    display: none;
  }
`
const ButtonMobile = styled.div`
  display: none;
  @media ${({ theme }) => theme.mobileL} {
    display: flex;
    position: relative;
    height: 100%;
    width: 45px;
    justify-content: center;
    align-items: center;
    
    & div {
      width: 24px;
    }
    &:active {
      border: 2px solid ${({ theme }) => theme.headerBottom};
      border-radius: 5px;
    }
  }
  `

const DropdownContainer = styled.div`
  position: absolute;
  top: 60px;
  width: 208px;
  height: 0px;
  transition:  height 0.5s cubic-bezier(0.31, 0.71, 0.56, 0.98) 0.4s;  // in
  z-index: 000;
  overflow: hidden;

  @media ${({ theme }) => theme.mobileL} {
    display: none;
  }
`
const HeartNumber = styled.div`
  position: absolute;
  top: 20px;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  font-size: ${({ theme }) => theme.fontM};
  color: ${({ theme }) => theme.white};


  @media ${({ theme }) => theme.mobileL} {
    display: none;
  }

`