import MyAccountLayout from '../../components/layouts/AccountLayout'
import React, { useEffect } from 'react'
import { useCheckJWTexpiry } from 'lib/hooks/checkJWTexpiry'
import styled from 'styled-components'
import arch from '@/public/arch.webp'
import Image from 'next/image'
import Head from 'next/head'
export default function MyAccount() {


  
  const JWTExpiry = useCheckJWTexpiry()

  useEffect(() => {
    if (JWTExpiry()) {
      localStorage.removeItem('key')
      
      window.location.href = '/login'
    } else {
      return
    }
  },[])

  return (<>
    <Head>
      <title>Your Account</title>
    </Head>

    <MyAccountLayout>
      <Container>
        <Image src={arch} fill alt='' 
        />
      </Container>
    </MyAccountLayout>
  </>


  )
}

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 542px;
  background-color: white;

  @media ${({ theme }) => theme.mobileL} {
    display: none;
    & img {
    display: none;
  }
   
  }


`

