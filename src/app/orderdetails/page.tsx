'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Order } from '../_type/order'
import Loading from '../loading'

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

  const isPaid = order.isPaid

  return (
    <div className="min-h-screen bg-[#f6f1e8] pb-12">
      <button
        onClick={() => router.push('/allorders')}
        className="inline-flex items-center gap-1.5 px-4 pt-4 pb-2 text-sm font-semibold text-[rgba(28,25,20,0.62)] hover:text-[#1c1914] transition-colors cursor-pointer"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
        Back to Orders
      </button>

      <div className="max-w-[640px] mx-auto px-4">
        <div className="rounded-[18px] border border-[rgba(28,25,20,0.12)] bg-[rgba(255,252,247,0.96)] shadow-[0_22px_55px_rgba(28,25,20,0.12)] overflow-hidden">
          <div className="bg-[rgba(28,25,20,0.05)] px-5 py-[18px] flex justify-between items-center gap-3 border-b border-[rgba(28,25,20,0.12)]">
            <h4 className="m-0 text-[15px] font-bold break-all text-[#1c1914]">
              Order #{order._id}
            </h4>
            <Badge
              variant="outline"
              className={`shrink-0 text-xs font-bold px-3 py-1.5 rounded-full border lowercase ${
                order.paymentMethodType === 'visa'
                  ? 'bg-[rgba(37,99,235,0.12)] border-[rgba(37,99,235,0.3)] text-[#1c1914]'
                  : 'bg-white border-[rgba(28,25,20,0.12)] text-[#1c1914]'
              }`}
            >
              {order.paymentMethodType}
            </Badge>
          </div>

          <div className="px-5 py-[18px]">
            <h6 className="m-0 mb-2.5 text-[13px] font-bold text-[rgba(28,25,20,0.68)]">
              Customer Details
            </h6>
            <div className="bg-[rgba(28,25,20,0.04)] rounded-xl p-3.5 flex gap-3 items-start">
              <Avatar className="w-10 h-10 shrink-0">
                <AvatarFallback className="bg-[#2563eb] text-white font-extrabold text-sm">
                  {order.user.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="m-0 font-bold text-[#1c1914]">{order.user.name}</p>
                <p className="m-0 text-[13px] text-[rgba(28,25,20,0.58)]">{order.user.email}</p>
                <p className="m-0 text-[13px] text-[rgba(28,25,20,0.58)]">{order.user.phone}</p>
              </div>
            </div>

            {order.shippingAddress && (
              <div className="mt-3 bg-[rgba(14,133,40,0.06)] border border-[rgba(14,133,40,0.18)] rounded-xl px-3.5 py-3 text-xs grid gap-1 text-[#1c1914]">
                <span className="font-bold">Shipping address</span>
                <span><strong>phone:</strong> {order.shippingAddress.phone}</span>
                <span><strong>city:</strong> {order.shippingAddress.city}</span>
                <span><strong>details:</strong> {order.shippingAddress.details}</span>
              </div>
            )}
          </div>

          <div className="px-5 pb-[18px]">
            <h6 className="m-0 mb-2.5 text-[13px] font-bold text-[rgba(28,25,20,0.68)]">
              Order Items ({order.cartItems.length})
            </h6>
            <div className="space-y-2.5">
              {order.cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-3 p-2.5 rounded-xl bg-[rgba(28,25,20,0.04)]"
                >
                  <img
                    src={item.product.imageCover}
                    alt={item.product.title}
                    className="w-14 h-14 shrink-0 object-cover rounded-[10px] border border-[rgba(28,25,20,0.12)]"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="m-0 text-[13px] font-bold leading-tight text-[#1c1914] truncate">
                      {item.product.title}
                    </p>
                    <p className="m-0 text-[11px] text-[rgba(28,25,20,0.55)]">
                      Qty: {item.count}
                    </p>
                  </div>
                  <span className="text-[13px] font-extrabold text-[#1c1914] shrink-0">
                    {item.price} EGP
                  </span>
                </div>
              ))}
            </div>
          </div>

          <Separator className="bg-[rgba(28,25,20,0.12)]" />

          <div className="px-5 py-4 grid gap-2">
            <div className="flex justify-between text-[13px] text-[rgba(28,25,20,0.62)]">
              <span>Shipping</span>
              <span>{order.shippingPrice} EGP</span>
            </div>
            <div className="flex justify-between text-[13px] text-[rgba(28,25,20,0.62)]">
              <span>Tax</span>
              <span>{order.taxPrice} EGP</span>
            </div>
            <div className="flex justify-between text-[15px] font-extrabold text-[#1c1914] pt-2.5 mt-1 border-t border-[rgba(28,25,20,0.12)]">
              <span>Total</span>
              <span className="text-[#2563eb]">{order.totalOrderPrice} EGP</span>
            </div>
          </div>

          <div className="px-5 py-3.5 pb-[18px] border-t border-[rgba(28,25,20,0.12)] flex justify-between items-center text-[13px]">
            <div>
              <strong>Payment Method:</strong>{' '}
              <span className="font-bold capitalize">{order.paymentMethodType}</span>
            </div>
            <span
              className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                isPaid
                  ? 'bg-[rgba(14,133,40,0.14)] text-[rgba(14,133,40,0.75)]'
                  : 'bg-[rgba(28,25,20,0.08)] text-[rgba(28,25,20,0.7)]'
              }`}
            >
              {isPaid ? 'Paid' : 'Not Paid'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}