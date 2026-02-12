import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"

const protectedPages = ['/cart', '/profile', '/wishlist' , '/updatepassword' , '/UpdateuserData' , '/chekout' , '/orders','/addresses','/addadress','/orderdetails']  
const authPages = ['/login', '/register' ,'/forgetpassword' ,'/verefyresetcode','/resetpassword']  

export async function middleware(req: NextRequest) {
  const token = await getToken({ req })
  
  if(protectedPages.includes(req.nextUrl.pathname)){
    if(token){
      return NextResponse.next()
    } else {
      const loginUrl = new URL('/login', req.url)
      loginUrl.searchParams.set('callback-url', req.nextUrl.pathname)
      return NextResponse.redirect(loginUrl)
    }
  }
  
  if(authPages.includes(req.nextUrl.pathname)){
    if(!token){
      return NextResponse.next()
    } else {
      return NextResponse.redirect(new URL('/', req.url))
    }
  }
  
  return NextResponse.next()
}