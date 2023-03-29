Hello! 
This is a dummy site with the purpose of showcasing my code. 

This eCommerce site allows a user to buy clothes and manage a user account. The aim is to create a site with as fast as possible server interactions and as few requests as possible. 

The design style is a knock-off of the ASOS website using styled-components.
The CRUD activity is all handled by RTK query in an attempt to cache as much state as possible and minimise api calls. 
Anyone can login or register an account and if you choose to remain unknown, the moment you click a heart or cart an item the site will generate a guest account for 7 days . 

The front-end is written in NextJS/Typescript and deployed on Netlify.
The back-end is wrriten in NodeJs and deployed on Heroku. 

```
import { ClotheType, extendedClothesSlice } from 'lib/clothesSlice'
import styled from 'styled-components'
import ClothesGallery from '@/components/ClothesGallery'
import ProductFilterSideBar from '@/components/ProductFilterSideBar'
import { useState } from 'react'
import Link from 'next/link'
import { GetStaticPaths, GetStaticProps } from 'next'
import { store } from 'lib/store'

store.dispatch(extendedClothesSlice.endpoints.getAllClothes.initiate())


export const getStaticPaths: GetStaticPaths = async () => {
  const paths = [
    { params: { productType: 'shirts' } },
    { params: { productType: 'shorts' } },
    { params: { productType: 'shoes' } }
  ]
  return {
    paths,
    fallback: false
  }
}
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await fetch(`https://shauns-ecommerce.herokuapp.com/api/asos/get${params!.productType}`)
  const productType = await res.json()
  console.log('static props rendered')
  return { 
    props:  productType ,
  }
}



interface IProps {
  data: ClotheType[]
}
export default function ProductGrouped( {data}: IProps) {

  const productList = data
  const [filteredClothes, setFilteredClothes] = useState<ClotheType[]>([])
  const [updatedFilteredClothes, setUpdatedFilteredClothes] = useState<ClotheType[]>([])
  const [noResults, setNoResults] = useState(false)

  // A function to collect state changes from children and create a clothes array for display
  function handleFilteredClotheArray(arr: ClotheType[]) {
    setUpdatedFilteredClothes(arr)
    setFilteredClothes([])

    if (filteredClothes.length === 0) {
      setNoResults(true)
    }
  }

  // Check whether the user has made a search query
  // If yes, use the updatedFilteredClothes state
  const truthyCheckFilteredArray = updatedFilteredClothes && updatedFilteredClothes.length > 0

  let galleryContent
  if (noResults) {
    galleryContent = <SearchFailure>
      <h1>This search has no results</h1>
      <button onClick={() => setNoResults(false)}>
        Okay
      </button>
    </SearchFailure>

  } else if (truthyCheckFilteredArray) {
    galleryContent = <ClothesGallery info={updatedFilteredClothes} />

  } else if (!truthyCheckFilteredArray) {
    galleryContent = <ClothesGallery info={productList} />
  } 

```

The main tools worth mentioning are  
  - RTK query
  - Typescript 
  - NextJS

Minor tools such as Mongoose, Bcrypt or express don't seem worth the mention. 

Mobile responsiveness will not be setup. At this point it seems like an inneffective use of time. 

UPCOMING FEATURES 
  - Error handling in nodeJs. There is none currently. 
  - A Larger data pool to better test the speed of server requests. 
  - A security feature for removing localStorage data when 'expiresAt' elapses. 
- 