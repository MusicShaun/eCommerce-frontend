import { LocalUser } from 'lib/authSlice'


export const useCheckJWTexpiry = () => {

  const isBrowser = typeof window !== 'undefined'

  const checkJWTexpiry = () => {
    // if (isBrowser) {
    //   const key = localStorage.getItem('key')
    //   if (key) {
    //     const user: LocalUser = JSON.parse(key)
    //     const currentTime = Date.now() / 1000

    //     if (Number(user.expiresAt)  < currentTime) {
    //       localStorage.removeItem('key')
    //       return true
    //     } else {
    //       return false
    //     }
    //   }
    // }
  }
  return checkJWTexpiry
}