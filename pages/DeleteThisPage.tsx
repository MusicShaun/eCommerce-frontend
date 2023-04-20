// import js-cookie 
import Cookie from "js-cookie"
import { useEffect } from "react"

interface IProps {
  initialJWTValue: string
}
export default function DeleteThisPage({initialJWTValue}: IProps) {

  console.log(initialJWTValue)

  useEffect(() => {
    Cookie.set('cookieName', 'cookieValue', { expires: 1 })
  }, [])
  // The cookies value in set cookie would need to either be JSON.parse or JSON.stringify

    return (
    <div>som random stuff</div>
  )
}

DeleteThisPage.getInitialProps = ({ req }:NextPageContext ) => { //! DEPRECATED 

  const cookies = parseCookies(req)
  cookies.jwt 

  return {
    initialJWTValue: cookies.jwt
  }
}


//! Before you finish read this - https://nextjs.org/docs/api-reference/data-fetching/get-initial-props#typescript 


//* this is what parseCookies is doing
import cookie from "cookie"
import { IncomingMessage } from "http"
import { NextPageContext } from "next"
export function parseCookies(req?: IncomingMessage) {
  return cookie.parse(req ? req.headers.cookie || "" : document.cookie)
}
