'use client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Metadata } from 'next';
import React, { useContext, useEffect, useRef } from 'react'
import { CartResponse } from '../_type/cartResponseInterface';
import Loading from '../loading';
import { delFromCart } from '../_servecies/cart/del-cart-item';
import toast from 'react-hot-toast';
import { updateCart } from '../_servecies/cart/update-cart';
import Link from "next/link"
import { deleteCart } from '../_servecies/cart/clear_cart';
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button';
import { Field } from '@/components/ui/field';
import { applyCoupon } from '../_servecies/cart/apply_coupon';


export default function Cart() {
  const couponRef = useRef<HTMLInputElement>(null)
  const quaryclient = useQueryClient()
  const {data , isError , error , isLoading}=useQuery<CartResponse>({
    queryFn:async()=>{
      const resp = await fetch('/api/cart')
      const payload = await resp.json()
      return payload
    },
    queryKey:['get-cart']
  })
  localStorage.setItem('cart' , JSON.stringify(data))
  
  const {   mutate:delCartItem} =useMutation({
    mutationKey:['del-item-cart'],
    mutationFn:delFromCart,
    onSuccess:()=>{
      toast.success('product deleted')
      quaryclient.invalidateQueries({
        queryKey:['get-cart']
      })
    },
    onError:()=>{
      toast.error('error')

    }
  })
  const {   mutate:deleCart} =useMutation({
    mutationKey:['del-item-cart'],
    mutationFn:deleteCart,
    onSuccess:()=>{
      toast.success('cart cleared')
      quaryclient.invalidateQueries({
        queryKey:['get-cart']
      })
    },
    onError:()=>{
      toast.error('error')

    }
  })
  
  const {  mutate:updateCartItem} =useMutation({
    mutationKey:['update-item-cart'],
    mutationFn:updateCart,
    onSuccess:()=>{
      toast.success('product updated')
      quaryclient.invalidateQueries({
        queryKey:['get-cart']
      })
    },
    onError:()=>{
      toast.error('error')

    }
  })
  const {  mutate:applyCuponToCart , isPending} =useMutation({
    mutationKey:['update-item-cart'],
    mutationFn:applyCoupon,
    onSuccess:()=>{
      toast.success('product updated')
      quaryclient.invalidateQueries({
        queryKey:['get-cart']
      })
    },
    onError:()=>{
      toast.error('error')

    }
  })
  function handleupdate(productid:string , count:number){
    updateCartItem({productid , count})

  }
  
  
  


  if(isLoading){
    return <Loading/>
  }


  return <>




  <div className="min-h-screen bg-main pt-20 pb-5">
  <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
    
    <div className="rounded-lg md:w-2/3">
    <div className='bg-gray-100 p-5 rounded-lg'>
      {data?.numOfCartItems! > 0? 
      <>
        <p className='mb-3 text-end cursor-pointer hover:text-red-500 transition-colors' onClick={()=>{deleCart()}}>clear cart</p>
        {  data?.data?.products.map((prod)=>{return <div key={prod._id} className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
      <Link href={`/productdetails/${prod.product._id}`}>

        <img src={prod.product.imageCover} alt="product-image" className="w-full border border-gray-200 rounded-lg sm:w-40" />
      </Link>
        <div className="sm:ml-4 flex w-full justify-between">
          <div className="mt-5 sm:mt-0">
            <div className='flex flex-col justify-between h-full w-full'>

            <div>
            <h2 className="text-xl font-bold mt-5 text-gray-900">{prod.product.title.split(' ').splice(0, 3).join(' ')}</h2>
            <p className="mt-1 text-s font-semibold text-gray-700">{prod.product.brand.name}</p>
            </div>
            <div className="flex items-center border-gray-100">
              <span onClick={()=>{handleupdate(prod.product._id , prod.count-1)}} className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-main hover:text-blue-50"> - </span>
              <span className="h-8 w-8 border bg-white text-center text-xs outline-none flex justify-center items-center"  >{prod.count}</span>
              <span onClick={()=>{handleupdate(prod.product._id , prod.count+1)}} className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-main hover:text-blue-50"> + </span>
            </div>
            </div>
          </div>
          <div className="mt-4 flex justify-end sm:space-y-6 sm:flex-col">
            
            <div className="flex items-center space-x-4">
              <p className="text-xl font-bold">{prod.price * prod.count} <span className='text-gray-400 text-sm font-bold'>EGP</span></p>
              <div className=" bg-red-100 p-2 px-2.5 border border-red-300 hover:bg-red-600 rounded-lg group cursor-pointer transition-colors duration-150">

              <svg onClick={()=>{delCartItem(prod.product._id)}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5 cursor-pointer text-red-600 transition-colors duration-150 group-hover:text-white">
              <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
              </svg>
              </div>

            </div>
          </div>
        </div>
      </div>
      })}
      </>
      
      : <div className="bg-white rounded-2xl  p-12 md:p-16 text-center border border-gray-100">
            <div className="max-w-md mx-auto">
              <div className="mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-32 h-32 mx-auto text-gray-300">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
          </svg>





              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                Your Cart is Empty
              </h3>
              <p className="text-gray-500 mb-8 mt-2">
                Explore our products and add it to cart so you can chek out?
              </p>
              <Link 
                href="/" 
                className="inline-flex items-center gap-2 bg-main hover:bg-green-600 text-white px-8 py-3 rounded-lg font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
              >
                <svg 
                  className="w-5 h-5" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
                  />
                </svg>
                Start Shopping
              </Link>
            </div>
          </div>}

    
    </div>


    </div>


    {data?.numOfCartItems! > 0 && <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">


        <p className="text-gray-700 mb-3">{data?.numOfCartItems} Items</p>
      <hr className="my-4" />
        <p className="text-gray-800 text-lg font-semibold mb-2">Subtotal</p>
        
        {  data?.data?.products.map((prod)=>{return<div key={prod._id} className="mb-2 flex justify-between"> 
        <p className="text-gray-800 ">{prod.product.title.split(' ').splice(0, 2).join(' ')}</p>
        <p className="text-gray-700">{prod.price * prod.count} EGP</p>
        </div>})}
  


      <hr className="my-4" />
      <div className="flex justify-between">
        <p className="text-lg font-bold">Total</p>
        <div >
          <p className="mb-1 text-lg font-bold">{data?.data.totalCartPrice}.0 EGP</p>
          <p className="text-sm text-gray-700">including VAT</p>
        </div>
      </div>
      <Field orientation="horizontal" className='gap-0'>
      <Input ref={couponRef} type="text" placeholder="type coupon" className='rounded-r-none' />
      <Button onClick={()=>applyCuponToCart({ coupon: couponRef.current?.value || '' })} className='rounded-l-none'>{isPending? 'loading': 'apply'}</Button>
    </Field>
      <Link href={`/chekout/${data?.cartId}`}><button className="mt-6 w-full rounded-md bg-green-600 py-1.5 font-medium text-blue-50 hover:bg-green-700 transition-colors cursor-pointer">Check out</button></Link>
    </div>}
    
  </div>
</div>




  </>
}
