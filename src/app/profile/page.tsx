import React from 'react'
import userIMG from '../../assets/images/user.jpg'
import Loading from '../loading'
import { cookies } from 'next/headers'
import { decode } from 'next-auth/jwt'
import Image from 'next/image'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'

export default async function profile() {
    const authToken = (await cookies()).get('next-auth.session-token')?.value
            const token =await decode({
                token:authToken,
                secret:process.env.NEXTAUTH_SECRET!
            })
            const user = token?.user
            const userToken = token?.token
            console.log(user);
  return (
   <>
   <div className="min-h-screen bg-main pt-16 px-4 pb-8">
  <div className="max-w-md mx-auto bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-xl">
    
    {/* Profile Section */}
    <div className="pt-12 pb-8 px-8">
      <div className="text-center">
        <div className="relative inline-block mb-6">
          <Image 
            width={120} 
            height={120} 
            className="h-30 w-30 rounded-full border-4 border-gray-100 dark:border-gray-800 shadow-lg object-cover" 
            src={userIMG} 
            alt='userIMG' 
          />
        </div>
        
        <h1 className="font-bold text-3xl text-gray-900 dark:text-white mb-3">
          {user.name}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-base mb-8">
          {user.email}
        </p>

        {/* Updates Card */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Updates
          </h2>
          <Link href="/addresses">
            <div className="flex items-center justify-between p-4 bg-green-100 mb-3 dark:bg-gray-900 rounded-xl hover:bg-green-200 dark:hover:bg-green-900/10 transition-all duration-200 cursor-pointer group">
              <span className="text-green-500 font-medium group-hover:text-green-600">
                Addresses
              </span>
              <svg 
                className="w-5 h-5 text-green-500 group-hover:translate-x-1 transition-transform" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
          <Link href="/updatepassword">
            <div className="flex items-center mb-3 justify-between p-4 bg-red-50 dark:bg-gray-900 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/10 transition-all duration-200 cursor-pointer group">
              <span className="text-red-500 font-medium group-hover:text-red-600">
                Update password
              </span>
              <svg 
                className="w-5 h-5 text-red-500 group-hover:translate-x-1 transition-transform" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>

          <Link href="/updateuserdata">
            <div className="flex items-center justify-between p-4 bg-red-50 dark:bg-gray-900 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/10 transition-all duration-200 cursor-pointer group">
              <span className="text-red-500 font-medium group-hover:text-red-600">
                Update Data
              </span>
              <svg 
                className="w-5 h-5 text-red-500 group-hover:translate-x-1 transition-transform" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
          
        </div>
      </div>
    </div>
  </div>
</div>

   </>
  )
}
