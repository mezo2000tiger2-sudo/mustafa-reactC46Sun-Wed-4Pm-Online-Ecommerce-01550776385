'use server'
import { decode } from 'next-auth/jwt';
import { cookies } from 'next/headers';
import React from 'react'

export async function updateReview({reviewId ,review , rating }:{reviewId:string ,review:string , rating:number}) {
    const authToken = (await cookies()).get('next-auth.session-token')?.value
    const token =await decode({
        token:authToken,
        secret:process.env.NEXTAUTH_SECRET!
    })

if(!token){
    throw new Error('Unauthorized....')
}

    const resp = await fetch(`https://ecommerce.routemisr.com/api/v1/reviews/${reviewId}`,{
        method:'PUT',
        headers:{
            token:token?.token,
            'Content-type':'application/json'
        },
        body:JSON.stringify({
            review:review,
            rating:rating
        })
        
    })
    const payload = await resp.json()
    console.log(payload);
    
    return payload
    
  
}
