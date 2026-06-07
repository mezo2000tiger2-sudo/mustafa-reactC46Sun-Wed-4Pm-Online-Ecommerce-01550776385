'use client'
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import AddBTN from "../addBTN/addBTN"
import { ProductInterface } from "@/app/_type/ProductInterface"
import { useWishlist } from "@/app/_servecies/wishlist/getWishlist"

export function ProductCard({prod}:{prod: ProductInterface}) {

const { data, isLoading, error } = useWishlist()
  
  return (
    <Card className="group relative mx-auto w-full overflow-hidden rounded-[24px] border-[#1c1914]/5 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_32px_64px_rgba(0,0,0,0.08)] hover:-translate-y-2">
      
      <Link href={`/productdetails/${prod._id}`}>
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={prod.imageCover}
          alt={prod.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        <div className="absolute top-4 right-4 translate-x-4 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
           <Badge className="bg-white/90 backdrop-blur-md text-[#0e8528] border-none shadow-sm hover:bg-white">{prod.ratingsAverage} ★</Badge>
        </div>
      </div>
      <CardHeader className="p-5">
        <div className="mb-2">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#0e8528]/80">{prod.brand.name}</span>
        </div>
        <CardTitle className="line-clamp-1 font-serif text-lg font-semibold tracking-tight">{prod.title}</CardTitle>
        <CardDescription className="mt-2">
          <span className="line-clamp-2 text-[13px] leading-relaxed text-[#1c1914]/50">{prod.description}</span>
          <div className="mt-4 flex justify-between items-center w-full">
            <p className="text-lg font-bold text-[#1c1914]">{prod.price} <span className="text-[10px] font-medium opacity-60">EGP</span></p>
            <div className="flex items-center gap-1 text-[12px] font-bold text-[#0e8528]">
               {prod.quantity > 0 ? 'In stock' : 'Out of stock'}
            </div>
          </div>
        </CardDescription>
      </CardHeader>
      </Link>
      <div className="p-5 pt-0">
        <AddBTN data={data} id={prod._id}/> 
      </div>
    </Card>
  )
}
