'use client'


import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Metadata } from 'next';
import {Controller, useForm} from 'react-hook-form'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loginschema } from '@/schema/loginSchema';
import * as zod from "zod"
import {signIn} from 'next-auth/react'
import toast from 'react-hot-toast';
import { useRouter, useSearchParams } from 'next/navigation';
import { LoaderIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';





type inputes={
        password: '',
        email:'',
}



export default function Login() {
  const quaryclient = useQueryClient()


  const callback = useSearchParams()
  const callbackURL = callback.get('callback-url')
  console.log(callbackURL);
  
  const [chekPassword, setchekPassword] = useState('password')



  const [isLoading, setisLoading] = useState(false)
  const router = useRouter()

  const form = useForm(
    {
      defaultValues:{       
        email:'',
        password: '',
      },
      resolver:zodResolver(Loginschema),
      mode:'onSubmit',
      reValidateMode:'onChange'

    }
  )
  async function submitForm(values:zod.infer<typeof Loginschema>){
    setisLoading(true)
    console.log(values);
    const resp = await signIn('credentials' , {
      email: values.email,
      password: values.password,
      callbackUrl:callbackURL ?? '/',
      redirect:false
    })
    if(resp?.ok){
      router.push(callbackURL ?? '/')
      toast.success('Succeful login')
      quaryclient.invalidateQueries({queryKey:['get-cart']})
    }else{
      toast.error('Invalid Email or Password')

    }
    console.log(resp);
        setisLoading(false)
  }

  return <>
  <div className="min-h-screen py-7 flex justify-center items-center bg-main">

  <div className="w-5/6   md:w-1/2 mx-auto p-5 bg-gray-100 rounded-lg overflow-hidden">
    <h2 className='text-green-600 font-bold text-2xl mb-2'>Login now:</h2>
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
    <div className="mt-4">
      <Controller
  name="password"
  control={form.control}
  render={({ field, fieldState }) => (
    <Field data-invalid={fieldState.invalid}>
      <FieldLabel htmlFor={field.name}>password:</FieldLabel>
      <div className="relative">
        <Input
          className='bg-white'
          type={chekPassword}
          {...field}
          id={field.name}
          aria-invalid={fieldState.invalid}
          placeholder="EX:xX@123"
        />
        {chekPassword == 'password'? 
        <svg onClick={()=>{setchekPassword('text')}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer transition">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
        </svg>

        :
        <svg 
        onClick={()=>{setchekPassword('password')}}
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          strokeWidth={1.5} 
          stroke="currentColor" 
          className="size-6 absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer "
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>
        }
      </div>
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  )}
/>
    </div>
    <Button type='submit' className={`${isLoading && `opacity-80` } my-6 w-full`}>
      {isLoading && 

       <LoaderIcon
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin")}
    />
      }
      
      submit</Button>
    
    
  </form>
  <p className='text-center mt-3'>forget password?<Link href={'/forgetpassword'} className='hover:underline text-green-500'>Click here</Link></p>
  </div>
  </div>
  </>
}
