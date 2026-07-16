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
  <div className="min-h-screen flex justify-center items-center bg-[#f6f1e8]">
    <div className="w-11/12 md:w-full max-w-lg mx-auto bg-[#fffdf8] border border-[rgba(28,25,20,0.12)] rounded-[18px] p-6 shadow-[0_12px_32px_rgba(28,25,20,0.07)]">
      <h4 className="font-[550] text-[1.25rem] mb-1.5 tracking-tight">Update profile</h4>
      <p className="text-[13px] text-[rgba(28,25,20,0.55)] font-[500] mb-5 leading-relaxed">
        Update your name, email, or phone number below.
      </p>
  <form onSubmit={form.handleSubmit(submitForm)} className="flex flex-col gap-3.5">
    


    <Controller
  name="name"
  control={form.control}
  render={({ field, fieldState }) => (
    <Field data-invalid={fieldState.invalid}>
      <FieldLabel htmlFor={field.name} className="text-xs font-bold uppercase tracking-wide text-[rgba(28,25,20,0.65)] mb-1">Name</FieldLabel>
      <div className="relative">
        <Input
          className="bg-[#fffdf8] border border-[rgba(28,25,20,0.12)] rounded-[10px] px-3 py-2.5 w-full"
          type='text'
          {...field}
          id={field.name}
          aria-invalid={fieldState.invalid}
          placeholder="Name"
        />
      </div>
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  )}
/>
    <Controller
  name="email"
  control={form.control}
  render={({ field, fieldState }) => (
    <Field data-invalid={fieldState.invalid}>
      <FieldLabel htmlFor={field.name} className="text-xs font-bold uppercase tracking-wide text-[rgba(28,25,20,0.65)] mb-1">Email</FieldLabel>
      <div className="relative">
        <Input
          className="bg-[#fffdf8] border border-[rgba(28,25,20,0.12)] rounded-[10px] px-3 py-2.5 w-full"
          type='text'
          {...field}
          id={field.name}
          aria-invalid={fieldState.invalid}
          placeholder="Email"
        />
      </div>
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  )}
/>
    <Controller
  name="phone"
  control={form.control}
  render={({ field, fieldState }) => (
    <Field data-invalid={fieldState.invalid}>
      <FieldLabel htmlFor={field.name} className="text-xs font-bold uppercase tracking-wide text-[rgba(28,25,20,0.65)] mb-1">Phone</FieldLabel>
      <div className="relative">
        <Input
          className="bg-[#fffdf8] border border-[rgba(28,25,20,0.12)] rounded-[10px] px-3 py-2.5 w-full"
          type='text'
          {...field}
          id={field.name}
          aria-invalid={fieldState.invalid}
          placeholder="Phone"
        />
      </div>
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  )}
/>

    <h2 className="text-red-500 text-sm text-center">{error}</h2>
    <Button
      type='submit'
      className="w-full mt-1 bg-[rgb(14,133,40)] hover:bg-[rgb(14,133,40)] text-white font-bold py-3 px-5 rounded-[14px] text-sm shadow-[0_12px_28px_rgba(14,133,40,0.2)] cursor-pointer transition-all"
    >
      {isLoading? (
        <>
          <LoaderIcon role="status" aria-label="Loading" className={cn("size-4 animate-spin mr-2")} />
          Loading...
        </>
      ) : (
        "Save profile"
      )}
    </Button>

  </form>
  </div>
  </div>
  </>
}
