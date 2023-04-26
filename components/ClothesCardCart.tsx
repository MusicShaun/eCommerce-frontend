import styled from "styled-components"
import Image from 'next/image'
import Link from 'next/link'




interface IProps {
  info: any
  deleteClothingItem: (_id: string) => any
  handleAddClotheItemToCart: (_id: string, sizes: string) => any
}
export default function Product_Tile({info, deleteClothingItem, handleAddClotheItemToCart}: IProps) {
 
  const cart = info
  let url = cart.heading ? cart.heading.replace(/' '/g, '-') : ''

  return (
    <Tile>
      <DeleteItem onClick={ () => deleteClothingItem(info._id)}>
          <div></div>
          <div></div>
      </DeleteItem>
      <Count>
          {cart.count}
      </Count>
      <AddItem onClick={ () => handleAddClotheItemToCart(info._id, info.sizes)}>
          <div></div>
          <div></div>
      </AddItem>
      
      <Link href={`/products/${url}`} style={{height: '100%', color: 'inherit', textDecoration: 'none'}}>

        <PicturePlacement>
          <Image src={cart.image} alt='' width={100} height={100} /> 
        </PicturePlacement>

        <Header>
          <h3>{cart.name}</h3>
          <p>{cart.heading}</p>
          <p>{cart.brand}</p>
          <p>{cart.color}</p>
        </Header>

        <Size>
          <p>{cart.sizes}</p>
        </Size>
        <Size>
          {cart.price} 
        </Size>

      </Link>
    
    </Tile>
    )
}


const Tile = styled.div`
  position: relative;
  width: 100%;
  height: 100px;
  margin: 12px ;
  cursor: pointer;
  text-decoration: none;
  color: black; 

  border-bottom: 0.5px solid ${({theme}) => theme.black};
  & > a {
    display: flex;
    flex-direction: row;
  }
`
const DeleteItem = styled.div`
  position: absolute;
  top: 0;
  right: 60px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  & div:first-child {
    position: absolute;
    border-right: 10px solid ${({ theme }) => theme.error};
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
  }
`
const AddItem = styled.div`
  position: absolute;
  top: 0;
  right: 0px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  & div:first-child {
    position: absolute;
    border-left: 10px solid ${({ theme }) => theme.success};
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
  }

`

const PicturePlacement = styled.div`
  position: relative;
  width: 100px;
  height: 100%;


`
const Header = styled.div`
  padding: 10px;
  width: 50%;

  & h3 {
    margin: 0px;
    padding: 0;    
  }
`
const Size = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: flex-end;
  font-size: ${({ theme }) => theme.fontML};
  padding-bottom: 10px;
`
const Count = styled.div`
  position: absolute;
  right: 30px;
  width: 30px;
  height: 30px;
  font-size: ${({ theme }) => theme.fontML};
  border: 1px solid ${({ theme }) => theme.black};
  padding: 5px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

`



