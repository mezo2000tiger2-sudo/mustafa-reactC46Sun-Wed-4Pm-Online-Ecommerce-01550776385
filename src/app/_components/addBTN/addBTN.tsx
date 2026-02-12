'use client'
import { addToCart } from '@/app/_servecies/cart/add_to_cart'
import { Button } from '@/components/ui/button'
import { CardFooter } from '@/components/ui/card'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { LoaderIcon } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { cn } from "@/lib/utils"
import { Spinner } from '@/components/ui/spinner'

export default function AddBTN({id , data:wishlist}:{id:string , data:any}) {
    const [isWishlisted, setisWishlisted] = useState(false)
    const queryClient = useQueryClient()
    const wishlistItems = wishlist?.data ?? []
    
    

    const {data, isPending, isError, error, mutate:addProductToCart} = useMutation({
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
    console.log(data);

    const {mutate:addTowishlist, isPending: isWishlistPending}=useMutation({
        mutationKey:['add-wishlist'],
        mutationFn:async ()=>{
            const resp = await fetch('/api/addToWishlist',{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({     
                    productId: id
                })
            })
            if (!resp.ok) {
                throw new Error('Failed to delete to wishlist')
            }
            const payload = await resp.json()
            return payload
        },
        onSuccess:(data)=>{
            setisWishlisted(true)
            toast.success('Added to wishlist')
            queryClient.invalidateQueries({ queryKey: ['get-wishlist'] })
        },
        onError:(error)=>{
            toast.error('Failed to add to wishlist. Please login first')
        }
    })


    const {mutate:delFromWishlist, isPending: isDelPending}=useMutation({
        mutationKey:['add-wishlist'],
        mutationFn:async ()=>{
            const resp = await fetch('/api/deletefromwishlist',{
                method:'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({     
                    productId: id
                })
            })
            if (!resp.ok) {
                throw new Error('Failed to delete from wishlist')
            }
            const payload = await resp.json()
            return payload
        },
        onSuccess:(data)=>{
            setisWishlisted(false)
            toast.success('Deleted from wishlist')
            queryClient.invalidateQueries({ queryKey: ['get-wishlist'] })
        },
        onError:(error)=>{
            toast.error('Failed to delete from wishlist. Please login first')
        }
    })
    
    return (
        <CardFooter className="flex justify-between items-center">
            <Button 
                onClick={() => addProductToCart(id)} 
                className="w-2/3"
                disabled={isPending}
            >
                {isPending ?  <><Spinner className="size-3" />  Adding...</> : 'Add to cart'}
            </Button>

            
        { wishlistItems.some((item: any) => item._id === id) || isWishlisted ? 
        <button 
                onClick={() => delFromWishlist()}
                disabled={isDelPending}
                className="cursor-pointer hover:opacity-80 transition-opacity"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" className="size-6">
                <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                </svg>

            </button>
        :
        <button 
                onClick={() => addTowishlist()}
                disabled={isWishlistPending}
                className="cursor-pointer hover:opacity-80 transition-opacity"
            >
                

                <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>

            </button>

        }

            

            
            

        </CardFooter>
    )
}