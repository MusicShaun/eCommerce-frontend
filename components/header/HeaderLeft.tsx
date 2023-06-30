import styled from "styled-components"
import Link from "next/link"
import { useEffect, useState } from "react"
import { colors } from '@/config/ThemeConfig'
import { useRouter } from "next/router"

export default function HeaderLeft() {

  const [whichPage, setWhichPage] = useState('index')
  const router = useRouter()
  
  useEffect(() => {
    let url = '' 
    if (typeof window !== 'undefined') {
      url = window.location.href
    }
    const handleRouteChange = (url: string) => {
      if (url.includes('women')) {
        setWhichPage('women')
      } else if (url.includes('/men')) {
        setWhichPage('men')
      } else {
        setWhichPage('index')
      }
    }
    
      router.events.on("routeChangeComplete", handleRouteChange);
      handleRouteChange(router.asPath);
  
      return () => {
        router.events.off("routeChangeComplete", handleRouteChange);
      };
    }, [router]);

  console.log(whichPage)

  return (
    <ButtonContainer>
      <Button>
        <Link href='/' as='/'>
          <span>S's</span>
        </Link>  
      </Button>
      <Button style={whichPage === 'women' ?  {backgroundColor: colors.LIGHT_BLUE} : {}}>
        <Link href='/women/' as='/women'><span >WOMEN</span></Link>  
      </Button>
      <Button  style={whichPage === 'men' ?  {backgroundColor: colors.LIGHT_BLUE} : {}}>
        <Link href='/men/' as='/men' ><span >MEN</span></Link>
      </Button>
    </ButtonContainer>
  )
}
const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
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
    border-right: none;
  }

`
const Button = styled.button`
  height: 100%;
  width: 90px;
  border: none;
  background: none;

  & a  {
    text-decoration: none;
    &:link , :visited {
      color: white;;
    }
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