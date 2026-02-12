import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    const token =await getToken({req})
    if(!token){
        return NextResponse.json({error:'unAuthorized' , status:401}, {status: 401})

    }

    try {
        const body = await req.json()
        const resp = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
            method:'POST',
            headers:{
                token:token?.token,
                'Content-type':'application/json'
            },
            body: JSON.stringify(body)
        })

        const payload = await resp.json()
        
        if (!resp.ok) {
            return NextResponse.json(payload, {status: resp.status})
        }
        
        return NextResponse.json(payload)
    } catch (err) {
        return NextResponse.json({ error: 'Internal server error' , status: 500 }, {status: 500})
    }

}