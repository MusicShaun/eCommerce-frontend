import { ClotheType, selectShirts, selectShoes, selectShorts } from "lib/clothesSlice"
import { useAppSelector } from "lib/hooks/hooks"
import { Dispatch, SetStateAction } from "react"
import styled from "styled-components"
import Image from "next/image"
import Link from "next/link"

interface IProps {
  handleEnterNavTab: (name: string, value: boolean ) => void 
  navMobileClothe: string;
}

export default function NavMobileDropDown({ handleEnterNavTab, navMobileClothe }: IProps) {
  
  const selectClothe: Record<string, any> = {
    'shirts': selectShirts,
    'shorts': selectShorts,
    'shoes': selectShoes
  }

  console.log(selectClothe[navMobileClothe])
  const clothes: ClotheType[] = useAppSelector(
    'shirts' ? selectShirts : 'shorts' ? selectShorts : selectShoes)

  let brands =
  clothes.map((l: ClotheType, index: number) =>
  <LIWithImage key={index}>
      <DropdownIcons>
        <Image
          src={l.image}
          fill
          alt=''
        />
      </DropdownIcons>  
      <Link href={`/products/${l.heading.replace(/' '/g, '-')}`} style={{ height: '100%', color: 'inherit', textDecoration: 'none' }}>
        {l.brand}
        </Link>
  </LIWithImage>)
    
  let styles =
  clothes.reverse().map((l: ClotheType, index: number) =>
  <LIWithImage key={index}>
      <DropdownIcons>
        <Image
          src={l.image}
          fill
          alt=''
        />
      </DropdownIcons>  
      <Link href={`/products/${l.heading.replace(/' '/g, '-')}`} style={{ height: '100%', color: 'inherit', textDecoration: 'none' }}>
        {l.heading}
        </Link>
  </LIWithImage>)
    



  return (
    <BoxContainer
      onMouseEnter={() =>
        console.log(`nav${selectClothe[navMobileClothe].charAt(0) + selectClothe[navMobileClothe].slice(1)}`)}
      
        // handleEnterNavTab(
        //   `nav${selectClothe[navMobileClothe].charAt(0) + selectClothe[navMobileClothe].slice(1)}`
        //   , true
        // )}
      onMouseLeave={() =>
        handleEnterNavTab(
          `nav${selectClothe[navMobileClothe].charAt(0) + selectClothe[navMobileClothe].slice(1)}`
          , false)}
    >
    <Box>
      <Title>Brand</Title>
      {brands}
    </Box>
      
    <Box >
      <Title>Style</Title>
      {styles}
    </Box>
      
  </BoxContainer>)
}

const BoxContainer = styled.div`
  position: absolute;
  top: 50px;
  left: 0;
  padding-top: 20px;

  display: flex;
  height: 340px;
  width: 100%;
  background-color: ${({ theme }) => theme.backgroundSecondary};
  z-index: 1;

`
const Box = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 100%;
  width: 50%;
  padding: 0px 20px;

  border-right: 1px solid lightgrey;

  &:last-child {
    border-right: none;
  }
`
const Title = styled.h3`
  text-decoration: underline;
  padding-bottom: 10px;
`
const LIWithImage = styled.li`
  text-decoration: none;
  list-style: none;
  display: flex;
  align-items: center;
  padding-bottom: 5px;
  margin-top: 10px;

  & a {
    display: flex;
    align-items: center;
    width: 60%;
    height: 100%;
    border-bottom: 1px solid lightgrey;
    margin-left: 10px;
  }
  & a:active, a:visited, a:link {
    text-decoration: none;
    color: inherit;
  }
  & a:hover {
    color: green;
  }

`
const DropdownIcons = styled.div`
  position: relative;
  min-width: 40px;
  min-height: 40px;
  display: flex;
  background-size: contain;
  border-radius: 50%;
  overflow: hidden;
`