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
    <div className='min-h-screen bg-[#f6f1e8] py-10 px-5'>
      <div className="max-full mx-auto bg-[#fffdf8] border border-[rgba(28,25,20,0.12)] rounded-[18px] p-6 shadow-[0_12px_32px_rgba(28,25,20,0.07)]">
        <div className="flex items-center justify-between mb-6">
          <h4 className="font-[550] text-[1.25rem] tracking-tight">Saved addresses</h4>
          <Link href={'/addadress'}>
            <Button onClick={() => { console.log("Add address clicked"); }} className="gap-2 text-end ">
              <Plus className="h-4 w-4" />
              Add Address
            </Button>
          </Link>
        </div>
        <div className='flex flex-col gap-3'>
          {data?.data?.map((adress: any) => {
            return (
              <div key={adress._id} className="flex items-start justify-between gap-4 p-4 rounded-[14px] border border-[rgba(28,25,20,0.12)] bg-[rgba(255,252,247,0.78)]">
                <div className="flex-1 min-w-0">
                  <div className="grid gap-1 text-sm text-[rgba(28,25,20,0.58)]">
                    <span className="text-lg font-bold text-black">{adress.name}</span>
                    <span><strong className="font-semibold text-[rgba(28,25,20,0.78)]">name:</strong> {adress.name}</span>
                    <span><strong className="font-semibold text-[rgba(28,25,20,0.78)]">details:</strong> {adress.details}</span>
                    <span><strong className="font-semibold text-[rgba(28,25,20,0.78)]">phone:</strong> {adress.phone}</span>
                    <span><strong className="font-semibold text-[rgba(28,25,20,0.78)]">city:</strong> {adress.city}</span>
                  </div>
                </div>
                <button
                  onClick={() => { mutate(adress._id) }}
                  className="flex-shrink-0 text-xs font-semibold px-3 py-2 rounded-[10px] bg-[rgba(255,252,247,0.75)] border border-[rgba(28,25,20,0.12)] text-[rgba(28,25,20,0.55)] cursor-pointer transition-all hover:bg-red-50 hover:border-red-200 hover:text-red-600"
                >
                  Delete
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
