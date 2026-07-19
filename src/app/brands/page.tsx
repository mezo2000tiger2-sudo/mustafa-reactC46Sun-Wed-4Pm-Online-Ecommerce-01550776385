import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

export const metadata: Metadata = {
  title: "Brands | Freshcart",
  description: "Browse products by your favorite premium brands.",
};

export default async function Brands() {
  let payload: any = { data: [] };
  try {
    const resp = await fetch('https://ecommerce.routemisr.com/api/v1/brands?limit=27', {
      next: { revalidate: 3600 }
    })
    if (resp.ok) {
      payload = await resp.json()
    }
  } catch (err) {
    console.error('Error fetching brands:', err)
  }

  return (
    <div className="bg-[#f6f1e8] min-h-screen py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 border-b border-[#1c1914]/10 pb-6 flex items-baseline justify-between gap-4">
          <h1 className="text-3xl font-serif font-semibold tracking-tight text-[#1c1914]">Trusted brands</h1>
          <p className="text-sm text-[#1c1914]/60 font-medium hidden sm:block">Quality collections from top producers</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {payload?.data?.map((brand: any) => (
            <Link 
              key={brand._id} 
              href={`brands/${brand._id}`}
              className="group bg-white/80 backdrop-blur-sm rounded-[24px] border border-[#1c1914]/5 overflow-hidden shadow-[0_12px_32px_rgba(28,25,20,0.07)] transition-all duration-300 hover:shadow-[0_24px_48px_rgba(28,25,20,0.1)] hover:-translate-y-1 flex flex-col"
            >
              <div className="relative h-44 w-full overflow-hidden bg-white p-8">
                <Image 
                  src={brand.image} 
                  alt={brand.name} 
                  fill 
                  className="object-contain p-4 transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="p-6 border-t border-[#1c1914]/5 text-center mt-auto">
                <h2 className="font-bold text-[#1c1914] text-lg">{brand.name}</h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
