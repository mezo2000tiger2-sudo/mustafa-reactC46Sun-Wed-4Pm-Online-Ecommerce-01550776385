'use client'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'

export function useWishlist() {
  const { status } = useSession()
  return useQuery({
    queryKey: ['get-wishlist'],
    queryFn: async () => {
      const resp = await fetch('/api/getwishlist')
      if (!resp.ok) throw new Error('Failed to load wishlist')
      return resp.json()
    },
    enabled: status === 'authenticated'
  })
}