import { Category } from '@/app/_type/cartResponseInterface';
import React from 'react'
import Slider from '../Slider/Slider';

export default async function CategorySlider() {
    const resp = await fetch('https://ecommerce.routemisr.com/api/v1/categories')
    const payload = await resp.json()
    const categories:Category[] = payload?.data    
  return (
    <div className='mb-6'>

        <Slider categories={categories} />
    </div>
  )
}
