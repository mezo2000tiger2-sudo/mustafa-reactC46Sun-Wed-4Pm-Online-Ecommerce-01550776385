import { ProductCard } from "@/app/_components/ProductCard/ProductCard";
import { ProductInterface } from "@/app/_type/ProductInterface";
import Image from "next/image";

export default async function BrandProducts({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  let data: ProductInterface[] = [];
  try {
    const resp = await fetch(`https://ecommerce.routemisr.com/api/v1/products?brand=${id}`, {
      next: { revalidate: 3600 }
    })
    if (resp.ok) {
      const payload = await resp.json()
      data = payload.data
    } else {
      console.error('Failed to fetch brand products:', resp.statusText)
    }
  } catch (err) {
    console.error('Error fetching brand products:', err)
  }

  return (
    <div className="bg-[#f6f1e8] min-h-screen py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10 border-b border-[#1c1914]/10 pb-6 flex items-baseline justify-between gap-4">
          <h1 className="text-3xl font-serif font-semibold tracking-tight text-[#1c1914]">Brand Products</h1>
          <p className="text-sm text-[#1c1914]/60 font-medium">Curated selection from this brand</p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {data?.length > 0 ? (
            data?.map((prod) => <ProductCard key={prod.id} prod={prod} />)
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-32 text-center">
              <div className="bg-white/50 rounded-full p-8 mb-6">
                <svg className="size-16 text-[#1c1914]/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h2 className="text-2xl font-serif font-semibold text-[#1c1914] mb-2">No products found</h2>
              <p className="text-[#1c1914]/50">This brand doesn't have any products in this collection yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
