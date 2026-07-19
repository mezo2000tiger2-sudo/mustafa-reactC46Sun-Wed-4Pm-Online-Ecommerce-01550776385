'use client'
import { addToCart } from '@/app/_servecies/cart/add_to_cart'
import { Button } from '@/components/ui/button'
import { CardFooter } from '@/components/ui/card'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { useState, useOptimistic, useTransition } from 'react'
import toast from 'react-hot-toast'
import { Spinner } from '@/components/ui/spinner'
import { useSession } from 'next-auth/react'

export default function AddBTN({id , data:wishlist}:{id:string , data:any}) {
    const { status } = useSession()
    const queryClient = useQueryClient()
    const wishlistItems = wishlist?.data ?? []
    const isInitiallyWishlisted = wishlistItems.some((item: any) => item._id === id)
    
    const [isWishlistToggling, startTransition] = useTransition()
    const [optimisticWishlisted, addOptimisticWishlist] = useOptimistic(
        isInitiallyWishlisted,
        (state, newValue: boolean) => newValue
    )
    const [serverError, setServerError] = useState<string | null>(null)

    // Add to Cart Mutation (Kept unchanged as per user request)
    const {isPending, mutate:addProductToCart} = useMutation({
        mutationFn: addToCart,
        mutationKey: ['addProduct'],
        onSuccess: (data) => {
            toast.success(data?.message)
            queryClient.invalidateQueries({
                queryKey: ['get-cart']
            })
        },
        onError: (data) => {
            toast.error('Login first')
        }
    })

    const handleWishlistToggle = async () => {
        if (status !== 'authenticated') {
            toast.error('Login first')
            return
        }

        setServerError(null)
        
        startTransition(async () => {
            const nextState = !optimisticWishlisted
            addOptimisticWishlist(nextState)
            
            try {
                const endpoint = nextState ? '/api/addToWishlist' : '/api/deletefromwishlist'
                const method = nextState ? 'POST' : 'DELETE'
                
                const resp = await fetch(endpoint, {
                    method,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ productId: id })
                })

                if (!resp.ok) throw new Error('Server error')
                
                const data = await resp.json()
                // toast.success(data.message || (nextState ? 'Added to wishlist' : 'Removed from wishlist'))
                
                // Await invalidation to ensure transition stays active until data is refetched
                await queryClient.invalidateQueries({ 
                    queryKey: ['get-wishlist'],
                    refetchType: 'all'
                })
            } catch (error) {
                setServerError('Server error')
                toast.error('Server error: Failed to update wishlist')
            }
        })
    }
    
    return (
        <CardFooter className="flex flex-col gap-2 p-4 pt-0">
            <div className="flex justify-between items-center w-full">
                <Button 
                    onClick={() => addProductToCart(id)} 
                    className="w-2/3"
                    disabled={isPending}
                >
                    {isPending ? <><Spinner className="size-3" /> Adding...</> : 'Add to cart'}
                </Button>

                <button 
                    onClick={handleWishlistToggle}
                    disabled={isWishlistToggling}
                    className="cursor-pointer hover:scale-110 transition-transform active:scale-90"
                    aria-label={optimisticWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                >
                    {optimisticWishlisted ? (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" className="size-7">
                            <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7 text-[#1c1914]/40 hover:text-[#1c1914]/60">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                        </svg>
                    )}
                </button>
            </div>
            
            {serverError && (
                <span className="text-[10px] font-bold text-red-500 uppercase tracking-tighter">
                    {serverError}
                </span>
            )}
        </CardFooter>
    )
}