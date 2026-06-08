'use client'
import { ProductCard } from "@/app/_components/ProductCard/ProductCard";
import { ProductInterface } from "@/app/_type/ProductInterface";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams, useRouter } from "next/navigation";
import { Subcategory } from "@/app/_type/cartResponseInterface";
import { Spinner } from "@/components/ui/spinner";
import React, { use } from "react";

export default function CategoryProducts({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const searchParams = useSearchParams()
  const router = useRouter()
  const currentSubId = searchParams.get('subcategory')

  // 1. Fetch Subcategories for this category
  const { data: subcategories, isLoading: subLoading } = useQuery<Subcategory[]>({
    queryKey: ['category-subcategories', id],
    queryFn: async () => {
      const resp = await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`)
      if (!resp.ok) throw new Error('Failed to load subcategories')
      const payload = await resp.json()
      return payload.data
    }
  })

  // 2. Fetch Products
  const { data: products, isLoading: productsLoading } = useQuery<ProductInterface[]>({
    queryKey: ['category-products', id, currentSubId],
    queryFn: async () => {
      const url = `https://ecommerce.routemisr.com/api/v1/products?category=${id}${currentSubId ? `&subcategory=${currentSubId}` : ''}`
      const resp = await fetch(url)
      const payload = await resp.json()
      return payload.data
    }
  })

  const handleSubSelect = (subId: string | null) => {
    const params = new URLSearchParams(searchParams.toString())
    if (subId) {
      params.set('subcategory', subId)
    } else {
      params.delete('subcategory')
    }
    router.push(`?${params.toString()}`, { scroll: false })
  }

  return (
    <div className="bg-[#f6f1e8] min-h-screen py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10 border-b border-[#1c1914]/10 pb-6 flex items-baseline justify-between gap-4">
          <h1 className="text-3xl font-serif font-semibold tracking-tight text-[#1c1914]">Selected category</h1>
          <p className="text-sm text-[#1c1914]/60 font-medium">Subcategories and products in the same flow</p>
        </div>

        {/* Subcategory Filter Bar */}
        <div className="flex gap-2.5 overflow-x-auto pb-6 mb-8 scrollbar-hide">
          <button
            onClick={() => handleSubSelect(null)}
            className={`text-xs font-bold px-6 py-2.5 rounded-full whitespace-nowrap transition-all duration-200 border ${
              !currentSubId 
                ? 'bg-[#0e8528] text-white border-[#0e8528] shadow-lg shadow-[#0e8528]/20' 
                : 'bg-white/60 text-[#1c1914]/70 border-[#1c1914]/10 hover:bg-white'
            }`}
          >
            All items
          </button>
          
          {!subLoading && subcategories?.map((sub) => (
            <button
              key={sub._id}
              onClick={() => handleSubSelect(sub._id)}
              className={`text-xs font-bold px-6 py-2.5 rounded-full whitespace-nowrap transition-all duration-200 border ${
                currentSubId === sub._id
                  ? 'bg-[#0e8528] text-white border-[#0e8528] shadow-lg shadow-[#0e8528]/20'
                  : 'bg-white/60 text-[#1c1914]/70 border-[#1c1914]/10 hover:bg-white'
              }`}
            >
              {sub.name}
            </button>
          ))}
          
          {subLoading && (
             <div className="flex items-center px-4">
               <Spinner className="size-4 text-[#0e8528]" />
             </div>
          )}
        </div>

        {/* Product Grid */}
        {productsLoading ? (
          <div className="flex justify-center items-center py-32">
            <Spinner className="size-12 text-[#0e8528]" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products && products.length > 0 ? (
              products.map((prod) => (
                <ProductCard key={prod.id} prod={prod} />
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-32 text-center">
                <div className="bg-white/50 rounded-full p-8 mb-6">
                  <svg className="size-16 text-[#1c1914]/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h2 className="text-2xl font-serif font-semibold text-[#1c1914] mb-2">No products found</h2>
                <p className="text-[#1c1914]/50">Try selecting a different subcategory or check back later.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
