'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { verifyToken } from '../_servecies/orders/verifytoken';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getOrders } from '../_servecies/orders/getOrders';
import Loading from '../loading';
import { Order } from '../_type/order';

export default function Orders() {
  const router = useRouter()
  const [userId, setuserId] = useState('')
  const { data, isLoading } = useQuery({
    queryKey: ['verefy-token'],
    queryFn: verifyToken,
  })

  const { mutate, data: orders, isPending } = useMutation({
    mutationFn: getOrders,
  })

  const Id = data?.decoded?.id;

  useEffect(() => {
    if (Id) {
      setuserId(Id)
      mutate(Id)
    }
  }, [Id])

  if (isLoading || isPending) {
    return <Loading />
  }

  return (
    <div className="min-h-screen bg-[#f6f1e8] py-10 px-4 md:px-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-end justify-between gap-3 border-b border-[rgba(28,25,20,0.12)] pb-3 mb-6">
          <h2 className="font-serif text-xl font-semibold tracking-tight text-[#1c1914] m-0">
            My Orders
          </h2>
          <span className="text-xs font-medium text-[rgba(28,25,20,0.55)]">
            {orders?.length || 0} {orders?.length === 1 ? 'order' : 'orders'}
          </span>
        </div>

        {orders?.map((order: Order) => (
          <article
            key={order._id}
            onClick={() => {
              localStorage.setItem('orderDetails', JSON.stringify(order))
              router.push('/orderdetails')
            }}
            className="bg-[rgba(255,252,247,0.95)] border border-[rgba(28,25,20,0.12)] rounded-[18px] overflow-hidden mb-4 shadow-[0_10px_28px_rgba(28,25,20,0.08)] transition-all duration-200 hover:translate-y-[-4px] hover:shadow-[0_18px_40px_rgba(28,25,20,0.12)] cursor-pointer"
          >
            <div className="flex items-center justify-between gap-3 px-[18px] pt-4 pb-[10px] border-b border-[rgba(28,25,20,0.084)]">
              <h5 className="m-0 text-[clamp(11px,2vw,15px)] font-bold text-[rgba(28,25,20,0.72)] break-all">
                Order #{order._id}
              </h5>
              <span
                className={`text-[11px] font-bold px-[10px] py-[5px] rounded-[999px] whitespace-nowrap flex-shrink-0 ${
                  order.isPaid
                    ? 'bg-[rgba(14,133,40,0.14)] text-[rgba(14,133,40,0.75)]'
                    : 'bg-[rgba(28,25,20,0.08)] text-[rgba(28,25,20,0.7)]'
                }`}
              >
                {order.isPaid ? 'Paid' : 'Not Paid'}
              </span>
            </div>

            <div className="flex justify-between items-end gap-4 px-[18px] pb-[18px] pt-3">
              <div className="grid gap-[6px] text-[13px] text-[rgba(28,25,20,0.62)]">
                <span>Customer: <strong className="font-semibold text-[rgba(28,25,20,0.78)]">{order.user.name}</strong></span>
                <span>Phone: <strong className="font-semibold text-[rgba(28,25,20,0.78)]">{order.shippingAddress.phone}</strong></span>
                <span>City: <strong className="font-semibold text-[rgba(28,25,20,0.78)]">{order.shippingAddress.city}</strong></span>
                <span>Details: <strong className="font-semibold text-[rgba(28,25,20,0.78)]">{order.shippingAddress.details}</strong></span>
                <strong className="block mt-2 text-base font-extrabold text-[#1c1914]">
                  Total: {order.totalOrderPrice} EGP
                </strong>
              </div>

              <div className="flex gap-2 flex-shrink-0">
                {order.cartItems.slice(0, 2).map((item, index) => (
                  <img
                    key={index}
                    src={item.product.imageCover}
                    alt="Product"
                    className="w-[72px] h-[72px] object-cover rounded-[10px] border border-[rgba(28,25,20,0.12)]"
                  />
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
