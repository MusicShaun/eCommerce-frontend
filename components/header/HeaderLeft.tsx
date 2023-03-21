import styled from "styled-components"
import Link from "next/link"

export default function HeaderLeft() {


  return (
    <ButtonContainer>
      <Button>
      <Link href='/' as='/'><span style={{fontSize: '30px', transform: 'scaleY(1.5)'}}>baba</span></Link>  
      </Button>
      <Button>
        <Link href='/women/Women' as='/women'><span >WOMEN</span></Link>  
      </Button>
      <Button >
        <Link href='/men/Men' as='/men' ><span >MEN</span></Link>
      </Button>
    </ButtonContainer>
  )
}
const ButtonContainer = styled.div`
  width: 27%;
  margin-right: 3%;
  height: 100%;
  border-right: 1px solid ${({ theme }) => theme.headerMiddle};

  & span {
    font-weight: 500;
    font-size: ${({theme}) => theme.fontL};
    color: ${({ theme }) => theme.white};
  
  }

`
const Button = styled.button`
  height: 100%;
  width: 33.3%;
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
  
`