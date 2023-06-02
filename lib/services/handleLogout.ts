import { Auth } from "aws-amplify"
import { useAppDispatch } from "../hooks/hooks"
import { signOut } from "../slices/authSlice"
import { apiSlice } from "../slices/apiSlice"
import router from "next/router"
import { Dispatch } from "react"


interface LogoutProps {
  dispatch: Dispatch<any>
}

export const logout = async ({dispatch}: LogoutProps) => {
  
  localStorage.removeItem('key')
  localStorage.removeItem('authState')

  try {
    dispatch(signOut())
    await Auth.signOut()
  }
  catch (err) {
    console.log(err)
    
  } finally {
    dispatch(apiSlice.util.resetApiState())
    router.push('/login')
  }
}

