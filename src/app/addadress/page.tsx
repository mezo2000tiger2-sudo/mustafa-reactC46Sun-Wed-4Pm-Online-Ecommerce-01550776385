'use client'

import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Controller, useForm } from 'react-hook-form'
import React from 'react'
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { LoaderIcon } from "lucide-react"
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { cn } from "@/lib/utils"
import toast from 'react-hot-toast';
import { addAdressFn } from '../_servecies/address/add-adress';

type inputes = {
  name: '',
  details: '',
  phone: '',
  city: ''
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

  return (
    <div className="min-h-screen bg-[#f6f1e8] py-10 flex justify-center items-center">
      <div className="w-full max-w-lg mx-auto px-4">
        <div className="rounded-2xl border border-[rgba(28,25,20,0.12)] bg-[rgba(255,252,247,0.88)] shadow-[0_12px_32px_rgba(28,25,20,0.07)] overflow-hidden p-6">
          <h2 className="font-serif text-2xl font-bold tracking-tight text-[#1c1914] mb-1">
            New address
          </h2>


          

          <form onSubmit={form.handleSubmit(submitForm)} className="space-y-4">
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>name:</FieldLabel>
                  <Input
                    className='bg-[#fffdf8]'
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="EX: Home"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name="details"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>details:</FieldLabel>
                  <Input
                    className='bg-[#fffdf8]'
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="EX: Home details"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name="phone"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>phone:</FieldLabel>
                  <Input
                    className='bg-[#fffdf8]'
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="EX: 01550937254"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name="city"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>city:</FieldLabel>
                  <Input
                    className='bg-[#fffdf8]'
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="EX: Gizaa"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Button
              type='submit'
              disabled={isPending}
              className='mt-6 w-full bg-[rgb(14,133,40)] hover:bg-[rgb(14,133,40)] text-white font-bold py-3 rounded-xl shadow-[0_20px_40px_rgba(14,133,40,0.2)] cursor-pointer transition-all duration-200'
            >
              {isPending ? (
                <>
                  <LoaderIcon
                    role="status"
                    aria-label="Loading"
                    className={cn("size-4 animate-spin mr-2")}
                  />
                  Saving...
                </>
              ) : (
                'Save address'
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
