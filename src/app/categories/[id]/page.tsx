import { ProductCard } from "@/app/_components/ProductCard/ProductCard";
import { ProductInterface } from "@/app/_type/ProductInterface";
import Image from "next/image";



export default async function CategoryProducts({params}: {params: {id: string}}) {
    const {id}=await params
  let data: ProductInterface[] = [];
  try {
    const resp =  await fetch(`https://ecommerce.routemisr.com/api/v1/products?category=${id}`)
    if (resp.ok) {
      const payload = await resp.json()
      data = payload.data
    } else {
      console.error('Failed to fetch category products:', resp.statusText)
    }
  } catch (err) {
    console.error('Error fetching category products:', err)
  }
  
  return (
    <>
    <div className="bg-main px-3 pt-10 pb-10 min-h-screen relative">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3  ">
      {data?.length > 0 ?
      data?.map((prod)=>{return <ProductCard key={prod.id} prod={prod}/>})
      :
      <h2 className="text-white text-4xl text-center font-semibold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">No products found</h2>
    }
    </div>
    </div>
    
    </>
  );
}
