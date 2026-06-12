'use client'
import React, { useEffect, useState } from 'react'
import { Badge } from "@/components/ui/badge"
import { ProductInterface } from '@/app/_type/ProductInterface'
import ProductImages from '@/app/_components/ProductImages/ProductImages'
import AddBTN from '@/app/_components/addBTN/addBTN'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import Loading from '@/app/loading'
import { verifyToken } from '@/app/_servecies/orders/verifytoken'
import { UpdateReview } from '@/app/_components/_updateAndDeleteRevie/UpdateReview/UpdateReview'
import DeleteReview from '@/app/_components/_updateAndDeleteRevie/DeleteReview/DeleteReview'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { addReview } from "@/app/_servecies/reviews/add_review"
import toast from "react-hot-toast"
import { Star, MessageSquarePlus, ChevronDown, ChevronUp, Heart, MoreHorizontal } from "lucide-react"

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
        <Star key={star} className={`size-3 ${star <= rating ? 'fill-[#f59e0b] text-[#f59e0b]' : 'text-[#1c1914]/10'}`} />
      ))}
    </div>
  )
}

export default function Productdetails() {
  const [userID, setuserID] = useState(false)
  const { id } = useParams() as { id: string }
  const queryClient = useQueryClient()

  // Review Form State
  const [isReviewFormVisible, setIsReviewFormVisible] = useState(false)
  const [newRating, setNewRating] = useState("")
  const [newReview, setNewReview] = useState("")

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
    if (verefy?.message === 'verified') {
      setuserID(true)
    }
  }, [verefy])

  const { mutate: submitReview, isPending: isSubmitting } = useMutation({
    mutationFn: addReview,
    onSuccess: (data) => {
      if (data.message === 'fail') {
        toast.error(data.errors.msg)
      } else {
        toast.success('Review added')
        queryClient.invalidateQueries({ queryKey: ['reviews', id] })
        setIsReviewFormVisible(false)
        setNewRating("")
        setNewReview("")
      }
    },
    onError: () => {
      toast.error('Error adding review')
    }
  })

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newRating || !newReview) {
      toast.error("All fields are required")
      return
    }
    submitReview({
      productid: id,
      rating: Number(newRating),
      review: newReview
    })
  }

  if (singleProductLoading || reviewLoading || verefyLoading) {
    return <Loading />
  }

  return (
    <div className="bg-[#f6f1e8] min-h-screen py-12 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Main Section: Product and Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start mb-16">
          
          {/* Left: Gallery Panel */}
          <div className="bg-[#fffcf7]/80 backdrop-blur-md rounded-[18px] border border-[#1c1914]/12 p-8 shadow-[0_12px_32px_rgba(28,25,20,0.07)] flex flex-col gap-6">
            <div className="relative aspect-square w-full rounded-[14px] border border-[#1c1914]/12 overflow-hidden bg-white/50">
               <ProductImages images={singleproduct?.images ?? []} />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {singleproduct?.images?.map((img, index) => (
                <div key={index} className="size-16 shrink-0 rounded-[12px] border border-[#1c1914]/12 overflow-hidden bg-[#e5e0d6]">
                  <img src={img} alt="" className="size-full object-cover opacity-60 hover:opacity-100 transition-opacity cursor-pointer" />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Info Panel */}
          <div className="bg-[#fffcf7]/80 backdrop-blur-md rounded-[18px] border border-[#1c1914]/12 p-10 shadow-[0_12px_32px_rgba(28,25,20,0.07)] flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap gap-2 mb-1">
                <span className="inline-block self-start text-[11px] font-bold px-3 py-1 rounded-full bg-[#0e8528]/12 text-[#0e8528] uppercase tracking-wider">
                  {singleproduct?.brand?.name}
                </span>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1c1914]/5 border border-[#1c1914]/5">
                  {singleproduct?.category?.image && (
                    <img src={singleproduct.category.image} alt="" className="size-3.5 rounded-full object-cover opacity-60" />
                  )}
                  <span className="text-[11px] font-bold text-[#1c1914]/60 uppercase tracking-wider">
                    {singleproduct?.category?.name}
                  </span>
                </div>
              </div>
              
              <h1 className="font-serif text-[1.75rem] font-semibold text-[#1c1914] leading-[1.1]">
                {singleproduct?.title}
              </h1>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] font-bold text-[#1c1914]/25 uppercase tracking-widest mt-1">
                   <span>SKU: {singleproduct?._id.slice(-8)}</span>
                   <span className="h-1 w-1 rounded-full bg-[#1c1914]/15" />
                   <span>SLUG: {singleproduct?.slug}</span>
              </div>

              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-2">
                   <StarRating rating={Math.round(singleproduct?.ratingsAverage ?? 0)} />
                   <span className="text-[11px] font-bold text-[#0e8528] bg-[#0e8528]/16 px-2 py-0.5 rounded-full uppercase tracking-widest">
                     {singleproduct?.sold} sold
                   </span>
                   <span className="text-[11px] font-bold text-[#1c1914]/40 border-l border-[#1c1914]/10 pl-2">
                     {singleproduct?.ratingsQuantity} reviews
                   </span>
                   <span className="text-[11px] font-bold text-[#d97706] bg-[#d97706]/15 px-2 py-0.5 rounded-full uppercase tracking-widest">
                     Only {singleproduct?.quantity} left
                   </span>
                </div>
              </div>
            </div>

            {/* Description Area */}
            <div className="space-y-3">
              <h3 className="text-[12px] font-bold text-[#1c1914] uppercase tracking-[0.15em]">Description</h3>
              <div className="space-y-4">
                {/* Specification Pills (Lines with tabs) */}
                {singleproduct?.description?.includes('\t') && (
                  <div className="flex flex-wrap items-center gap-2">
                    {singleproduct.description.split('\n').map((line, i) => {
                      const parts = line.split('\t');
                      return parts.length > 1 ? (
                        <div key={i} className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[#1c1914]/5 border border-[#1c1914]/5">
                          <span className="text-[9px] font-black text-[#1c1914]/30 uppercase tracking-tighter">{parts[0]}:</span>
                          <span className="text-[10px] font-bold text-[#1c1914]/60 whitespace-nowrap">{parts[1]}</span>
                        </div>
                      ) : null;
                    })}
                  </div>
                )}
                
                {/* Narrative Text (Lines without tabs) */}
                <div className="text-[#1c1914]/55 font-medium leading-relaxed text-[14px] space-y-2">
                  {singleproduct?.description?.split('\n').map((line, i) => {
                    return !line.includes('\t') && line.trim() ? (
                      <p key={i}>{line}</p>
                    ) : (
                      /* If the whole description has NO tabs at all, just render it as a paragraph */
                      !singleproduct?.description?.includes('\t') && i === 0 ? <p key={i}>{singleproduct?.description}</p> : null
                    );
                  })}
                </div>
              </div>
            </div>

            {singleproduct?.subcategory && singleproduct.subcategory.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {singleproduct.subcategory.map((sub) => (
                  <span key={sub._id} className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[#f6f1e8] text-[#1c1914]/40 border border-[#1c1914]/5">
                    #{sub.name}
                  </span>
                ))}
              </div>
            )}

            <div className="flex items-baseline gap-3">
              <div className="text-[26px] font-bold text-[#0e8528] tracking-tight">
                {singleproduct?.priceAfterDiscount ? singleproduct.priceAfterDiscount : singleproduct?.price} EGP
              </div>
              {singleproduct?.priceAfterDiscount && (
                <div className="text-[16px] font-medium text-[#1c1914]/30 line-through decoration-1">
                  {singleproduct?.price} EGP
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-4 mt-2">
              <div className="inline-flex items-center self-start border border-[#1c1914]/12 rounded-[10px] overflow-hidden bg-[#fffdf8]">
                  <button className="px-3 py-2 font-extrabold bg-[#f6f1e8]/40 hover:bg-[#f6f1e8]/80 border-r border-[#1c1914]/12">-</button>
                  <span className="px-4 py-2 font-bold min-w-[44px] text-center text-[#1c1914]">1</span>
                  <button className="px-3 py-2 font-extrabold bg-[#f6f1e8]/40 hover:bg-[#f6f1e8]/80 border-l border-[#1c1914]/12">+</button>
              </div>
              <div className="flex-1">
                {singleproduct?._id && <AddBTN id={singleproduct._id} data={[]} />}
              </div>
              <button className="size-12 flex items-center justify-center rounded-[14px] border border-[#1c1914]/12 bg-[#fffcf7]/75 text-[#1c1914] hover:bg-[#0e8528]/10 hover:border-[#0e8528] transition-all">
                <Heart className="size-5" />
              </button>
            </div>

            {/* Timeline Metadata */}
            <div className="flex justify-between text-[9px] font-bold text-[#1c1914]/20 uppercase tracking-widest pt-2 border-t border-[#1c1914]/5">
              <span>Curated: {new Date(singleproduct?.createdAt ?? '').toLocaleDateString()}</span>
              <span>Restocked: {new Date(singleproduct?.updatedAt ?? '').toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* Section: Reviews */}
        <div className="mb-10 border-b border-[#1c1914]/12 pb-4 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-serif text-[1.2rem] font-semibold text-[#1c1914]">Customer Reviews</h2>
          </div>
          
          {userID && (
            <Button 
              onClick={() => setIsReviewFormVisible(!isReviewFormVisible)}
              className="bg-[#0e8528] hover:bg-[#0e8528]/90 text-white font-bold px-6 py-2.5 rounded-full text-[13px] shadow-[0_10px_20px_rgba(14,133,40,0.2)] transition-all flex items-center gap-2"
            >
              <MessageSquarePlus className="size-4" />
              {isReviewFormVisible ? 'Hide Review Form' : 'Write a Review'}
              {isReviewFormVisible ? <ChevronUp className="size-3" /> : <ChevronDown className="size-3" />}
            </Button>
          )}
        </div>

        {/* Review Form - Toggleable Dropdown Panel */}
        {userID && isReviewFormVisible && (
          <div className="bg-[#fffcf7] rounded-[18px] border border-[#1c1914]/12 p-8 shadow-[0_20px_48px_rgba(28,25,20,0.12)] mb-10 animate-in fade-in slide-in-from-top-4 duration-300">
            <h3 className="font-serif text-[1.05rem] font-semibold text-[#1c1914] mb-6">Write a Review</h3>
            <form onSubmit={handleAddReview} className="space-y-6 max-w-2xl">
              <div className="space-y-2">
                <Label className="text-[12px] font-bold text-[#1c1914]/72 uppercase tracking-wide">Satisfaction Rating</Label>
                <Select value={newRating} onValueChange={setNewRating}>
                  <SelectTrigger className="w-full sm:w-[200px] h-11 rounded-[10px] border-[#1c1914]/12 bg-[#fffdf8] focus:ring-[#0e8528]/20">
                    <SelectValue placeholder="Pick a rating" />
                  </SelectTrigger>
                  <SelectContent className="rounded-[10px] border-[#1c1914]/12 shadow-xl">
                    {[5, 4, 3, 2, 1].map((num) => (
                      <SelectItem key={num} value={String(num)} className="py-2.5">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm">{num}</span>
                          <div className="flex">
                            {Array.from({ length: num }).map((_, i) => (
                              <Star key={i} className="size-3 fill-[#f59e0b] text-[#f59e0b]" />
                            ))}
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-[12px] font-bold text-[#1c1914]/72 uppercase tracking-wide">Your experience</Label>
                <textarea
                  placeholder="Tell us what you think of this product..."
                  value={newReview}
                  onChange={(e) => setNewReview(e.target.value)}
                  className="w-full min-h-[100px] rounded-[10px] border border-[#1c1914]/12 p-4 bg-[#fffdf8] text-[#1c1914] placeholder:text-[#1c1914]/30 focus:outline-none focus:ring-1 focus:ring-[#0e8528]/30 transition-all resize-y"
                />
              </div>

              <Button 
                type="submit" 
                className="bg-[#0e8528] hover:bg-[#0e8528]/90 text-white font-bold px-8 py-3 rounded-[12px] text-[13px] shadow-lg shadow-[#0e8528]/20 transition-all"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Posting...' : 'Submit review'}
              </Button>
            </form>
          </div>
        )}

        <div className="bg-[#fffcf7]/88 backdrop-blur-sm rounded-[18px] border border-[#1c1914]/12 p-8 shadow-[0_12px_32px_rgba(28,25,20,0.07)] flex flex-col gap-4">
          {reviews.length > 0 ? (
            reviews.map((rev) => (
              <div key={rev._id} className="flex gap-3 items-start p-4 pb-6 border-b border-[#1c1914]/12 last:border-0 last:pb-0 group">
                <div className="size-10 shrink-0 rounded-full flex items-center justify-center bg-gradient-to-br from-[#eadfd2] to-[#dbe8db] text-[13px] font-bold text-[#1c1914] border border-[#fffcf7] shadow-sm">
                  {rev.user.name.slice(0, 2).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-4 mb-1">
                    <div className="flex items-center gap-2">
                      <strong className="text-[14px] font-bold text-[#1c1914]">{rev.user.name}</strong>
                      {userID && verefy?.decoded?.id === rev.user._id && (
                         <span className="text-[10px] font-bold text-[#0e8528] bg-[#0e8528]/10 px-2 py-0.5 rounded-full uppercase tracking-widest">(You)</span>
                      )}
                      <StarRating rating={rev.rating} />
                    </div>

                    {/* Actions for review owner - Three Dots Dropdown */}
                    {userID && verefy?.decoded?.id === rev.user._id && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full hover:bg-[#1c1914]/5 transition-colors focus-visible:ring-0">
                            <MoreHorizontal className="size-4 text-[#1c1914]/40" />
                            <span className="sr-only">Open options</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[180px] rounded-[14px] border-[#1c1914]/12 shadow-xl bg-white/95 backdrop-blur-md p-1">
                           <UpdateReview reviewId={rev._id} id={id}/>
                           <DropdownMenuSeparator className="bg-[#1c1914]/5 mx-1 my-1" />
                           <DeleteReview reviewId={rev._id} id={id}/>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>
                  <p className="text-[13px] text-[#1c1914]/70 leading-relaxed font-medium">
                    {rev.review}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="py-12 text-center">
               <p className="text-[14px] text-[#1c1914]/40 font-bold italic">No reviews curated yet for this piece.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
