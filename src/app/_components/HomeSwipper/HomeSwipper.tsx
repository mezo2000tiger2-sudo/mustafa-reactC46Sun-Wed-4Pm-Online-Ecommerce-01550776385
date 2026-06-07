'use client'
import React from 'react'
import { SwiperSlide , Swiper } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import sliderIMG1 from '../../../assets/images/slider-image-1.jpeg'
import sliderIMG2 from '../../../assets/images/slider-image-2.jpeg'
import sliderIMG3 from '../../../assets/images/slider-image-3.jpeg'
import BlogIMG1 from '../../../assets/images/blog-img-1.jpeg'
import BlogIMG2 from '../../../assets/images/blog-img-2.jpeg'
import Image from 'next/image'

export default function HomeSwipper() {
  return (
    <div className='h-full w-full flex'>
        <div className='w-full'>
    <Swiper
    modules={[Autoplay]}
    slidesPerView={1}
    loop={true}
    autoplay={{ delay: 3000, disableOnInteraction: false }}
    watchSlidesProgress={true}
    className="h-full w-full"
    >
        <SwiperSlide>
          <div className="w-full h-full relative bg-gray-100">
            <Image src={sliderIMG1} sizes="(max-width: 768px) 100vw, 80vw" alt="sliderIMG1" fill className="object-cover" priority />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full h-full relative bg-gray-100">
            <Image src={sliderIMG2} sizes="(max-width: 768px) 100vw, 80vw" alt="sliderIMG2" fill className="object-cover" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full h-full relative bg-gray-100">
            <Image src={sliderIMG3} sizes="(max-width: 768px) 100vw, 80vw" alt="sliderIMG3" fill className="object-cover" />
          </div>
        </SwiperSlide>
        
    </Swiper>
        </div>
    </div>
  )
}