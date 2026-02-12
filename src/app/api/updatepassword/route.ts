import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req:NextRequest){
    const token =await getToken({req})
    if(!token){
        return NextResponse.json({error:'unAuthorized'}, { status: 401 })

    }

    try {
        const body = await req.json()
        console.log('updatepassword body:', body)

        const resp = await fetch(`https://ecommerce.routemisr.com/api/v1/users/changeMyPassword`,{
            method:'PUT',
            headers:{
                token:token?.token,
                'Content-type':'application/json'
            },
            body: JSON.stringify(body)
        })

        const payload = await resp.json()
        return NextResponse.json(payload, { status: resp.status })
    } catch (err) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }

}