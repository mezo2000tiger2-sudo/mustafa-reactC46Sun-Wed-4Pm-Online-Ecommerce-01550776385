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
                    <button onClick={() => { mutate(adress._id) }} className="text-red-500 hover:text-red-700 p-2 bg-red-50 rounded-lg transition-colors duration-200">
                      delete address
                    </button>
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
