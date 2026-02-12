import { getAccessToken } from '@/schema/acces-token'
import { decode } from 'next-auth/jwt'
import { cookies } from 'next/headers'
import React from 'react'

export default async function AllOrders() {
  const authToken = (await cookies()).get('next-auth.session-token')?.value
  const token = await decode({
    token: authToken,
    secret: process.env.NEXTAUTH_SECRET!
  })
  console.log(token);
  return (
    <div>AllOrders</div>
  )
}
