'use server'
import { decode } from 'next-auth/jwt';
import { cookies } from 'next/headers';

export async function verifyToken() {
    const authToken = (await cookies()).get('next-auth.session-token')?.value
    const token =await decode({
        token:authToken,
        secret:process.env.NEXTAUTH_SECRET!
    })



    const resp = await fetch(`https://ecommerce.routemisr.com/api/v1/auth/verifyToken`,{
        method:'GET',
        headers:{
            token:token?.token || '',
            'Content-type':'application/json'
        },
        
    })
    const payload = await resp.json()
    return payload
}
