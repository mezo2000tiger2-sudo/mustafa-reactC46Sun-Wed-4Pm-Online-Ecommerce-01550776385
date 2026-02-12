'use server'
import { shippingAddress } from '@/app/_type/cartResponseInterface';
import { decode } from 'next-auth/jwt';
import { cookies } from 'next/headers';
import React from 'react'


export async function getAddresses() {
    const authToken = (await cookies()).get('next-auth.session-token')?.value
    const token =await decode({
        token:authToken,
        secret:process.env.NEXTAUTH_SECRET!
    })

if(!token){
    throw new Error('Unauthorized....')
}

    const resp = await fetch(`https://ecommerce.routemisr.com/api/v1/addresses`,{
        method:'GET',
        headers:{
            token:token?.token,
            'Content-type':'application/json'
        },
    })
    const payload = await resp.json()
    console.log(payload);
    return payload
    
  
}
