import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import appleImg from '../../../assets/images/download-on-the-app-store-apple-logo-svgrepo-com.svg'
import googleImg from '../../../assets/images/GetItOnGooglePlay_Badge_Web_color_English.svg'
import React from 'react'
import Image from 'next/image'

export default function Fotter() {
  return (
    <div className=' bg-gray-200 flex flex-col justify-center gap-6 py-7 align bg-center px-4 md:px-15'>
       <div>
        <h3 className='text-3xl text-gray-600 mb-2.5'>Get the Fresh cart app</h3>
        <p className='text-gray-500 text-lg'>We will send you a link, open it to install the app</p>
       </div>
       <div className='flex justify-between items-center gap-2'>
        <Input className='md:w-5/6 w-4/6 bg-white' placeholder='Email...'></Input>
        <Button className='md:w-1/6 w-2/6'>Share</Button>
       </div>
       <div className='flex justify-start items-center py-4 border-y border-gray-400 w-full'>
    
        <div className=' flex justify-center items-center gap-1.5 '>
          <p className='text-gray-500'>Get deleviers on Freshcart app</p>
          
          <Image src={appleImg} alt='appleImg' className='h-15 object-cover' width={100} height={20} />
          <Image src={googleImg} alt='googleimg' width={100} height={20} />
        </div>

       </div>
       </div>
  )
}
