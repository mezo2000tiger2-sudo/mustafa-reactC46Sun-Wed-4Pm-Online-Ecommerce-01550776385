'use server'
import { decode } from 'next-auth/jwt';
import { cookies } from 'next/headers';

export async function verifyToken() {
    const cookieStore = await cookies()
    const authToken = cookieStore.get('__Secure-next-auth.session-token')?.value || 
                      cookieStore.get('next-auth.session-token')?.value
    
    if (!authToken) {
        return { statusMsg: 'fail', message: 'No session found' }
    }
    
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
