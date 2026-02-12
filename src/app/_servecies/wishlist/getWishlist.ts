'use client'
import { useQuery } from '@tanstack/react-query'

export function useWishlist() {
  return useQuery({
    queryKey: ['get-wishlist'],
    queryFn: async () => {
      const resp = await fetch('/api/getwishlist')
      if (!resp.ok) throw new Error('Failed to load wishlist')
      return resp.json()
    },
  })
}