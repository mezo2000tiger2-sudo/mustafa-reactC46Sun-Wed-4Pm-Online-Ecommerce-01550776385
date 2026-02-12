import { Metadata } from 'next';
import React from 'react'
import { Category } from '../_type/cartResponseInterface';
import Image from 'next/image';
import Link from 'next/link';
export const metadata: Metadata = {
  title: "categories",
  description: "an E-commerce website",
};

export default async function categories() {
  let categories:Category[] = []
  try {
    const resp = await fetch('https://ecommerce.routemisr.com/api/v1/categories')
    if (resp.ok) {
      const payload = await resp.json()
      categories = payload?.data
    } else {
      console.error('Failed to fetch categories:', resp.statusText)
    }
  } catch (err) {
    console.error('Error fetching categories:', err)
  }
  console.log(categories);
  return (
    <div className="bg-main min-h-screen p-4">
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-7'>
        {categories?.map((category: any) => (
          
          <div key={category._id} className="bg-white rounded-lg shadow-sm overflow-hidden p-4">
            <Link href={`/categories/${category._id}`} >
            <Image src={category.image} alt={category.name} width={200} height={200} className='object-contain w-full h-40' />
            <h2 className='text-center'>{category.name}</h2>
          </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
