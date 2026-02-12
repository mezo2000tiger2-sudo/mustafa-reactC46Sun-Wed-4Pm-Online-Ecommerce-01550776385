'use server'
import { shippingAddress } from '@/app/_type/cartResponseInterface';
import { decode } from 'next-auth/jwt';
import { cookies } from 'next/headers';
import React from 'react'


export async function payCashOrder(cartid:string , shippingAddress:shippingAddress) {
    const cookieStore = await cookies()
    const authToken = cookieStore.get('__Secure-next-auth.session-token')?.value || 
                      cookieStore.get('next-auth.session-token')?.value
    
    if (!authToken) throw new Error('Unauthorized....')
    
    const token =await decode({
        token:authToken,
        secret:process.env.NEXTAUTH_SECRET!
    })

if(!token){
    throw new Error('Unauthorized....')
}

    const resp = await fetch(`https://ecommerce.routemisr.com/api/v2/orders/${cartid}`,{
        method:'POST',
        cache:'no-store',
        headers:{
            token:token?.token,
            'Content-type':'application/json'
        },
        body:JSON.stringify({
            shippingAddress
        })
    })
    const payload = await resp.json()
    console.log(payload);
    return payload
    
  
}
