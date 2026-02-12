'use client'


import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {Controller, useForm} from 'react-hook-form'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { LoaderIcon } from "lucide-react"
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { cn } from "@/lib/utils"
import toast from 'react-hot-toast';
import { addAdressFn } from '../_servecies/address/add-adress';




type inputes={
        name: '',
        details: '',
        phone: '',
        city:'' 
}



export default function AddAddressPage() {

  const queryClient = useQueryClient()
  const router = useRouter()

  const { mutate, isPending } = useMutation({
    mutationKey: ['addAddress'],
    mutationFn: (address: inputes) => addAdressFn(address),
    onSuccess: (res) => {
      if (res.status === 'success') {
        toast.success('Address added successfully')
        queryClient.invalidateQueries({ queryKey: ['addresses'] })
        router.push('/addresses')
      } else {
        toast.error(res.message)
      }
    },
    onError: (err) => {
      toast.error(err.message)
    }
  })

  const form = useForm<inputes>(
    {
      defaultValues: {
        name: '',
        details: '',
        phone: '',
        city: ''

      }


    }
  )
  function submitForm(values: inputes) {
    mutate(values)
  }

  return <>
    <div className="min-h-screen py-7 flex justify-center items-center bg-main">

      <div className="w-5/6  md:w-1/2 mx-auto p-5 bg-gray-100 rounded-lg overflow-hidden">
        <h2 className='text-green-600 font-bold text-2xl mb-2'>Add adress page:</h2>
        <form onSubmit={form.handleSubmit(submitForm)}>

          <div className="mt-4">
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>name:</FieldLabel>
                  <Input
                    className='bg-white'
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="EX:Home"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </div>
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
                    placeholder="EX:Home details"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
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
                  <Input
                    className='bg-white'
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="EX:01550937254"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
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
                  <Input
                    className='bg-white'
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="EX:Gizaa"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </div>

          <Button type='submit' disabled={isPending} className='my-6 w-full'>{isPending ?
            <>

              <LoaderIcon
                role="status"
                aria-label="Loading"
                className={cn("size-4 animate-spin",)}

              />
              Loading....
            </> : <>submit</>
          }</Button>


        </form>
      </div>
    </div>
  </>
}
