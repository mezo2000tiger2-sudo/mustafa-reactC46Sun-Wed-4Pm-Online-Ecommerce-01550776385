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
    <div className='mb-7 flex'>
        <div className='w-3/4'>
    <Swiper
    modules={[Autoplay]}
    slidesPerView={1}
    loop={true}
    autoplay={{ delay: 3000, disableOnInteraction: false }}
    watchSlidesProgress={true}
    >
        <SwiperSlide>
          <div className="w-full h-72 relative bg-gray-100">
            <Image src={sliderIMG1} sizes="(max-width: 768px) 75vw, 75vw" alt="sliderIMG1" fill className="object-cover" priority />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full h-72 relative bg-gray-100">
            <Image src={sliderIMG2} sizes="(max-width: 768px) 75vw, 75vw" alt="sliderIMG2" fill className="object-cover" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full h-72 relative bg-gray-100">
            <Image src={sliderIMG3} sizes="(max-width: 768px) 75vw, 75vw" alt="sliderIMG3" fill className="object-cover" />
          </div>
        </SwiperSlide>
        
    </Swiper>
        </div>
        <div className="w-1/4 flex flex-col">
            <div className="w-full h-36 relative bg-gray-100">
            <Image src={BlogIMG1} sizes="(max-width: 768px) 25vw, 25vw" alt="blogimg1" fill className="object-cover" />
          </div>
            <div className="w-full h-36 relative bg-gray-100">
            <Image src={BlogIMG2} sizes="(max-width: 768px) 25vw, 25vw" alt="blogimg2" fill className="object-cover" />
          </div>
        </div>
    </div>
  )
}