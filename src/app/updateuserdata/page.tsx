'use client'


import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {Controller, useForm} from 'react-hook-form'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from "zod"
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { signOut } from 'next-auth/react';
import { LoaderIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { updateuserdataschema } from '@/schema/updateuserdataschema';




type inputes={
    name: '',
    email: '',
    phone: ''
}



export default function UpdateUserData() {
    const [isLoading, setisLoading] = useState(false)
  const [error, seterror] = useState('')
  const router = useRouter()

  const form = useForm(
    {
      defaultValues:{       
        name: '',
        email: '',
        phone: ''
      },
      resolver:zodResolver(updateuserdataschema),
      mode:'onSubmit',
      reValidateMode:'onBlur'

    }
  )
  async function submitForm(values:zod.infer<typeof updateuserdataschema>){
    setisLoading(true)
    console.log(values);
    const resp =await fetch(`/api/updateuserdata`,{
      method:'PUT',

      body:JSON.stringify({       
        name: values.name,
        email: values.email,
        phone: values.phone
      }),

      headers:{
        'Content-type':'application/json'
      }
    })
    
const payload = await resp.json()
if (payload?.message == 'success'){
    toast.success('Data updated succesfuly')
    router.push('/profile')
    signOut({
        callbackUrl:'/login'
    })
    
}
if(payload?.message == 'fail'){
    toast.error(payload.errors.msg)

}
console.log(payload);

    setisLoading(false)
    
    
    

  }

  return <>
  <div className="min-h-screen py-7 flex justify-center items-center bg-main">

  <div className="w-5/6  md:w-1/2 mx-auto p-5 bg-gray-100 rounded-lg overflow-hidden">
    <h2 className='text-green-600 font-bold text-2xl mb-2'>Update data :</h2>
  <form onSubmit={form.handleSubmit(submitForm)}>
    


    <div className="mt-4">
      <Controller
  name="name"
  control={form.control}
  render={({ field, fieldState }) => (
    <Field data-invalid={fieldState.invalid}>
      <FieldLabel htmlFor={field.name}>Name:</FieldLabel>
      <div className="relative">
              <Input
                className='bg-white'
                type='text'
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="EX:Mohamed"
              />
              
            </div>
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  )}
/>
    </div>
    <div className="mt-4">
      <Controller
  name="email"
  control={form.control}
  render={({ field, fieldState }) => (
    <Field data-invalid={fieldState.invalid}>
      <FieldLabel htmlFor={field.name}>Email:</FieldLabel>
      <div className="relative">
              <Input
                className='bg-white'
                type='text'
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="EX:user@gmail.com"
              />
              
            </div>
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
      <FieldLabel htmlFor={field.name}>Phone:</FieldLabel>
      <div className="relative">
              <Input
                className='bg-white'
                type='text'
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="EX:xX@123"
              />
              
            </div>
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  )}
/>
    </div>


    
    <h2 className='text-red-500  mt-4 text-xl text-center'>{error}</h2>
    <Button type='submit' className='my-6 w-full'>{isLoading? 
    <>
    
    <LoaderIcon
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin",)}

    />
    Loading....
    </>:<>submit</>
    }</Button>
    
    
  </form>
  </div>
  </div>
  </>
}
