import { deleteCookie } from "cookies-next"
import { apiSlice } from "lib/apiSlice"
import { useAppDispatch } from "lib/hooks/hooks"
import {  useLogoutMutation } from "lib/userSlice"
import router from "next/router"



  // expires cookie
  // removes user info from localStorage
  // resets api state
  // redirects to login page

function useLogout() {
  const dispatch = useAppDispatch()
  const [logout] = useLogoutMutation()

  async function handleLogout() {
    
    await logout()
    localStorage.removeItem('key')
    dispatch(apiSlice.util.resetApiState())
    router.push('/login/LoginWrapper', '/login', {shallow: true})
  }
  return handleLogout
}
  
export default useLogout