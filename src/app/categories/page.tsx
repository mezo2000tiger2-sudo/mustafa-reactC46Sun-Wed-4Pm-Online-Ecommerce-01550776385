import { Metadata } from 'next';
import React from 'react'
import { Category } from '../_type/cartResponseInterface';
import Image from 'next/image';
import Link from 'next/link';
import SubcategoriesSection from './SubcategoriesSection';

export const metadata: Metadata = {
  title: "Categories | Freshcart",
  description: "Explore our curated categories of premium products.",
};

export default async function categories() {
  let categories: Category[] = []
  try {
    const resp = await fetch('https://ecommerce.routemisr.com/api/v1/categories', {
      next: { revalidate: 3600 }
    })
    if (resp.ok) {
      const payload = await resp.json()
      categories = payload?.data
    } else {
      console.error('Failed to fetch categories:', resp.statusText)
    }
  } catch (err) {
    console.error('Error fetching categories:', err)
  }

  return (
    <div className="bg-[#f6f1e8] min-h-screen py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section: Main Categories */}
        <div className="mb-10 border-b border-[#1c1914]/10 pb-6 flex items-baseline justify-between gap-4">
          <h1 className="text-3xl font-serif font-semibold tracking-tight text-[#1c1914]">Main categories</h1>
          <p className="text-sm text-[#1c1914]/60 font-medium hidden sm:block">Browse every top-level department first</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {categories?.map((category, index) => (
            <Link 
              key={category._id} 
              href={`/categories/${category._id}`}
              className="group bg-white/80 backdrop-blur-sm rounded-[24px] border border-[#1c1914]/5 overflow-hidden shadow-[0_12px_32px_rgba(28,25,20,0.07)] transition-all duration-300 hover:shadow-[0_24px_48px_rgba(28,25,20,0.1)] hover:-translate-y-1"
            >
              <div className="relative h-80 w-full overflow-hidden">
                <Image 
                  src={category.image} 
                  alt={category.name} 
                  fill 
                  priority={index < 4}
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="p-6">
                <h2 className="font-serif text-xl font-semibold text-[#1c1914] mb-2">{category.name}</h2>
                <div className="flex flex-wrap gap-1.5 opacity-80">
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#0e8528]/10 text-[#0e8528] uppercase tracking-wider">
                    Explore
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Section: Subcategories (Client Component with TanStack Query) */}
        <SubcategoriesSection />
      </div>
    </div>
  )
}
