import { deleteCookie } from "cookies-next"
import { apiSlice } from "lib/apiSlice"
import { useAppDispatch } from "lib/hooks/hooks"
import {  useLogoutMutation } from "lib/userSlice"

interface LogoutProps {
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

  // expires cookie
  // removes user info from localStorage
  // resets api state
  // redirects to login page

async function logout({ onSuccess }: LogoutProps) {
  const dispatch = useAppDispatch()
  const [logout, {}] = useLogoutMutation()

  try {
    const res = await logout()
    console.log(res)
    onSuccess && onSuccess()
  } catch (error) {
    console.log(error)
  }
  finally {
    localStorage.removeItem('key')
    dispatch(apiSlice.util.resetApiState())
  }
  deleteCookie('jwt')

}
  
export default logout