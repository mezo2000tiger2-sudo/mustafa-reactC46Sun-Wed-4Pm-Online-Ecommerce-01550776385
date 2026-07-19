import { Suspense } from "react";
import { ProductCard } from "./_components/ProductCard/ProductCard";
import { ProductInterface } from "./_type/ProductInterface";
import dynamic from "next/dynamic";

const HomeSwipper = dynamic(() => import("./_components/HomeSwipper/HomeSwipper"), {
  ssr: true,
});

const CategorySlider = dynamic(() => import("./_components/CategorySlider/CategorySlider"), {
  ssr: true,
});

export default function Home() {
  return (
    <main className="min-height-screen relative overflow-hidden bg-[#f6f1e8] text-[#1c1914] selection:bg-[#0e8528]/20">
      <link rel="preconnect" href="https://ecommerce.routemisr.com" />
      <link rel="dns-prefetch" href="https://ecommerce.routemisr.com" />
      
      {/* Background Gradients */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(1000px_620px_at_10%_6%,rgba(14,133,40,0.22),transparent_58%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(840px_520px_at_92%_14%,rgba(224,176,128,0.35),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_640px_at_52%_104%,rgba(168,184,216,0.28),transparent_60%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#fffcf7]/92 to-transparent" />
      </div>

      {/* Grain Overlay */}
      <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.07] mix-blend-multiply" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23n)' opacity='0.65'/%3E%3C/svg%3E")` }} />

      <div className="page-container relative z-10 mx-auto max-w-[1340px] px-6 py-12 lg:py-24">
        
        {/* Hero Section */}
        <section className="hero mb-24 grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="hero-visual relative aspect-[16/10] lg:aspect-auto lg:h-[520px] overflow-hidden rounded-[24px] border border-[#1c1914]/10 bg-[#e8dfd2] shadow-[0_32px_85px_rgba(28,25,20,0.15)]">
            {/* <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(14,133,40,0.15),transparent_55%),linear-gradient(210deg,rgba(224,176,128,0.25),transparent_60%)]" /> */}
            <span className="absolute top-6 left-6 z-10 rounded-full border border-[#1c1914]/10 bg-[#fffcf7]/95 px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.15em]">Seasonal picks</span>
            <HomeSwipper/>
          </div>
          <div className="hero-copy flex flex-col justify-center lg:pl-4 mt-8 lg:mt-0">
            <div className="flex items-center gap-3 mb-3 lg:mb-4">
              <span className="h-px w-6 lg:w-8 bg-[#0e8528]/40" />
              <span className="text-[10px] lg:text-[12px] font-bold uppercase tracking-[0.2em] text-[#0e8528]">Premium Groceries</span>
            </div>
            <h3 className="mb-4 lg:mb-5 font-serif text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold tracking-tight leading-[1.1] lg:leading-[1.02]">
              Freshness <br className="hidden md:block" />
              <span className="italic text-[#0e8528]">Redefined.</span>
            </h3>
            <p className="mb-0 max-w-[42ch] text-[14px] lg:text-[16px] leading-relaxed text-[#1c1914]/65">
              Experience a new standard of farm-to-table delivery. Hand-picked selections, delivered with an editorial eye for quality and aesthetics.
            </p>
          </div>
        </section>

        {/* Categories Section */}
        <section className="mb-24">
          <div className="mb-8 flex items-end justify-between border-b border-[#1c1914]/5 pb-4">
            <h4 className="font-serif text-3xl font-semibold tracking-tight">Curated Categories</h4>
          </div>
          <Suspense fallback={<div className="h-64 w-full animate-pulse rounded-2xl bg-[#1c1914]/5" />}>
            <CategorySlider />
          </Suspense>
        </section>

        {/* Featured Products */}
        <section className="mb-12">
          <div className="mb-8 flex items-end justify-between border-b border-[#1c1914]/5 pb-4">
            <div>
              <h4 className="font-serif text-3xl font-semibold tracking-tight">Featured products</h4>
              <p className="mt-1 text-[13px] text-[#1c1914]/50">Seasonally selected by our experts</p>
            </div>
          </div>
          <Suspense fallback={
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-96 w-full animate-pulse rounded-[24px] bg-[#1c1914]/5" />
              ))}
            </div>
          }>
            <ProductList />
          </Suspense>
        </section>

      </div>
    </main>
  );
}

async function ProductList() {
  const resp = await fetch('https://ecommerce.routemisr.com/api/v1/products', {
    next: { revalidate: 3600 }
  })
  const { data: products }: { data: ProductInterface[] } = await resp.json()
  
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-4">
      {products?.map((prod) => (
        <ProductCard key={prod.id} prod={prod} />
      ))}
    </div>
  );
}
