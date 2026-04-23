import { Category } from '@/app/_type/cartResponseInterface';
import React from 'react'
import Slider from '../Slider/Slider';

export default function CategorySlider({ categories }: { categories: Category[] }) {
  return (
    <div className='mb-6'>
        <Slider categories={categories} />
    </div>
  )
}
