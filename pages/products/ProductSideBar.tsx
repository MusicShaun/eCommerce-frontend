import styled from "styled-components"
import Image from "next/image"
import  Heart  from '@/images/heart.png'
import { ClotheType, selectAllClothes } from "lib/clothesSlice"
import { useAppSelector } from "lib/hooks/hooks"
import { selectCurrentUser, selectWishlist, useAddCartItemMutation, useAddWishListItemMutation, useGuestMutation } from "lib/userSlice"
import { useEffect, useRef, useState } from "react"
import { useHandleWishlistProcessing } from "lib/hooks/useHandleWishlistProcessing"
import { useHandleCartProcessing } from "lib/hooks/useHandleCartProcessing"
import { AuthState, Profile } from "lib/authSlice"
import { useHandleGuestProcessing } from "lib/hooks/useCreateguestUser"

export default function Sidebar({productItem}: {productItem: ClotheType}) {

  const wishlist = useAppSelector(selectWishlist)  
  const currentUser = useAppSelector(selectCurrentUser)
  const [hearted, setHearted] = useState(false)
  const selectOptionsRef = useRef<HTMLSelectElement>(null)

  const [addWistListItem] = useAddWishListItemMutation()
  const [addCartListItem] = useAddCartItemMutation()
  const [guest] = useGuestMutation()
  const handleWishlistProcessing = useHandleWishlistProcessing()
  const handleCartProcessing = useHandleCartProcessing()
  const handleGuestProcessing = useHandleGuestProcessing()

  // Write a useEffect that will focus on the useRef
  useEffect(() => {
    if (selectOptionsRef.current) {
      selectOptionsRef.current.focus()
    }
  }, [])
  
  const options = productItem.sizes.map((l, index) => (
    <option key={index} value={l}>
      {l}
    </option>))

  useEffect(() => {
    localStorage.setItem('key', JSON.stringify(currentUser))
  }, [currentUser])
  
  useEffect(() => {
    let listed = wishlist?.find((l: any) => l._id === productItem._id)
    if (listed && !hearted) {
      setHearted(true)
    } else if (!listed && hearted) {
      setHearted(false)
    }
  }, [wishlist])


 
  
  async function handleAddClotheItemToWishList(_id: string) {
    const spreadWishList = handleWishlistProcessing(_id)
    try {
      const res = await addWistListItem({
        ...spreadWishList
      }).unwrap()
      localStorage.setItem('key', JSON.stringify(res))

    } catch (err) {
      console.log(err)
    }
  }

  function doesUserExist() {
    if (currentUser) {
      return true
    } else {
      return false
    }
  }
  // create async function to handle adding item to cart 
  // uses a hook to handle the processing of the data
  // uses the addCartListItem mutation to add item to rtk
  async function handleAddClotheItemToCart(_id: string) {
    if (selectOptionsRef.current?.value === 'Choose size') {
      return alert('Please choose a size')
    } else {

      if (doesUserExist()) { // Yes they do
        const spreadCart = handleCartProcessing(_id, selectOptionsRef.current!.value)
        try {
          const res = await addCartListItem({
            ...spreadCart
          }).unwrap()
          localStorage.setItem('key', JSON.stringify(res))

        } catch (err) {
          console.log(err)
        }
      } else { // create temp empty user object
        const tempUser: Partial<Profile> = {
          given_name: '',
          surname: '',
          gender: '',
          wishlist: [],
          cart: [],
        }
        const spreadGuest = handleGuestProcessing(_id, tempUser, selectOptionsRef.current!.value)
        try {
          const res = await guest({
            ...spreadGuest
          }).unwrap()
          localStorage.setItem('key', JSON.stringify(res))

        } catch (err) {
          console.log(err)
        }
      }
    }
  }

  return (
    <Container>
      <Box>
        <Title>{productItem.name.toUpperCase()} {productItem.heading}</Title>
        
        <Price>{productItem.price}</Price>

        <SmallDarkText>COLOR: <span>{productItem.color}</span></SmallDarkText>

        <SmallDarkText>SIZE:</SmallDarkText> 
        <label htmlFor="selectSize"></label>
        <Select ref={selectOptionsRef} name='selectSize' id='selectSize' required>
          <option selected hidden>Choose size</option>
          {options}
        </Select>

        <SmallDarkText>BRAND: <span>{productItem.brand}</span></SmallDarkText>

        <ShoppingControls>
          <AddToBag onClick={() => handleAddClotheItemToCart(productItem._id)}>ADD TO BAG</AddToBag>
          <HeartContainer onClick={() => handleAddClotheItemToWishList(productItem._id)}
            style={{
            backgroundColor: hearted ? 'black' : 'lightgrey'
          }}>
            <Image
              src={Heart}
              width='18'
              height='18'
              alt=''
              style={{
                position: 'absolute',
                top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                filter: hearted ? 'invert(1)': ''

              }}
              />
          </HeartContainer>
        </ShoppingControls>

        <Conditions>
          <div>image <span>Free Delivery</span></div>
          <div>image <span>Free Returns</span></div>
            <div> Tx&Cs apply.</div>

        </Conditions>

      </Box>
    </Container>
  )
}

const Container = styled.div`
position: relative;
  height: 100%;
  width: 300px;
  max-width: 300px;
  padding: 0 10px;
  display: flex;
  justify-content: center;
  background-color: white;

`
const Box = styled.div`
  width: 240px;
  display: flex;
  flex-direction: column;

`
const Title = styled.div`
  font-size: 1.2rem;
`
const Price = styled.div`
  color: grey;
  font-size: 1.2rem;
  padding: 10px 0;
`
const SmallDarkText = styled.div`
  color: black;
  padding: 10px 0;
  & > span {
    color: #2c2c2c;
  }
`
const Select = styled.select`
  padding: 8px;
  margin-bottom: 8px;
`
const ShoppingControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items:center;

`
const AddToBag = styled.button`
  padding: 14px;
  background-color: lightgreen;
  border: none;
  color: white;
  width: 80%;

  &:hover {
    cursor: pointer;
  }
`
const HeartContainer = styled.div`
position: relative;
  width: 40px;
  aspect-ratio: 1/1;
  background-color: lightgrey;
  border-radius: 50%;
  cursor: pointer;
`
const Conditions = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  font-size: 0.8rem;
  border: 1px solid lightgrey;
   & > div {
    margin: 5px 0;
   }
`
