'use client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useEffect, useRef } from 'react'
import { CartResponse } from '../_type/cartResponseInterface'
import Loading from '../loading'
import { delFromCart } from '../_servecies/cart/del-cart-item'
import toast from 'react-hot-toast'
import { updateCart } from '../_servecies/cart/update-cart'
import Link from 'next/link'
import { deleteCart } from '../_servecies/cart/clear_cart'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Field } from '@/components/ui/field'
import { applyCoupon } from '../_servecies/cart/apply_coupon'
import { Trash2, ShoppingBag } from 'lucide-react'

export default function Cart() {
  const couponRef = useRef<HTMLInputElement>(null)
  const quaryclient = useQueryClient()
  const { data, isError, error, isLoading } = useQuery<CartResponse>({
    queryFn: async () => {
      const resp = await fetch('/api/cart')
      const payload = await resp.json()
      return payload
    },
    queryKey: ['get-cart'],
  })
  useEffect(() => {
    if (data) {
      localStorage.setItem('cart', JSON.stringify(data))
    }
  }, [data])

  const { mutate: delCartItem } = useMutation({
    mutationKey: ['del-item-cart'],
    mutationFn: delFromCart,
    onSuccess: () => {
      toast.success('product deleted')
      quaryclient.invalidateQueries({
        queryKey: ['get-cart'],
      })
    },
    onError: () => {
      toast.error('error')
    },
  })
  const { mutate: deleCart } = useMutation({
    mutationKey: ['del-item-cart'],
    mutationFn: deleteCart,
    onSuccess: () => {
      toast.success('cart cleared')
      quaryclient.invalidateQueries({
        queryKey: ['get-cart'],
      })
    },
    onError: () => {
      toast.error('error')
    },
  })

  const { mutate: updateCartItem } = useMutation({
    mutationKey: ['update-item-cart'],
    mutationFn: updateCart,
    onSuccess: () => {
      toast.success('product updated')
      quaryclient.invalidateQueries({
        queryKey: ['get-cart'],
      })
    },
    onError: () => {
      toast.error('error')
    },
  })
  const { mutate: applyCuponToCart, isPending } = useMutation({
    mutationKey: ['update-item-cart'],
    mutationFn: applyCoupon,
    onSuccess: () => {
      toast.success('product updated')
      quaryclient.invalidateQueries({
        queryKey: ['get-cart'],
      })
    },
    onError: () => {
      toast.error('error')
    },
  })
  function handleupdate(productid: string, count: number) {
    updateCartItem({ productid, count })
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <>
      {/* Background gradients — matches home page editorial aesthetic */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(1000px_620px_at_10%_6%,rgba(14,133,40,0.22),transparent_58%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(840px_520px_at_92%_14%,rgba(224,176,128,0.35),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_640px_at_52%_104%,rgba(168,184,216,0.28),transparent_60%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#fffcf7]/92 to-transparent" />
      </div>
      {/* Grain Overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.07] mix-blend-multiply"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'220\' height=\'220\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'220\' height=\'220\' filter=\'url(%23n)\' opacity=\'0.65\'/%3E%3C/svg%3E")',
        }}
      />

      <div className="relative min-h-screen bg-[#f6f1e8] pt-24 pb-16">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          {data?.numOfCartItems! > 0 ? (
            <>
              {/* Header */}
              <div className="mb-8 flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight text-[#1c1914]">
                  Shopping Cart
                </h2>
                <button
                  onClick={() => {
                    deleCart()
                  }}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-[14px] border border-[rgba(185,28,28,0.15)] bg-[rgba(185,28,28,0.05)] px-4 py-2.5 text-sm font-bold text-[#b91c1c] transition-all duration-200 hover:bg-[#b91c1c] hover:text-white"
                >
                  <Trash2 className="size-4" />
                  Clear Cart
                </button>
              </div>

              {/* Two-column grid */}
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_400px] lg:items-start">
                {/* Left — Product list */}
                <div className="flex flex-col gap-4">
                  {data?.data?.products.map((prod) => {
                    return (
                      <div
                        key={prod._id}
                        className="rounded-[20px] border border-[rgba(28,25,20,0.1)] bg-[rgba(255,252,247,0.92)] p-5 shadow-[0_8px_28px_rgba(28,25,20,0.06)] transition-all duration-250 hover:translate-y-[-3px] hover:shadow-[0_20px_50px_rgba(28,25,20,0.1)] sm:p-6"
                      >
                        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6">
                          {/* Thumbnail */}
                          <Link
                            href={`/productdetails/${prod.product._id}`}
                            className="block shrink-0"
                          >
                            <img
                              src={prod.product.imageCover}
                              alt="product-image"
                              className="h-[100px] w-full rounded-[14px] border border-[rgba(28,25,20,0.08)] object-cover sm:h-[120px] sm:w-[130px]"
                            />
                          </Link>

                          <div className="flex min-w-0 flex-1 flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                            <div className="flex flex-col gap-3">
                              <div>
                                <Link
                                  href={`/productdetails/${prod.product._id}`}
                                  className="text-lg font-bold leading-snug text-[#1c1914] no-underline transition-colors hover:text-[#0e8528]"
                                >
                                  {prod.product.title.split(' ').splice(0, 3).join(' ')}
                                </Link>
                                <p className="mt-1 text-sm font-medium text-[rgba(28,25,20,0.5)]">
                                  {prod.product.brand.name}
                                </p>
                              </div>
                              {/* Qty stepper */}
                              <div className="inline-flex self-start overflow-hidden rounded-[10px] border border-[rgba(28,25,20,0.12)] bg-[#fffdf8]">
                                <button
                                  onClick={() => {
                                    handleupdate(prod.product._id, prod.count - 1)
                                  }}
                                  className="cursor-pointer border-none bg-[rgba(246,241,232,0.4)] px-3.5 py-2 font-extrabold text-[#1c1914] transition-colors duration-150 hover:bg-main hover:text-white"
                                >
                                  −
                                </button>
                                <span className="flex min-w-[48px] items-center justify-center px-4 py-2 font-bold text-[#1c1914]">
                                  {prod.count}
                                </span>
                                <button
                                  onClick={() => {
                                    handleupdate(prod.product._id, prod.count + 1)
                                  }}
                                  className="cursor-pointer border-none bg-[rgba(246,241,232,0.4)] px-3.5 py-2 font-extrabold text-[#1c1914] transition-colors duration-150 hover:bg-main hover:text-white"
                                >
                                  +
                                </button>
                              </div>
                            </div>

                            {/* Price + delete */}
                            <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end sm:justify-between sm:self-stretch">
                              <p className="text-xl font-extrabold text-[#1c1914]">
                                {prod.price * prod.count}{' '}
                                <span className="text-sm font-bold text-[rgba(28,25,20,0.4)]">
                                  EGP
                                </span>
                              </p>
                              <button
                                onClick={() => {
                                  delCartItem(prod.product._id)
                                }}
                                className="flex cursor-pointer items-center gap-1.5 rounded-[10px] border border-[rgba(185,28,28,0.12)] bg-[rgba(185,28,28,0.04)] px-3 py-2 text-sm font-medium text-[#b91c1c] transition-all duration-150 hover:bg-[#b91c1c] hover:text-white"
                              >
                                <Trash2 className="size-4" />
                                <span className="hidden sm:inline">Remove</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Right — Summary panel */}
                <div className="sticky top-24 rounded-[20px] border border-[rgba(28,25,20,0.1)] bg-[rgba(255,252,247,0.92)] p-6 shadow-[0_8px_28px_rgba(28,25,20,0.06)] sm:p-7">
                  <h4 className="mb-5 text-xl font-bold tracking-tight text-[#1c1914]">
                    Order Summary
                  </h4>

                  {/* Line items */}
                  <div className="flex flex-col gap-3">
                    {data?.data?.products.map((prod) => {
                      return (
                        <div key={prod._id} className="flex justify-between text-sm">
                          <span className="truncate text-[rgba(28,25,20,0.55)]">
                            {prod.product.title.split(' ').splice(0, 2).join(' ')}
                          </span>
                          <span className="ml-3 shrink-0 font-semibold text-[#1c1914]">
                            {prod.price * prod.count} EGP
                          </span>
                        </div>
                      )
                    })}
                  </div>

                  <hr className="my-4 border-[rgba(28,25,20,0.1)]" />

                  {/* Total */}
                  <div className="mb-5 flex items-baseline justify-between">
                    <span className="font-semibold text-[#1c1914]">Total</span>
                    <div className="text-right">
                      <span className="text-xl font-extrabold text-[#1c1914]">
                        {data?.data.totalCartPrice}.0 EGP
                      </span>
                      <p className="text-xs font-medium text-[rgba(28,25,20,0.4)]">
                        including VAT
                      </p>
                    </div>
                  </div>

                  {/* Coupon */}
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[rgba(28,25,20,0.5)]">
                    Have a coupon?
                  </label>
                  <Field orientation="horizontal" className="gap-0">
                    <Input
                      ref={couponRef}
                      type="text"
                      placeholder="Enter code"
                      className="rounded-l-[12px] rounded-r-none border-[rgba(28,25,20,0.12)] bg-[#fffdf8]"
                    />
                    <Button
                      onClick={() =>
                        applyCuponToCart({ coupon: couponRef.current?.value || '' })
                      }
                      className="rounded-l-none rounded-r-[12px] bg-main px-5 text-sm font-bold text-white transition-all hover:bg-green-700"
                    >
                      {isPending ? 'Applying…' : 'Apply'}
                    </Button>
                  </Field>

                  {/* Checkout */}
                  <Link href={`/chekout/${data?.cartId}`}>
                    <button className="mt-5 w-full cursor-pointer rounded-[14px] bg-main px-6 py-3.5 text-base font-bold text-white shadow-[0_20px_40px_rgba(14,133,40,0.2)] transition-all duration-200 hover:bg-green-700 hover:shadow-[0_24px_48px_rgba(14,133,40,0.28)]">
                      Proceed to Checkout
                    </button>
                  </Link>

                  <p className="mt-3 text-center text-xs font-medium text-[rgba(28,25,20,0.35)]">
                    Free shipping on orders over 500 EGP
                  </p>
                </div>
              </div>
            </>
          ) : (
            /* Empty cart */
            <div className="flex flex-col items-center justify-center px-4 pt-20 text-center sm:pt-28">
              <div className="mb-8 flex h-36 w-36 items-center justify-center rounded-[28px] border border-[rgba(28,25,20,0.08)] bg-[rgba(255,252,247,0.92)] shadow-[0_8px_28px_rgba(28,25,20,0.06)]">
                <ShoppingBag className="h-16 w-16 text-[rgba(14,133,40,0.3)]" />
              </div>
              <h3 className="mb-3 text-3xl font-bold tracking-tight text-[#1c1914]">
                Your cart is feeling light
              </h3>
              <p className="mb-10 max-w-md text-base leading-relaxed text-[rgba(28,25,20,0.5)]">
                Looks like you haven&apos;t added anything yet. Explore our products and
                find something you love!
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-3 rounded-[14px] bg-main px-10 py-4 text-base font-bold text-white shadow-[0_20px_40px_rgba(14,133,40,0.2)] transition-all duration-200 hover:bg-green-700 hover:shadow-[0_24px_48px_rgba(14,133,40,0.28)] hover:translate-y-[-2px]"
              >
                <ShoppingBag className="h-5 w-5" />
                Start Shopping
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
