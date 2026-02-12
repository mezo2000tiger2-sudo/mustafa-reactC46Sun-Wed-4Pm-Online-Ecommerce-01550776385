'use client'
import React, { useEffect, useState } from 'react'
import { Badge } from "@/components/ui/badge"
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import { ProductInterface } from '@/app/_type/ProductInterface'
import ProductImages from '@/app/_components/ProductImages/ProductImages'
import AddBTN from '@/app/_components/addBTN/addBTN'
import { AddReview } from '@/app/_components/AddReview/AddReview'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import Loading from '@/app/loading'
import { verifyToken } from '@/app/_servecies/orders/verifytoken'
import { Button } from '@/components/ui/button'
import { UpdateReview } from '@/app/_components/_updateAndDeleteRevie/UpdateReview/UpdateReview'
import DeleteReview from '@/app/_components/_updateAndDeleteRevie/DeleteReview/DeleteReview'

type paramsType = {
  params: { id: string }
}

interface Review {
  _id: string
  review: string
  rating: number
  user: { _id: string; name: string }
  createdAt: string
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg key={star} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
          className="size-3"
          fill={star <= rating ? '#f59e0b' : 'none'}
          stroke={star <= rating ? '#f59e0b' : '#d1d5db'}
          strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
        </svg>
      ))}
    </div>
  )
}

export default function Productdetails() {
    const [userID, setuserID] = useState(false)

  const { id } = useParams() as { id: string }

  const { isLoading: singleProductLoading, data: singleproduct } = useQuery<ProductInterface>({
  queryKey: ['singleproduct', id],  
  queryFn: async () => {
    const resp = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    const { data } = await resp.json()
    return data
  },
})

const { isLoading: reviewLoading, data: reviews = [] } = useQuery<Review[]>({
  queryKey: ['reviews', id], 
  queryFn: async () => {
    const reviewResp = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}/reviews`)
    const payload = await reviewResp.json()
    return payload.data
  },
})
const { isLoading: verefyLoading, data: verefy } = useQuery({
  queryKey: ['verify', id], 
  queryFn: verifyToken,
})
useEffect(() => {
  if (verefy?.message == 'verified') {
    setuserID(true)
  }
}, [verefy])
  if(singleProductLoading || reviewLoading || verefyLoading){
    return <Loading/>
  }
  console.log('reviews' ,reviews);
  console.log('verefy' ,verefy);
  

  return (
    <div className="bg-main min-h-screen p-5 md:p-15">
      <div className="grid md:grid-cols-3 gap-5 items-start">

        <div className="md:col-span-1 flex items-center justify-center w-full">
          <div>
            <ProductImages key="product-images" images={singleproduct?.images ?? []} />            <div className="flex gap-4 py-4 justify-center overflow-x-auto">
              {singleproduct?.images?.map((img, index) => (
                <img key={index} src={img} alt="Thumbnail"
                  className="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300" />
              ))}
            </div>
          </div>
        </div>

        <div className="md:col-span-2 flex flex-col gap-4">

          <Card className="w-full p-8">
            <CardHeader>
              <CardAction>
                <Badge variant="secondary">{singleproduct?.brand?.name}</Badge>
              </CardAction>
              <CardTitle className="text-xl font-bold">
                {singleproduct?.title?.split(' ').slice(0, 2).join(' ')}
              </CardTitle>
              <CardDescription>
                <span className="text-sm text-gray-500 leading-relaxed">{singleproduct?.description}</span>
                <div className="flex items-center justify-between mt-4">
                  <p className="text-lg font-bold text-gray-900">{singleproduct?.price} EGP</p>
                  <div className="flex items-center gap-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="size-4" fill="#f59e0b" stroke="#f59e0b" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                    </svg>
                    <span className="text-sm font-semibold text-gray-700">{singleproduct?.ratingsAverage}</span>
                    <span className="text-xs text-gray-400">/ 5</span>
                  </div>
                </div>
              </CardDescription>
            </CardHeader>
            {singleproduct?._id && <AddBTN id={singleproduct._id} data={[]} />}
          </Card>

          <Card className="w-full p-6">
            <div className='flex justify-between items-center mb-4'>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-gray-800">Customer Reviews</h3>
                <Badge variant="secondary" className="text-xs px-2 py-0">{reviews.length}</Badge>
              </div>
               {userID && singleproduct?._id && <AddReview productid={singleproduct._id} />}
            </div>

            {reviews.length > 0 ? (
              <div className="flex flex-col gap-3">
                {reviews.map((rev) => (
                  <div key={rev._id}>
                    <div className="flex items-start justify-between gap-3 border-2 p-2 py-4 rounded-lg">
                      <div className="flex items-start gap-3">
                        <div className="size-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-xs font-bold text-gray-500 shrink-0">
                          {rev.user.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-semibold text-gray-800">{rev.user.name}</span>
                            <StarRating rating={rev.rating} />
                          </div>
                          <p className="text-sm text-gray-500 leading-relaxed">{rev.review}</p>
                        </div>
                      </div>
                      {  userID && verefy?.decoded?.id==rev.user._id? <div className='flex gap-3 items-center'>
                        <UpdateReview reviewId={rev._id} id={id}/>
                        <DeleteReview reviewId={rev._id} id={id}/>
                      </div>:<></>}
                      
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400">No reviews yet.</p>
            )}
          </Card>

        </div>
      </div>
    </div>
  )
}