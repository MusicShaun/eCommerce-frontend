import styled from 'styled-components'
import shoe from '../images/shoe.jpeg'

interface IProps {
  info: object 
}

export default function NavMenu_ListWithIcons({ info }: IProps) {

  let clothesInfo = Object.values(info)
  let content = clothesInfo.map((item: string, index: number) =>
    <LIWithImage key={index}>
      <DropdownIcons /> {/* put images heree */}
      <a href='/'>{item}</a>  
    </LIWithImage>)
  

  return (
    <ULWithImage>
      {content}
    </ULWithImage>
  )
}

const ULWithImage = styled.ul`
  padding: 0;
  display: flex;
  flex-direction: column;
`
const LIWithImage = styled.li`
  text-decoration: none;
  list-style: none;
  display: flex;
  align-items: center;
  padding-bottom: 5px;

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
}
`
const DropdownIcons = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  background-size: contain;
  border-radius: 50%;
`