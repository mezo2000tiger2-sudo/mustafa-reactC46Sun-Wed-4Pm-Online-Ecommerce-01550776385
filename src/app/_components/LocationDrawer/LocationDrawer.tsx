'use client'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Home, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Link from 'next/link';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getAddresses } from '@/app/_servecies/address/get-addreses';
import Loading from '@/app/loading';
import { deleteAddress } from '@/app/_servecies/address/del-adress';
import toast from 'react-hot-toast';
import { shippingAddress } from "@/app/_type/cartResponseInterface";

export function LocationDrawer({onSelect}:{onSelect:(adress:shippingAddress)=>void}) {
    const quaryclient = useQueryClient()
      const { data, isLoading } = useQuery({
        queryKey: ['addresses'],
        queryFn: getAddresses
      })
      
      console.log('addresses is: ', data);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <p  className="text-blue-600 text-center mt-3 cursor-pointer text-sm">See all Saved Addresses</p>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>All saved Addresses</DialogTitle>
          <DialogDescription>
            This is adresses youcan choose from
          </DialogDescription>
        </DialogHeader>
        <div className="no-scrollbar -mx-4 max-h-[50vh] overflow-y-auto px-4">
          {Array.from({ length: 1 }).map((_, index) => (
            <p key={index} className="mb-4 leading-normal">
              <div className='flex flex-col gap-4 justify-center items-center'>
          {data?.data?.map((adress: any) => {
            return <DialogClose key={adress._id} asChild>
                <Card onClick={()=>{onSelect(adress)}}  className="w-full hover:-translate-y-2 cursor-pointer transition-all">
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

                </div>
              </CardContent>
            </Card>
            </DialogClose>
          })}


        </div>
            </p>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

