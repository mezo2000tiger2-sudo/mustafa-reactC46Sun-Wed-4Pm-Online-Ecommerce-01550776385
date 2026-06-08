'use client'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { Subcategory } from '../_type/cartResponseInterface'
import { Spinner } from '@/components/ui/spinner'

export default function SubcategoriesSection() {
  const { data: subcategories, isLoading, error } = useQuery<Subcategory[]>({
    queryKey: ['subcategories'],
    queryFn: async () => {
      const resp = await fetch('https://ecommerce.routemisr.com/api/v1/subcategories?limit=40')
      if (!resp.ok) throw new Error('Failed to load subcategories')
      const payload = await resp.json()
      return payload.data
    }
  })

  if (isLoading) return (
    <div className="flex justify-center py-10">
      <Spinner className="size-8 text-[#0e8528]" />
    </div>
  )

  if (error) return null

  return (
    <div className="mt-16">
      <div className="mb-8 border-b border-[#1c1914]/10 pb-6 flex items-baseline justify-between gap-4">
        <h2 className="text-2xl font-serif font-semibold tracking-tight text-[#1c1914]">Subcategories</h2>
        <p className="text-sm text-[#1c1914]/60 font-medium hidden sm:block">Now choose a focused list</p>
      </div>
      
      <div className="flex flex-wrap gap-2.5">
        {subcategories?.map((sub) => (
          <Link
            key={sub._id}
            href={`/categories/${sub.category}?subcategory=${sub._id}`}
            className="text-xs font-semibold px-4 py-2 rounded-full border border-[#1c1914]/10 bg-white/60 hover:bg-[#0e8528]/10 hover:border-[#0e8528]/30 hover:text-[#0e8528] transition-all duration-200"
          >
            {sub.name}
          </Link>
        ))}
      </div>
    </div>
  )
}
