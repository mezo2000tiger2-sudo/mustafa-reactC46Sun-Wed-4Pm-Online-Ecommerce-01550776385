import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
export const metadata: Metadata = {
  title: "Brands",
  description: "an E-commerce website",
};

export default async function Brands() {
  const resp = await fetch('https://ecommerce.routemisr.com/api/v1/brands?limit=27')
  const payload = await resp.json()
  console.log(payload)
  return (
    <div className="bg-main min-h-screen p-4">
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-7'>
        {payload?.data?.map((brand: any) => (
          
          <div key={brand._id} className="bg-white rounded-lg shadow-sm overflow-hidden p-4">
            <Link href={`brands/${brand._id}`} >
            <Image src={brand.image} alt={brand.name} width={200} height={200} className='object-contain w-full h-auto' />
          </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
