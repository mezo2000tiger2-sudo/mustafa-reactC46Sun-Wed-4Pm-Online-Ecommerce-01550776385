import { delReview } from '@/app/_servecies/reviews/delete_review';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useEffect } from 'react'
import toast from 'react-hot-toast';

export default function DeleteReview({ reviewId ,id }:{reviewId:string , id:string}) {
    const quaryClient= useQueryClient()
    const { mutate , data } = useMutation({
    mutationKey: ["delete-Review"],
    mutationFn: delReview,
    onSuccess:(data)=>{
        if(data.success == 'true'){

            toast.success('review deleted')
            quaryClient.invalidateQueries({queryKey:['reviews', id]})
        }else{
            toast.error('error...')
        }
        console.log('del',data);
        
    }
    })
  
  return (
    <div className=" bg-red-100 p-2 px-2.5 border border-red-300 hover:bg-red-600 rounded-lg group cursor-pointer transition-colors duration-150">

              <svg onClick={()=>{mutate(reviewId)}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5 cursor-pointer text-red-600 transition-colors duration-150 group-hover:text-white">
              <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
              </svg>
              </div>
  )
}
