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
    <Card className="relative mx-auto w-full overflow-hidden max-w-sm pt-0">
      
      <Link href={`/productdetails/${prod._id}`}>

      <Image
        src={prod.imageCover}
        alt={prod.title}
        width={500}
        height={400}
        className="w-full mb-2 "
      />
      <CardHeader>
        <CardAction>
          <Badge variant="secondary">{prod.brand.name}</Badge>
        </CardAction>
        <CardTitle>{prod.title.split(' ').slice(0,2).join(' ')}</CardTitle>
        <CardDescription >
          <span className="line-clamp-3">{prod.description}</span>
          <div className="flex justify-between gap-3 items-center w-full">

          <p className="text-md font-semibold text-black">{prod.price}EGP</p>
          <p className="text-md font-semibold text-black flex gap-0.5  items-center">
            {prod.ratingsAverage}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text text-yellow-400 border-0">
          <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
          </svg>



          </p>
          </div>
        </CardDescription>
      </CardHeader>
      </Link>
      <AddBTN data={data} id={prod._id}/> 
    </Card>
  )
}
