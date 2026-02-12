'use client'
import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from 'next/image'
import Autoplay from 'embla-carousel-autoplay'

export default function ProductImages({images}:{images:string[]}) {
  return (
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
      className="w-full max-w-md mx-auto"
    >
      <CarouselContent className="ml-0">
        {images.map((img, index) => {
          return (
            <CarouselItem key={index} className="pl-0 flex justify-center">
              <Image 
                src={img} 
                width={300} 
                height={300}  
                alt={`Product image ${index + 1}`}
              />
            </CarouselItem>
          )
        })}
      </CarouselContent>

    </Carousel>
  )
}