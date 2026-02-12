import Image from "next/image";
import { ProductCard } from "./_components/ProductCard/ProductCard";
import { ProductInterface } from "./_type/ProductInterface";
import HomeSwipper from "./_components/HomeSwipper/HomeSwipper";
import CategorySlider from "./_components/CategorySlider/CategorySlider";


export default async function Home() {
  const resp =  await fetch('https://ecommerce.routemisr.com/api/v1/products')
  const {data}:{data : ProductInterface[]} = await resp.json()
  console.log('data', data);
  
  return (
    <>
    <div className="bg-main px-3 pt-10 pb-10">
      <HomeSwipper/>
      <CategorySlider/>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3  ">
      {data?.map((prod)=>{return <ProductCard key={prod.id} prod={prod}/>})}
    </div>
    </div>
    
    </>
  );
}
