import styled, { keyframes} from "styled-components"
import Image from "next/image"
import { ClotheType  } from "@/lib/slices/clothesSlice"
import { useAppSelector } from "lib/hooks/hooks"
import { useEffect, useRef, useState } from "react"
import useAddClothingItem from "lib/hooks/useAddClothingItem"
import PacmanLoader from "react-spinners/PacmanLoader"
import heartOutline from '@/public/heart-outline.svg'
import heartFilled from '@/public/heart-filled.svg'
import ModalError from "../modalsAndErrors/ModalErrorWindow"
import { RootState } from "@/lib/store"
import { selectUser } from "@/lib/slices/userSlice"

const slideIn = keyframes` 
   0% {
    right: -40vw
   } 30% {
    right: -0vw
   } 60% {
    right: -0vw
   } 100% {
    right: -40vw
}
`



export default function Sidebar({ productItem }: { productItem: ClotheType }) {

  const userEmail = useAppSelector(state => state.auth.email)
  const currentUser =  useAppSelector((state: RootState) => selectUser(state, userEmail))
  const wishlist = currentUser?.wishlist || []
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [ errorMessage, setErrorMessage ] = useState('')
  const [hearted, setHearted] = useState(false)
  const selectOptionsRef = useRef<HTMLSelectElement>(null)
  const [heartAnimation, setHeartAnimation] = useState(false)

  const [ cartBtnText , setCartBtnText ] = useState('ADD TO BAG')

  const { handleAddItem, isWishLoading, isWishSuccess, isError, error } = useAddClothingItem()
  
  // error handling
  useEffect(() => {
    if (isError && error) {
      setIsModalOpen(true)
      if ('data' in error) {
        const fetchError = error as any
        setErrorMessage(fetchError.data.message ?? 'Unknown error')
      }
    }
  }, [isError, error])

  // focus on the useRef
  useEffect(() => {
    if (selectOptionsRef.current) {
      selectOptionsRef.current.focus()
    }
  }, [])
  
  // Options for the clothes size select
  const options = productItem.sizes.map((l, index) => (
    <option key={index} value={l}>
      {l}
    </option>))


  // Checks for a heart 
  useEffect(() => {
    let listed = wishlist?.find((l: any) => l._id === productItem._id)
    if (listed && !hearted) {
      setHearted(true)
    } else if (!listed && hearted) {
      setHearted(false)
    }
  }, [wishlist])


  // after these functions add a heart or cart item
  async function handleAddClotheItemToWishList(_id: string) {
    await handleAddItem(_id, 'wishlist')
  }

  async function handleAddClotheItemToCart(_id: string) {
    if (selectOptionsRef.current?.value === 'Choose size') return (
      setErrorMessage('Please choose a size'), 
      setIsModalOpen(true)
    )
    setCartBtnText('ADDED')
    await handleAddItem(_id, 'cart', selectOptionsRef.current!.value, '+')

    const timer = setTimeout(() => {
      setCartBtnText('ADD TO BAG')
    }, 10000)
    return () => clearTimeout(timer)
  }

  function handleHeartAnimation() {
    setHeartAnimation(true)
    const timer = setTimeout(() => {
      setHeartAnimation(false)
    }, 2000)
    return () => clearTimeout(timer)
  }

  function handleRequestClose() {
    setIsModalOpen(false)
  }

  const cssLoaderSpecs = {
    display: 'flex',
    zIndex: 9000,
    width: '100%',
    left: '50%',
    transform: 'translateX(-50%)',
    top: '220px',

  }


  return (<>
    <ModalError isOpen={isModalOpen} onRequestClose={() => handleRequestClose()} errorMessage={errorMessage}  />
    
    <Container>
      <Box>
        <Title>{productItem.name.toUpperCase()} {productItem.heading}</Title>
        
        <Price>{productItem.price}</Price>

        <SmallDarkText>COLOR: <span>{productItem.color}</span></SmallDarkText>

        <SmallDarkText>SIZE:</SmallDarkText>
        <label htmlFor="selectSize"></label>
        <Select ref={selectOptionsRef} name='selectSize' id='selectSize' required>
          <option value='Choose size' hidden>Choose size</option>
          {options}
        </Select>

        <SmallDarkText>BRAND: <span>{productItem.brand}</span></SmallDarkText>

        <ShoppingControls>

          <SpinnerContainer style={{display: isWishLoading ? 'flex' : 'none'}}>
            <PacmanLoader
              color={'#2d2d2d'}
              size={50}
              loading={isWishLoading }
              cssOverride={cssLoaderSpecs}
              speedMultiplier={1.5}
              />
          </SpinnerContainer>

          <CartItemAdded isWishSuccess={isWishSuccess}>
            <div>
              Item added to cart
            </div>
          </CartItemAdded>

          <AddToBag onClick={() => handleAddClotheItemToCart(productItem._id)}>{cartBtnText}</AddToBag>
          
          <AddToWishList onClick={() => {handleAddClotheItemToWishList(productItem._id), setHearted(prev => !prev)}}>
            <Image
              onClick={handleHeartAnimation}
                src={!hearted ? heartOutline : heartFilled}
                alt=''
                fill
                sizes="(width: 18px, height: 18px)"
              />
            <Image
                style={{display: heartAnimation ? 'flex' : 'none'}}
                src={ heartFilled}
                alt=''
                fill
                sizes="(width: 18px, height: 18px)"
              />
        </AddToWishList>
        </ShoppingControls>

        <Conditions>
          <div>image <span>Free Delivery</span></div>
          <div>image <span>Free Returns</span></div>
            <div> Tx&Cs apply.</div>

        </Conditions>

      </Box>
    </Container>
  </>)
}

