import React from 'react'
import styled from 'styled-components'
import Empty from '../../components/EmptyTab'
import MyAccountLayout from '../../components/layouts/AccountLayout'
import Head from 'next/head'

export default function PurchaseHistory() {

  const EmptyWishList = {
    title: `You have not purchased anything`,
    body: `Best change that.`,
    button: `Start Shopping`
  }

  let content 
  if (false) {

  } else {
    content = 
    <Container>
      <First><h2>PURCHASE HISTORY</h2></First>
      <Empty info={EmptyWishList} />
    </Container> 
  }


  return (<>
  <Head>
    <title>Purchase History
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
