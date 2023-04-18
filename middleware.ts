import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest, res: NextResponse) {

  const response = NextResponse.next({
    request: {
      headers: req.headers,

    },
  })

  const { cookies } = req
  console.log(cookies)

  // response.headers.forEach(head => console.log('headers', head))

  // response.cookies.set('isAuth', 'true', {
  //   httpOnly: true,
  //   secure: true,
  //   sameSite: 'lax',
  //   maxAge: 60 * 60 * 24 * 7, // 7 days
  //   path: '/',
  // })
  

  // console.log('jwt???', req.cookies.has('jwt')) // check if exists

  // const id = req.cookies.get('id')
  // console.log('cookie', cookie)

  // if (req.nextUrl.pathname.startsWith('/')) { // or instead of the config below you can use this 
  //   console.log('middleware ran')
  // }

  return response
}

export const config = {
  matcher: '/'
}