const Container = styled.div`
position: relative;
  height: 100%;
  width: 300px;
  max-width: 300px;
  padding: 0 10px 30px;
  display: flex;
  justify-content: center;
  background-color: white;

  @media ${({ theme }) => theme.mobileL} {
    width: 100%;
    max-width: 400px;
    margin: 0 auto 20px;

  }
`
const Box = styled.div`
  width: 240px;
  display: flex;
  flex-direction: column;

  @media ${({ theme }) => theme.mobileL} {
    width: 100%;
    max-width: 100vw;
    overflow-x: hidden;
  }
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
  height: 40px;
  cursor: pointer;
`
const ShoppingControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items:center;
  max-width: 100vw;
  height: auto;

`
const AddToBag = styled.button`
  padding: 14px;
  background-color: lightgreen;
  border: none;
  color: white;
  width: 80%;
  box-shadow: inset 0 0 0 ;
  cursor: pointer;

  &:hover {
     
  }
  &:active {
    transform: scale(0.98);
    box-shadow: inset 3px 3px 3px rgba(0, 0, 0, 0.2);
  }
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
const SpinnerContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9000;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.446);
`

const CartItemAdded = styled.div<{isWishSuccess: boolean}>`
  position: fixed;
  border: 1px solid ${({theme}) => theme.success};
  background-color: white;
  padding: 10px;
  border-radius: 10px;
  top: -152px;
  right: -40vw;
  z-index: 12490;
  animation: 3s ease-in-out 1;
  animation-name: ${({isWishSuccess}) => isWishSuccess ? slideIn : 'none'};
  overflow: hidden;
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
  from {
    transform: scale(1) ;
    opacity: 1;
  } to {
    transform: scale(15);
    opacity: 0;
    display: none;
  }
`
const AddToWishList = styled.div`
  position: relative;
  width: 40px;
  aspect-ratio: 1/1;
  cursor: pointer;

  top: 0%;
  right: 0%;
  background-color: ${({ theme }) => theme.lightGrey};
  border-radius: 50%;
  

  & img {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%), translateY(2px);
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
    animation: ${heartAnimation} 0.6s ease-in-out 1;
    animation-fill-mode: forwards;
  } 
`