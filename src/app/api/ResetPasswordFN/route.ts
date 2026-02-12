import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req:NextRequest){

        const body = await req.json()
        const resp = await fetch(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,{
            method:'PUT',
            headers:{
                'Content-type':'application/json'
            },
            body: JSON.stringify(body)
        })

        const payload = await resp.json() 
         return NextResponse.json(payload)

}