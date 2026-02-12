'use client'
import ChekOutForm from '@/app/_components/ChekOutForm/ChekOutForm'
import { updateCart } from '@/app/_servecies/cart/update-cart';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import toast from 'react-hot-toast';
export default  function Chekout() {
    const quaryclient = useQueryClient()
  const params = useParams()
  const cartId = params.cartId as string
 const data = JSON.parse(localStorage.getItem('cart') || '{}')

 const {   mutate:updateCartItem} =useMutation({
     mutationKey:['update-item-cart'],
     mutationFn:updateCart,
     onSuccess:()=>{
       toast.success('product updated')
       quaryclient.invalidateQueries({
         queryKey:['get-cart']
       })
     },
     onError:()=>{
       toast.error('error')
 
     }
   })
   function handleupdate(productid:string , count:number){
     updateCartItem({productid , count})
 
   }
  
  


  return <>
  <div className='bg-main py-6'>

  <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
    
  <div className="rounded-lg mb-4 md:mb-0 md:w-2/3">
      <div className='bg-gray-100 p-5 rounded-lg'>
        {data?.numOfCartItems! > 0? 
        <>
          {  data?.data?.products.map((prod: any)=>{return <div key={prod._id} className="justify-between mb-2 rounded-lg bg-white p-2  md:h-60 shadow-md sm:flex sm:justify-start">
  
          <img src={prod.product.imageCover} alt="product-image" className="w-full border border-gray-200 border-b-0 rounded-lg sm:w-40" />
          <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
            <div className="mt-5 sm:mt-0">
              <h2 className="text-xl font-bold mt-5 text-gray-900">{prod.product.title.split(' ').splice(0, 3).join(' ')}</h2>
              <p className="mt-1 text-s font-semibold text-gray-700">{prod.product.brand.name}</p>
  
            </div>
            <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
              <div className="flex items-center border-gray-100">
                <span onClick={()=>{handleupdate(prod.product._id , prod.count-1)}} className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-main hover:text-blue-50"> - </span>
                <span className="h-8 w-8 border bg-white text-center text-xs outline-none flex justify-center items-center"  >{prod.count}</span>
                <span onClick={()=>{handleupdate(prod.product._id , prod.count+1)}} className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-main hover:text-blue-50"> + </span>
              </div>
              <div className="flex items-center space-x-4">
                <p className="text-sm">{prod.price} EGP</p>
                
              </div>
            </div>
          </div>
        </div>
        })}
        </>
        
        : <p className='text-center text-gray-700 my-5'>No items in the cart</p>}
  
      
      </div>
  
  
  </div>

<div className='  md:mt-0 md:w-1/3 rounded-lg overflow-hidden'>
{data?.numOfCartItems! > 0 && <div className="  border border-b-0 bg-white p-6 pb-0 shadow-md md:mt-0">
        <p className="text-gray-800 text-lg font-semibold mb-2">Subtotal</p>
        
        {  data?.data?.products.map((prod: any)=>{return<div key={prod._id} className="mb-2 flex justify-between"> 
        <p className="text-gray-800 ">{prod.product.title.split(' ').splice(0, 2).join(' ')}</p>
        <p className="text-gray-700">{prod.price * prod.count} EGP</p>
        </div>})}
  


      <hr className="my-4" />
      <div className="flex justify-between">
        <p className="text-lg font-bold">Total</p>
        <div >
          <p className="mb-1 text-lg font-bold">{data?.data.totalCartPrice}.0 EGP</p>
          <p className="text-sm text-gray-700">including VAT</p>
        </div>
      </div>
    </div>}

<ChekOutForm cartId={cartId} />
</div>
  </div>
  </div>
  </>
}
