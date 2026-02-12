'use client'


import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {Controller, useForm} from 'react-hook-form'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from "zod"
import { useRouter } from 'next/navigation';
import { LoaderIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import toast from 'react-hot-toast';




type inputes={
        email:'',
}



export default function forgetpassword() {
    const forgetPasswordShema = zod.object({
              email: zod.string().nonempty('email is required')
              .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ , 'invalid email'),  
            })



  const [isLoading, setisLoading] = useState(false)
    const [chekPassword, setchekPassword] = useState('password')
    const [chekRePassword, setchekRePassword] = useState('password')
  const [error, seterror] = useState('')
  const router = useRouter()

  const form = useForm(
    {
      defaultValues:{       
        email:'',

      },
      resolver:zodResolver(forgetPasswordShema),
      mode:'onSubmit',
      reValidateMode:'onBlur'

    }
  )
  async function submitForm(values:zod.infer<typeof forgetPasswordShema>){
    setisLoading(true)
    console.log(values);
    const resp =await fetch(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,{
      method:'POST',

      body:JSON.stringify({       
        email:values.email,

      }),

      headers:{
        'Content-type':'application/json'
      }
    })
    const data =await resp.json()
    if(data.statusMsg == 'success'){
      router.push('/verefyresetcode')
      toast.success(data.message)
      
    }else{
        toast.error(data.message)    
    }
    setisLoading(false)
    

  }

  return <>
  <div className="min-h-screen py-7 flex justify-center items-center bg-main">

  <div className="w-5/6  md:w-1/2 mx-auto p-5 bg-gray-100 rounded-lg overflow-hidden">
    <h2 className='text-green-600 font-bold text-2xl mb-2'>Forget password page:</h2>
  <form onSubmit={form.handleSubmit(submitForm)}>
    
    <div className="mt-4">
      <Controller
  name="email"
  control={form.control}
  render={({ field, fieldState }) => (
    <Field data-invalid={fieldState.invalid}>
      <FieldLabel htmlFor={field.name}>Email:</FieldLabel>
      <Input
      className='bg-white'
        {...field}
        id={field.name}
        aria-invalid={fieldState.invalid}
        placeholder="EX:Name123@gmail.com"
      />
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
