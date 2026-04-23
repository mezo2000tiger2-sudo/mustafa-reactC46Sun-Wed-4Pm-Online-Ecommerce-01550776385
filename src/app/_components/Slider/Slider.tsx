'use client'
import React from 'react'
import Image from 'next/image'
import 'swiper/css'
import { SwiperSlide, Swiper } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import { Category } from '@/app/_type/cartResponseInterface'
import Link from 'next/link'


export default function Slider({ categories }: { categories: Category[] }) {
  if (!categories?.length) return null;

  return (
    <>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={10}
        slidesPerView={2}
        breakpoints={{
          640: { slidesPerView: 3, spaceBetween: 20 },
          1024: { slidesPerView: 4, spaceBetween: 30 },
        }}
        loop={categories.length > 4}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        watchSlidesProgress={true}
        className="w-full"
      >
        {categories?.map((cat, index) => (
          <SwiperSlide key={cat._id}>
            <div className="w-full h-44 relative rounded-sm overflow-hidden bg-gray-100">
              <Link href={`/categories/${cat._id}`} className="block w-full h-full relative">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  priority={index < 2}
                />
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}
