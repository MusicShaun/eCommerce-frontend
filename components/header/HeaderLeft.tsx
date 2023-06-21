import styled from "styled-components"
import Link from "next/link"
import Image from "next/image"
import logo from "@/public/logo_mini.webp"

export default function HeaderLeft() {


  return (
    <ButtonContainer>
      <Button>
        <Link href='/' as='/'>
          <Image src={logo} width={60} height={60} alt=""/>
        </Link>  
      </Button>
      <Button>
        <Link href='/women/' as='/women'><span >WOMEN</span></Link>  
      </Button>
      <Button >
        <Link href='/men/' as='/men' ><span >MEN</span></Link>
      </Button>
    </ButtonContainer>
  )
}
const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  width: 27%;
  min-width: 300px;
  margin-right: 3%;
  height: 100%;
  border-right: 1px solid ${({ theme }) => theme.headerMiddle};

  @media ${({ theme }) => theme.mobileS} {
    min-width: auto;
    margin-right: auto;
  }
  & span {
    font-weight: 500;
    font-size: ${({theme}) => theme.fontL};
    color: ${({ theme }) => theme.white};
  }

  @media ${({ theme }) => theme.tablet} {
    min-width: 280px;
  }
  @media ${({ theme }) => theme.tablet} {
    border-right: none;
  }
  @media ${({ theme }) => theme.mobileS} {
    min-width: 100px;
  }
`
const Button = styled.button`
  height: 100%;
  width: 33.3%;
  min-width: 102px;
  border: none;
  background: none;

  & a  {
    text-decoration: none;
    }
  & span {
    letter-spacing: 2px
  }
  &:hover {
    background-color: ${({ theme }) => theme.backgroundSecondary};  
    color: ${({ theme }) => theme.headerTop};
  }
  &:hover span {
      color: ${({ theme }) => theme.headerTop};
    }

  @media ${({ theme }) => theme.tablet} {
    min-width: 90px;
  }
  &:first-child {
    background-color: ${({ theme }) => theme.headerBottom};
  }
  &:nth-child(2), :nth-child(3) {
    @media ${({ theme }) => theme.mobileS} {
      display: none;
    }

    & span {
      @media ${({ theme }) => theme.tablet} {
        font-size: ${({theme}) => theme.fontML}
      }
    }
  } 
  
`