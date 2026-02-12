'use server'
import { decode } from 'next-auth/jwt';
import { cookies } from 'next/headers';
import React from 'react'

export async function delReview(reviewId:string) {
    const authToken = (await cookies()).get('next-auth.session-token')?.value
    const token =await decode({
        token:authToken,
        secret:process.env.NEXTAUTH_SECRET!
    })

if(!token){
    throw new Error('Unauthorized....')
}

    const resp = await fetch(`https://ecommerce.routemisr.com/api/v1/reviews/${reviewId}`,{
        method:'DELETE',
        headers:{
            token:token?.token,
            'Content-type':'application/json'
        },
        
    })
    if (resp.status === 204) return { success: 'true' }
    const payload = await resp.json()
    return payload
    
  
}
