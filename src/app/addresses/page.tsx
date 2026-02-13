'use client'
import React from 'react'
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Home, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Link from 'next/link';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getAddresses } from '../_servecies/address/get-addreses';
import Loading from '../loading';
import { deleteAddress } from '../_servecies/address/del-adress';
import toast from 'react-hot-toast';
export default function Adresses() {
  const quaryclient = useQueryClient()
  const { data, isLoading } = useQuery({
    queryKey: ['addresses'],
    queryFn: getAddresses
  })
  const { mutate } = useMutation({
    mutationKey: ['del-addresses'],
    mutationFn: (adressId: string) => deleteAddress(adressId),
    onSuccess: (data) => {
      console.log('Delete response:', data);
      if (data.status === 'success') {
        toast.success('Address deleted successfully');
        quaryclient.invalidateQueries({
          queryKey: ['addresses']
        })
      }
    }
  })
  console.log('addresses is: ', data);

  if (isLoading) {
    return <Loading />
  }
  return (
    <div className='min-h-screen bg-main pt-16 px-4 pb-8'>
      <div className="bg-white rounded-2xl p-5 relative">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 m text-center">My Addresses</h1>
        <div className='flex w-full justify-end mb-5'>
          <Link href={'/addadress'}>
            <Button onClick={() => { console.log("Add address clicked"); }} className="gap-2 text-end ">
              <Plus className="h-4 w-4" />
              Add Address
            </Button>
          </Link>
        </div>
        <div className='flex flex-col gap-4 justify-center items-center'>
          {data?.data?.map((adress: any) => {
            return <Card key={adress._id} className="w-full">
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                  </div>

                  <div className="flex-1 space-y-1">
                    <h3 className="font-semibold text-lg capitalize">{adress.city}</h3>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Home className="h-6 w-6" />
                      <span>{adress.details}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="h-6 w-6" />
                      <span>{adress.phone}</span>
                    </div>
                  </div>

                  <div>
                    <div className=" bg-red-100 p-2 px-2 border border-red-300 hover:bg-red-600 rounded-lg group cursor-pointer transition-colors duration-150">
              <svg onClick={() => { mutate(adress._id) }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5 cursor-pointer text-red-600 transition-colors duration-150 group-hover:text-white">
              <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
              </svg>
              </div>
                    
                    {/* <button onClick={() => { mutate(adress._id) }} className="text-red-500 hover:text-red-700 p-2 bg-red-50 rounded-lg transition-colors duration-200">
                      delete address
                    </button> */}
                  </div>
                </div>
              </CardContent>
            </Card>
          })}


        </div>
      </div>
    </div>
  )
}
