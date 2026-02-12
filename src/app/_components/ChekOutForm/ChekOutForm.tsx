'use client'


import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Controller, useForm } from 'react-hook-form'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import { useRouter, useSearchParams } from 'next/navigation';
import { LoaderIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { useQueryClient } from '@tanstack/react-query';
import { shippingAddress } from '@/app/_type/cartResponseInterface';
import { payCashOrder } from '@/app/_servecies/cart/pay_cash';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { payOnlineOrder } from '@/app/_servecies/cart/pay-online';
import { LocationDrawer } from '../LocationDrawer/LocationDrawer';





export default function ChekOutForm({ cartId }: { cartId: string }) {
  const [cashOrVisa, setcashOrVisa] = useState('cash')

  async function payCash(cartid: string, shippingAddress: shippingAddress) {
    const resp = await payCashOrder(cartid, shippingAddress)
    console.log(resp);
    if (resp.status === 'success') {
      toast.success('order placed successfully')
      router.push('/')
    } else {
      toast.error('error...')
    }

  }
  async function payOnline(cartid: string, shippingAddress: shippingAddress) {
    const resp = await payOnlineOrder(cartid, shippingAddress)
    console.log(resp);
    if (resp.status === 'success') {
      router.push(resp.session.url)
    } else {
      toast.error('error...')
    }

  }


  const quaryclient = useQueryClient()


  const callback = useSearchParams()
  const callbackURL = callback.get('callback-url')
  console.log(callbackURL);

  const [chekPassword, setchekPassword] = useState('password')
  const [isLoading, setisLoading] = useState(false)
  const router = useRouter()

  const form = useForm(
    {
      defaultValues: {
        details: '',
        phone: '',
        city: '',
        postalCode: ''
      }


    }
  )

  async function submitForm(values: shippingAddress) {
    const shippingAddress = {
      ...values
    }
    setisLoading(true)
    if (cashOrVisa === 'cash') {

      payCash(cartId, shippingAddress)
    } else {
      const { postalCode, ...data } = shippingAddress
      payOnline(cartId, data as shippingAddress)
    }
    setisLoading(false)
  }


  function handleAddressSelect(address: shippingAddress) {
    form.setValue('details', address.details)
    form.setValue('phone', address.phone)
    form.setValue('city', address.city)
  }

  return <>
    <div className="  md:py-0 flex justify-center items-center ">

      <div className=" mx-auto p-5 w-full bg-white rounded-b-lg  overflow-hidden">

        <RadioGroup defaultValue="cash" className="w-fit mb-3 flex  gap-3">
          <div onClick={() => { setcashOrVisa('cash') }} className="flex items-center gap-3">
            <RadioGroupItem value="cash" id="r1" />
            <Label htmlFor="r1">pay cash</Label>
          </div>
          <div onClick={() => { setcashOrVisa('visa') }} className="flex items-center gap-3">
            <RadioGroupItem value="visa" id="r2" />
            <Label htmlFor="r2">pay visa</Label>
          </div>
        </RadioGroup>


        <h2 className='text-green-600 font-bold text-2xl mb-2'>Pay {cashOrVisa === 'cash' ? 'Cash' : 'Visa'}:</h2>
        <form onSubmit={form.handleSubmit(submitForm)}>

          <div className="mt-4">
            <Controller
              name="details"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>details:</FieldLabel>
                  <Input
                    className='bg-white'
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="EX:i want it to be fresh"
                  />
                </Field>
              )}
            />
          </div>
          <div className="mt-4">
            <Controller
              name="phone"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>phone:</FieldLabel>
                  <div className="relative">
                    <Input
                      className='bg-white'
                      type='number'
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="EX:01550488312"
                    />

                  </div>
                </Field>
              )}
            />
          </div>
          <div className="mt-4">
            <Controller
              name="city"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>city:</FieldLabel>
                  <div className="relative">
                    <Input
                      className='bg-white'
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="cairo"
                    />

                  </div>
                </Field>
              )}
            />
          </div>
          {cashOrVisa === 'cash' && <div className="mt-4">
            <Controller
              name="postalCode"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Postal Code:</FieldLabel>
                  <div className="relative">
                    <Input
                      className='bg-white'
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="Postal Code"
                    />

                  </div>
                </Field>
              )}
            />
          </div>

          }
          <LocationDrawer onSelect={handleAddressSelect} />
          <Button type='submit' className={`${isLoading && `opacity-80`} my-6 w-full`}>
            {isLoading &&

              <LoaderIcon
                role="status"
                aria-label="Loading"
                className={cn("size-4 animate-spin")}
              />
            }

            submit</Button>


        </form>
      </div>
    </div>
  </>
}
