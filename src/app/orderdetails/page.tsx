'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator'
import { Order } from '../_type/order';
import Loading from '../loading';

export default function OrderDetails() {
  const router = useRouter()
  const [order, setOrder] = useState<Order | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem('orderDetails')
    if (stored) {
      setOrder(JSON.parse(stored))
    }
  }, [])

  if (!order) {
    return <Loading />
  }

  return (
    <>
    <div className='min-h-screen bg-main'>
    <button onClick={() => router.push('/orders')} className="p-4 flex items-center gap-1 text-sm text-gray-700 hover:text-gray-900 transition-colors cursor-pointer">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
        Back to Orders
      </button>
    <div className="max-w-2xl bg-main mx-auto p-4">
      <Card>
        <CardHeader className="bg-slate-50">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Order #{order._id}</CardTitle>
            </div>
            <div className="flex gap-2">
              <Badge variant="outline" className='text-md'>
                {order.paymentMethodType}
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          <div className="mb-6">
            <h3 className="text-sm font-medium text-slate-700 mb-3">Customer Details</h3>
            <div className="bg-slate-50 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Avatar>
                  <AvatarFallback className="bg-blue-600 text-white">
                    {order.user.name?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium text-slate-900">{order.user.name}</p>
                  <p className="text-sm text-slate-600">{order.user.email}</p>
                  <p className="text-sm text-slate-600">{order.user.phone}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-medium text-slate-700 mb-3">
              Order Items ({order.cartItems.length})
            </h3>
            <div className="space-y-3">
              {order.cartItems.map((item) => (
                <div key={item._id} className="flex items-center gap-4 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                  <img
                    src={item.product.imageCover}
                    alt={item.product.title}
                    className="w-16 h-16 object-cover rounded-md border border-slate-200"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate">
                      {item.product.title}
                    </p>
                    <p className="text-xs text-slate-500">Qty: {item.count}</p>
                  </div>
                  <p className="text-sm font-semibold text-slate-900">
                    {item.price} EGP
                  </p>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div className="mt-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Shipping</span>
                <span className="text-slate-900">{order.shippingPrice} EGP</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Tax</span>
                <span className="text-slate-900">{order.taxPrice} EGP</span>
              </div>
              <Separator />
              <div className="flex justify-between text-base font-semibold pt-2">
                <span className="text-slate-900">Total</span>
                <span className="text-blue-600">
                  {order.totalOrderPrice} EGP
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-200">
            <div className="flex items-center justify-between">
              <div className='flex gap-2 items-center'>
                <p className="text-sm font-medium text-slate-700">Payment Method:</p>
                <p className="text-sm text-slate-600 font-semibold capitalize">
                  {order.paymentMethodType}
                </p>
              </div>
              <svg
                className="w-6 h-6 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
    </div>
    </>
  )
}