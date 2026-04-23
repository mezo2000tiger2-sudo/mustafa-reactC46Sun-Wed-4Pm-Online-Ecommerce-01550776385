import Image from "next/image";
import { ProductCard } from "./_components/ProductCard/ProductCard";
import { ProductInterface } from "./_type/ProductInterface";
import HomeSwipper from "./_components/HomeSwipper/HomeSwipper";
import CategorySlider from "./_components/CategorySlider/CategorySlider";
import { Category } from "./_type/cartResponseInterface";


export default async function Home() {
  const [productsResp, categoriesResp] = await Promise.all([
    fetch('https://ecommerce.routemisr.com/api/v1/products'),
    fetch('https://ecommerce.routemisr.com/api/v1/categories')
  ])

  const [{ data: products }, { data: categories }] = await Promise.all([
    productsResp.json(),
    categoriesResp.json()
  ])
  
  return (
    <>
    <div className="bg-main px-3 pt-10 pb-10">
      <HomeSwipper/>
      <CategorySlider categories={categories}/>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3  ">
      {products?.map((prod: ProductInterface)=>{return <ProductCard key={prod.id} prod={prod}/>})}
    </div>
    </div>
    
    </>
  );
}
