import React from 'react'
import notfoundIMG from '../assets/images/error.svg'
import Image from 'next/image'

export default function Notfound() {
  return (
    <div className='flex justify-center items center py-4 '>
      <Image src={notfoundIMG} alt='notfoundimage' className='w-2/3' width={300} height={200}/>


    </div>
  )
}
