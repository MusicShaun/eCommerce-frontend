import React, { useEffect } from 'react'
import styled from 'styled-components'
import Empty from '../../components/Empty'
import MyAccountLayout from '../../components/Layout'
import { useCheckJWTexpiry } from 'lib/utils/checkJWTexpiry'
import Head from 'next/head'

export default function MyOrders() {



  const EmptyWishList = {
    title: `You currently have no orders.`,
    body: `Best get shopping`,
    button: `Start Shopping`
  }

  let content 
  if (false) {

  } else {
    content = 
    <Container>
      <First><h2>MY ORDERS</h2></First>
      <Empty info={EmptyWishList} />
    </Container> 
  }


  return (<>
    <Head>
    <title>Your Orders
      </title></Head>
  <MyAccountLayout>
  {content}
    </MyAccountLayout>
    </>)
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
`
const First = styled.div`
  width: 100%;
  height: 142px;
  background-color:white;
  display: flex;
  align-items: center;
  padding: 20px;
  margin-bottom: 20px;
`
