import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    const token =await getToken({req})
    if(!token){
        return NextResponse.json({error:'unAuthorized' , stats:401})

    }
    const resp=await fetch(`https://ecommerce.routemisr.com/api/v2/cart`,{
        method:'GET',
        headers:{
            token:token?.token,
            'Content-type':'application/json'
        }
    })
    const payload = await resp.json()
    return NextResponse.json(payload)

}