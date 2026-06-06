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
    <div className="min-h-screen bg-main px-4 py-12">
      <div className="max-w-7xl bg-white py-3 rounded-2xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <div className="relative">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-800">
                My Wishlist
              </h1>
            </div>
          </div>
        </div>

        {hasItems ? (
          <div className="bg-white rounded-2xl  p-6 md:p-8 border border-gray-100">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlistItems.map((prod:any) => (
                <div key={prod.id}>
                  <ProductCard prod={prod} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl  p-12 md:p-16 text-center border border-gray-100">
            <div className="max-w-md mx-auto">
              <div className="mb-6">
                <svg 
                  className="w-32 h-32 mx-auto text-gray-300" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={1.5} 
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                Your Wishlist is Empty
              </h3>
              <p className="text-gray-500 mb-8">
                Explore our products and save your favorites here for later!
              </p>
              <Link 
                href="/" 
                className="inline-flex items-center gap-2 bg-main hover:bg-green-600 text-white px-8 py-3 rounded-lg font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
              >
                <svg 
                  className="w-5 h-5" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
                  />
                </svg>
                Start Shopping
              </Link>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <p className="text-red-600 font-medium">
              Oops! Something went wrong loading your wishlist.
            </p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 text-red-600 underline hover:text-red-700"
            >
              Try again
            </button>
          </div>
        )}
      </div>
    </div>
  )
}