import { delReview } from '@/app/_servecies/reviews/delete_review';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

export default function DeleteReview({ reviewId, id }: { reviewId: string, id: string }) {
  const quaryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationKey: ["delete-Review"],
    mutationFn: delReview,
    onSuccess: (data) => {
      if (data.success == 'true') {
        toast.success('review deleted')
        quaryClient.invalidateQueries({ queryKey: ['reviews', id] })
      } else {
        toast.error('error...')
      }
    }
  })

  return (
    <Button
      variant="ghost"
      className="w-full justify-start text-red-600 hover:text-white hover:bg-red-600 rounded-none h-9 px-2 gap-2"
      onClick={() => mutate(reviewId)}
    >
      <Trash2 className="size-4" />
      <span>Delete</span>
    </Button>
  )
}
