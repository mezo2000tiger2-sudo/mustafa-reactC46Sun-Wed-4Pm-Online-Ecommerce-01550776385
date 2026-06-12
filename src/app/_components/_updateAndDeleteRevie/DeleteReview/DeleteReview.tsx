import { delReview } from '@/app/_servecies/reviews/delete_review';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

import { DropdownMenuItem } from '@/components/ui/dropdown-menu';

export default function DeleteReview({ reviewId, id }: { reviewId: string, id: string }) {
  const quaryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationKey: ["delete-Review"],
    mutationFn: delReview,
    onSuccess: (data) => {
      if (data.success == 'true') {
        toast.success('Review deleted')
        quaryClient.invalidateQueries({ queryKey: ['reviews', id] })
      } else {
        toast.error('Error deleting review')
      }
    }
  })

  return (
    <DropdownMenuItem
      className="flex items-center gap-2 px-3 py-2.5 text-sm font-bold text-red-600 focus:bg-red-50 focus:text-red-700 cursor-pointer rounded-lg transition-colors"
      onClick={() => mutate(reviewId)}
    >
      <Trash2 className="size-4" />
      <span>Remove Narrative</span>
    </DropdownMenuItem>
  )
}
