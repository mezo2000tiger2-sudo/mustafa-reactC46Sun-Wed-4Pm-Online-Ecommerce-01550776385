'use client'
import React from 'react'
import { useWishlist } from '../_servecies/wishlist/getWishlist'
import Loading from '../loading';
import { ProductCard } from '../_components/ProductCard/ProductCard';
import Link from 'next/link';

export default function Wishlist() {
  const { data, isLoading, error } = useWishlist()
  
  if(isLoading){
    return <Loading/>
  }

  const wishlistItems = data?.data || [];
  const hasItems = wishlistItems.length > 0;
  
  return (
    <div className="min-h-screen bg-[#f6f1e8] px-4 py-12">
      <div className="max-w-7xl mx-auto">

        {hasItems ? (
          <>
            <div className="flex items-end justify-between gap-3 mb-8 pb-4 border-b border-[#1c1914]/10">
              <h1 className="font-serif text-2xl md:text-3xl font-[620] tracking-tight text-[#1c1914]">
                Saved items
              </h1>
              <span className="text-xs text-[#1c1914]/55 font-medium">
                {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlistItems.map((prod:any) => (
                <div key={prod.id || prod._id}>
                  <ProductCard prod={prod} />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[520px] text-center px-8">
            <div className="max-w-[420px]">
              <div className="h-[220px] w-[260px] mx-auto mb-6 rounded-[22px] bg-gradient-to-br from-[#f0e9e3] to-[#e6f0e5] border border-[#1c1914]/10" />
              <h2 className="font-serif text-[1.7rem] font-[620] tracking-tight text-[#1c1914] mb-3">
                Your wishlist is empty
              </h2>
              <p className="text-[#1c1914]/60 mb-8 leading-relaxed text-[15px]">
                Save products while browsing and they will show up here.
              </p>
              <Link
                href="/"
                className="inline-block bg-main text-white font-bold px-7 py-3.5 rounded-xl shadow-[0_20px_40px_rgba(14,133,40,0.2)] hover:shadow-[0_24px_48px_rgba(14,133,40,0.28)] transition-all duration-200 hover:-translate-y-0.5 text-sm"
              >
                Browse favorites
              </Link>
            </div>
          </div>
        )}

        {error && (
          <div className="mt-8 bg-red-50/80 border border-red-200/60 rounded-xl p-6 text-center backdrop-blur-sm">
            <p className="text-red-600 font-medium">
              Oops! Something went wrong loading your wishlist.
            </p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 text-red-600 underline underline-offset-2 hover:text-red-700 text-sm font-medium"
            >
              Try again
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
