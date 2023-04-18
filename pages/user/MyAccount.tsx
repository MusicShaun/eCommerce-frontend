import MyAccountLayout from '../../components/Layout'
import React, { useEffect } from 'react'
import UserLanding from './UserLanding'
import { useCheckJWTexpiry } from 'lib/hooks/checkJWTexpiry'
import { useGetUserQuery } from 'lib/userSlice'

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

  return (

    <MyAccountLayout>
      <UserLanding />
    </MyAccountLayout>

  )
}


