'use client'
import React from 'react'
import Image from 'next/image'
import 'swiper/css'
import { SwiperSlide, Swiper } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import { Category } from '@/app/_type/cartResponseInterface'
import Link from 'next/link'


export default function Slider({ categories }: { categories: Category[] }) {
  return (
    <>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={10}
        slidesPerView={2}
        breakpoints={{
          640: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
        }}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: false }}
      >
        {categories?.map((cat) => (
          <SwiperSlide key={cat._id}>
            <div className="w-full h-45 relative rounded-sm overflow-hidden">
              <Link href={`/categories/${cat._id}`} className="block w-full h-full relative">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
                />
              </Link>
            </div>
          </SwiperSlide>
        ))}

      </Swiper>
    </>
  )
}
