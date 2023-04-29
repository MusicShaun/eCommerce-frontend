import React from 'react'
import styled from 'styled-components'
import ProductSideBar from '@/components/ProductSideBar'
import Product from '@/components/Product'
import { ClotheType, extendedClothesSlice } from 'lib/clothesSlice'
import { store } from 'lib/store'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'

store.dispatch(extendedClothesSlice.endpoints.getAllClothes.initiate())



// This function gets called at build time
export const getStaticPaths: GetStaticPaths = async () => {// how many html pages need to be made // Need a safe way to get the data fetched here

  // Call an external API endpoint to get posts
  const res = await fetch(`https://shauns-ecommerce.herokuapp.com/api/asos/getallclothes/`)
  const {data} = await res.json()


  const combined = [...data.shirts, ...data.shorts, ...data.shoes]
  // Get the paths we want to pre-render based on pages
  // console.log(combined)
  const paths = combined.map((l: any) => ({params: { product: l.heading.replace(/\s/g, '-') }}))
    
  return {
    paths,
    fallback: false
  }
}



export const getStaticProps: GetStaticProps = async ({ params }) => { // might have to change this back to context

  // params contains the paths heading
  // if the route is like /asos/shirts-for-days then the params.heading is shirts-for-days
  const res = await fetch(`https://shauns-ecommerce.herokuapp.com/api/asos/product/${params!.product}`)
  const  product  = await res.json()

  return { //* find the inidivual item that will be passed to the dynamic page
    props:  product ,
    
  }
}


interface IProps {
  product?: ClotheType[]
}
export default function ClothesSinglePage( {product}: IProps) {


  const plainProductObject = product?.[0]

  const content = plainProductObject ? (
    <Container>
      <Product productItem={plainProductObject} />
      <ProductSideBar productItem={plainProductObject} />
    </Container>
  ) : null;

  return <>
    <Head>
      <title>{plainProductObject?.brand}</title>
    </Head>
    <Wrapper>
      {content}
    </Wrapper>
  </>
}








const Wrapper = styled.div`
  position: absolute;
  left: 0;
  top: 155px;
  width: 100%;
  height: calc(90% - 155px);
  display: flex;
  justify-content: center;

`
const Container = styled.div`
position: relative;
  width: 960px;
  height: 100%;
  display: flex;
  justify-content: center;
  margin-top: 60px;

  @media ${({ theme }) => theme.mobileL} {
    flex-direction: column;
    width: 100%;
    margin-top: 0px;
  }
`