'use client'
import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import Image from 'next/image'
import Autoplay from 'embla-carousel-autoplay'

export default function ProductImages({images}:{images:string[]}) {
  if (!images || images.length === 0) {
    return (
      <div className="w-full aspect-square bg-[#1c1914]/5 flex items-center justify-center rounded-[14px]">
        <p className="text-[12px] font-bold text-[#1c1914]/20 uppercase tracking-widest">No images curated</p>
      </div>
    )
  }

  return (
    <div className="relative w-full aspect-square overflow-hidden rounded-[14px]">
      <Carousel
        opts={{
          align: "center",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 4000,
          }),
        ]}
        className="w-full h-full"
      >
        <CarouselContent className="h-full ml-0">
          {images.map((img, index) => (
            <CarouselItem key={index} className="relative h-full pl-0">
              <Image 
                src={img} 
                alt={`Product image ${index + 1}`}
                fill
                className="object-contain"
                priority={index === 0}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}
