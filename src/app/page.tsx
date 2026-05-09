import { Suspense } from "react";
import { ProductCard } from "./_components/ProductCard/ProductCard";
import { ProductInterface } from "./_type/ProductInterface";
import HomeSwipper from "./_components/HomeSwipper/HomeSwipper";
import CategorySlider from "./_components/CategorySlider/CategorySlider";

export default function Home() {
  return (
    <div className="bg-main px-3 pt-10 pb-10">
      {/* 1. Renders immediately - LCP element lives here */}
      <HomeSwipper />

      {/* 2. Streams in when Category API finishes */}
      <Suspense fallback={<div className="h-44 w-full animate-pulse bg-gray-200/20 mb-6 rounded-sm" />}>
        <CategorySlider />
      </Suspense>

      {/* 3. Streams in when Products API finishes */}
      <Suspense fallback={
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-80 w-full animate-pulse bg-gray-200/20 rounded-md" />
          ))}
        </div>
      }>
        <ProductList />
      </Suspense>
    </div>
  );
}

async function ProductList() {
  const resp = await fetch('https://ecommerce.routemisr.com/api/v1/products', {
    next: { revalidate: 3600 }
  })
  const { data: products }: { data: ProductInterface[] } = await resp.json()
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
      {products?.map((prod) => (
        <ProductCard key={prod.id} prod={prod} />
      ))}
    </div>
  );
}
