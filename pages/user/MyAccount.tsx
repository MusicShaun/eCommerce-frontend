import MyAccountLayout from '../../components/layouts/AccountLayout'
import React, { useEffect } from 'react'
import UserLanding from './UserLanding'
import { useCheckJWTexpiry } from 'lib/hooks/checkJWTexpiry'

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


    <MyAccountLayout>
      <UserLanding />
    </MyAccountLayout>
  </>


  )
}


