'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { verifyToken } from '../_servecies/orders/verifytoken';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getOrders } from '../_servecies/orders/getOrders';
import Loading from '../loading';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Order } from '../_type/order';


export default  function Orders() {
  const router = useRouter()
  const [userId, setuserId] = useState('')
    const {data , isLoading}=useQuery({
      queryKey:['verefy-token'],
      queryFn: verifyToken,
    })

    const {mutate, data:orders, isPending} = useMutation({
      mutationFn: getOrders,
    })

    const Id = data?.decoded?.id;

    useEffect(()=>{
      if(Id){
        setuserId(Id)
        mutate(Id)
      }
    },[Id])

    if(isLoading || isPending){
      return <Loading/>
    }

    console.log(orders);
        
  return (
    <>
    <div className='min-h-screen p-4 md:p-10 bg-main'>
      <div className='bg-white p-5 rounded-lg'>
        <h2 className='text-black text-center text-2xl font-bold mb-5'>My Orders</h2>
        {orders?.map((order:Order)=>{ return <Card key={order._id} className="w-full mb-5 hover:shadow-2xl cursor-pointer hover:-translate-y-3 transition-all" onClick={()=>{
          localStorage.setItem('orderDetails', JSON.stringify(order))
          router.push('/orderdetails')
        }}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Order #{order._id}</CardTitle>
          <Badge variant="secondary">{order.isPaid ? 'Paid' : 'Not Paid'}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-end">
          <div className="space-y-2">
            <p className="text-sm text-slate-600">Customer: {order.user.name}</p>
            <p className="text-sm text-slate-600">Phone: {order.shippingAddress.phone}</p>
            <p className="text-sm text-slate-600">City: {order.shippingAddress.city}</p>
            <p className="text-sm text-slate-600">Details: {order.shippingAddress.details}</p>
            <p className="text-lg font-semibold text-slate-900 mt-3">
              Total: {order.totalOrderPrice} EGP
            </p>
          </div>
          <div className="flex gap-2 overflow-hidden">
            {order.cartItems.slice(0, 2).map((item, index) => (
              <img 
                key={index}
                src={item.product.imageCover} 
                alt="Product" 
                className="w-24 h-24 object-cover rounded-md border border-slate-200"
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>})}
      
      </div>
    </div>
     
    </>
  )
}
