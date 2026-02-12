'use server'
import { decode } from 'next-auth/jwt';
import { cookies } from 'next/headers';
import React from 'react'

export async function deleteCart() {
    const authToken = (await cookies()).get('next-auth.session-token')?.value
    const token =await decode({
        token:authToken,
        secret:process.env.NEXTAUTH_SECRET!
    })

if(!token){
    throw new Error('Unauthorized....')
}

    const resp = await fetch(`https://ecommerce.routemisr.com/api/v2/cart`,{
        method:'DELETE',
        headers:{
            token:token?.token,
            'Content-type':'application/json'
        },
        
    })
    const payload = await resp.json()
    return payload
    
  
}
