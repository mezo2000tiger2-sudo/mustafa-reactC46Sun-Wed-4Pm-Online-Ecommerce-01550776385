'use server'
import { decode } from 'next-auth/jwt';
import { cookies } from 'next/headers';

export async function getOrders(userId:string) {
    const authToken = (await cookies()).get('next-auth.session-token')?.value
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