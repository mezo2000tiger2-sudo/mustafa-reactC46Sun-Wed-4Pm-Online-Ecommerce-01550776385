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
    {/* Background gradients */}
    <div className="pointer-events-none fixed inset-0 z-0">
      <div className="absolute inset-0 bg-[radial-gradient(1000px_620px_at_10%_6%,rgba(14,133,40,0.22),transparent_58%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(840px_520px_at_92%_14%,rgba(224,176,128,0.35),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(900px_640px_at_52%_104%,rgba(168,184,216,0.28),transparent_60%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#fffcf7]/92 to-transparent" />
    </div>
    {/* Grain Overlay */}
    <div
      className="pointer-events-none fixed inset-0 z-50 opacity-[0.07] mix-blend-multiply"
      style={{
        backgroundImage:
          'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'220\' height=\'220\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'220\' height=\'220\' filter=\'url(%23n)\' opacity=\'0.65\'/%3E%3C/svg%3E")',
      }}
    />

    <div className="relative min-h-screen bg-[#f6f1e8] pt-24 pb-16">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <h2 className="mb-8 text-3xl font-bold tracking-tight text-[#1c1914]">
          Checkout
        </h2>

        {data?.numOfCartItems! > 0 ? (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            {/* Left — Your cart */}
            <div className="flex flex-col gap-3">
              <h4 className="mb-1 text-lg font-bold tracking-tight text-[#1c1914]">
                Your cart
              </h4>
              {data?.data?.products.map((prod: any) => {
                return (
                  <div
                    key={prod._id}
                    className="group relative overflow-hidden rounded-[20px] bg-white p-5 shadow-[0_2px_16px_rgba(28,25,20,0.07)] transition-all duration-300 hover:shadow-[0_16px_44px_rgba(194,65,12,0.12)] sm:p-6"
                  >
                    {/* Left accent bar that appears on hover */}
                    <div className="absolute bottom-0 left-0 top-0 w-1 origin-bottom scale-y-0 rounded-r bg-[#c2410c] transition-transform duration-300 group-hover:scale-y-100" />

                    <div className="flex gap-5 sm:gap-6">
                      {/* Image — framed with offset shadow */}
                      <div className="relative shrink-0 self-start">
                        <div className="absolute -bottom-1.5 -right-1.5 h-full w-full rounded-[14px] bg-[rgba(194,65,12,0.08)]" />
                        <img
                          src={prod.product.imageCover}
                          alt="product-image"
                          className="relative h-[110px] w-[100px] rounded-[14px] object-cover shadow-[0_4px_12px_rgba(28,25,20,0.08)] sm:h-[120px] sm:w-[120px]"
                        />
                        {/* Count badge */}
                        <div className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#c2410c] text-[11px] font-bold text-white shadow-[0_2px_8px_rgba(194,65,12,0.25)]">
                          {prod.count}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex min-w-0 flex-1 flex-col justify-between gap-3">
                        <div>
                          <strong className="text-base leading-snug text-[#1a1a1a] sm:text-lg sm:leading-snug [font-weight:650]">
                            {prod.product.title.split(' ').splice(0, 4).join(' ')}
                          </strong>
                          <p className="mt-1 text-sm font-medium text-stone-400">
                            {prod.product.brand.name}
                          </p>
                        </div>

                        <div className="flex items-center justify-between gap-3">
                          {/* Qty display (stepper removed) */}

                          {/* Price */}
                          <p className="shrink-0 text-right">
                          <span className="text-lg font-extrabold text-stone-900 sm:text-xl">
                            {prod.price * prod.count}
                          </span>
                          <span className="ml-1 text-xs font-semibold text-stone-400">
                            EGP
                          </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Right — Receipt + Address */}
            <div className="flex flex-col gap-5">
              {/* Order receipt */}
              <div className="rounded-[18px] border border-dashed border-[rgba(28,25,20,0.15)] bg-white p-5">
                <div className="mb-3 flex items-end justify-between border-b border-[rgba(28,25,20,0.1)] pb-3">
                  <h4 className="text-base font-bold tracking-tight text-[#1c1914]">
                    Order receipt
                  </h4>
                  <small className="text-sm font-medium text-[rgba(28,25,20,0.5)]">
                    {data?.numOfCartItems} items
                  </small>
                </div>

                {data?.data?.products.map((prod: any) => {
                  return (
                    <div
                      key={prod._id}
                      className="flex items-center justify-between gap-2.5 border-b border-dotted border-[rgba(28,25,20,0.08)] py-2 text-sm"
                    >
                      <div className="flex min-w-0 items-center gap-2.5">
                        <img src={prod.product.imageCover} alt="" className="h-10 w-10 shrink-0 rounded-[8px] border border-[rgba(28,25,20,0.1)] object-cover" />
                        <span className="truncate text-[rgba(28,25,20,0.55)]">
                          {prod.product.title.split(' ').splice(0, 2).join(' ')} ×{prod.count}
                        </span>
                      </div>
                      <strong className="shrink-0 text-[#1c1914]">
                        {prod.price * prod.count} EGP
                      </strong>
                    </div>
                  )
                })}

                <div className="mt-3 flex items-end justify-between border-t-2 border-[rgba(28,25,20,0.12)] pt-3">
                  <span className="text-xs font-medium text-[rgba(28,25,20,0.5)]">
                    including VAT
                  </span>
                  <div className="text-right">
                    <span className="text-xs font-bold uppercase text-main">Total</span>
                    <br />
                    <strong className="text-xl font-extrabold text-[#1c1914]">
                      {data?.data.totalCartPrice}.0 EGP
                    </strong>
                  </div>
                </div>
              </div>

              {/* Delivery address + ChekOutForm */}
              <div className="rounded-[18px] border border-[rgba(28,25,20,0.1)] bg-white p-5 shadow-[0_8px_28px_rgba(28,25,20,0.06)]">
                <h4 className="mb-4 text-base font-bold tracking-tight text-[#1c1914]">
                  Delivery address
                </h4>
                <ChekOutForm cartId={cartId} />
              </div>
            </div>
          </div>
        ) : (
          <p className="py-16 text-center text-base font-medium text-[rgba(28,25,20,0.45)]">
            No items in the cart
          </p>
        )}
      </div>
    </div>
  </>
}