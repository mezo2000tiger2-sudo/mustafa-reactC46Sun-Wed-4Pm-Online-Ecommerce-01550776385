'use server'
import { decode } from 'next-auth/jwt';
import { cookies } from 'next/headers';

export async function getOrders(userId:string) {
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

    const resp = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
    const payload = await resp.json()
    return payload
}