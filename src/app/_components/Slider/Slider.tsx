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
          640: { slidesPerView: 3, spaceBetween: 24 },
          1024: { slidesPerView: 5, spaceBetween: 32 },
          1440: { slidesPerView: 6, spaceBetween: 40 },
        }}
        loop={categories.length > 6}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        watchSlidesProgress={true}
        className="w-full pb-10"
      >
        {categories?.map((cat, index) => (
          <SwiperSlide key={cat._id}>
            <div className="group relative overflow-hidden rounded-[22px] border border-[#1c1914]/5 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:-translate-y-1.5">
              <Link href={`/categories/${cat._id}`} className="block w-full aspect-[4/5] relative">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 15vw"
                  priority={index < 4}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="text-sm font-bold text-white tracking-tight">{cat.name}</p>
                </div>
              </Link>
            </div>
            <p className="mt-4 text-center text-[13px] font-bold tracking-tight text-[#1c1914]/80 group-hover:text-[#0e8528]">{cat.name}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}
