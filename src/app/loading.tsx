import React from 'react'
import { Spinner } from "@/components/ui/spinner"

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen bg-main">

        <Spinner className="size-15 text-white" />
    </div>
  )
}
