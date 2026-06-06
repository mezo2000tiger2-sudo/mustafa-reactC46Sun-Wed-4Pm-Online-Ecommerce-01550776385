import { Suspense } from "react";
import { ProductCard } from "./_components/ProductCard/ProductCard";
import { ProductInterface } from "./_type/ProductInterface";
import HomeSwipper from "./_components/HomeSwipper/HomeSwipper";
import CategorySlider from "./_components/CategorySlider/CategorySlider";

export default function Home() {
  return (
    <main className="min-height-screen relative overflow-hidden bg-[#f6f1e8] text-[#1c1914] selection:bg-[#0e8528]/20">
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

      <div className="page-container relative z-10 mx-auto max-w-[1180px] px-6 py-9 lg:py-20">
        
        {/* Hero Section */}
        <section className="hero mb-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-stretch">
          <div className="hero-visual relative min-h-[260px] overflow-hidden rounded-[18px] border border-[#1c1914]/12 bg-[#e8dfd2] shadow-[0_22px_55px_rgba(28,25,20,0.12)]">
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(14,133,40,0.18),transparent_55%),linear-gradient(210deg,rgba(224,176,128,0.35),transparent_60%)]" />
            <span className="absolute top-4 left-4 z-10 rounded-full border border-[#1c1914]/12 bg-[#fffcf7]/92 px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-wider">Seasonal picks</span>
            {/* You could add a background image here if available */}
            <HomeSwipper/>
          </div>
          <div className="hero-copy flex flex-col justify-center">
            <span className="pill mb-2 inline-block w-fit rounded-full border border-[#1c1914]/12 bg-[#0e8528]/10 px-3 py-1.5 text-[12px] font-semibold text-[#0e8528]">
              Farm-traceable · Fast delivery
            </span>
            <h3 className="mb-3 font-serif text-4xl font-semibold tracking-tight leading-[1.06] md:text-5xl lg:text-6xl">
              Groceries with an editorial eye.
            </h3>
            <p className="mb-6 max-w-[46ch] text-[15px] leading-relaxed text-[#1c1914]/70">
              Big hero moment, soft paper texture, and a confident green accent—same product data, new atmosphere.
            </p>
            <div className="flex flex-wrap gap-2.5">
              <button className="rounded-xl bg-[#0e8528] px-4.5 py-2.5 text-sm font-bold text-white shadow-[0_14px_30px_rgba(14,133,40,0.25)] transition-transform hover:-translate-y-0.5 active:scale-95">
                Shop produce
              </button>
              <button className="rounded-xl border border-[#1c1914]/12 bg-[#fffcf7]/75 px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-[#fffcf7]">
                Browse deals
              </button>
            </div>
          </div>
        </section>
        {/* Categories Section */}
        <section className="mb-14">
          <div className="mb-4 flex items-end justify-between gap-3">
            <h4 className="font-serif text-2xl font-semibold tracking-tight">Categories</h4>
          </div>
          <Suspense fallback={<div className="h-44 w-full animate-pulse rounded-xl bg-black/5" />}>
            <CategorySlider />
          </Suspense>
        </section>

        {/* Featured Products */}
        <section>
          <div className="mb-4 flex items-end justify-between gap-3">
            <h4 className="font-serif text-2xl font-semibold tracking-tight">Featured products</h4>
            <small className="text-[12px] font-medium text-[#1c1914]/58">Grid matches ProductCard layout</small>
          </div>
          <Suspense fallback={
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-80 w-full animate-pulse rounded-[18px] bg-black/5 shadow-sm" />
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
