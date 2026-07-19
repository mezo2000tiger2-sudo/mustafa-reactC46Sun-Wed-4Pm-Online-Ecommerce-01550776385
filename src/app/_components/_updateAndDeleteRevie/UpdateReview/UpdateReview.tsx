"use client"
import React, { useState } from "react"
import { Star, Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateReview } from "@/app/_servecies/reviews/update_review"
import toast from "react-hot-toast"

export function UpdateReview({ reviewId, id }: { reviewId: string, id: string }) {
  const quaryClient = useQueryClient()
  const [open, setOpen] = useState(false)
  const [rating, setRating] = useState("")
  const [review, setReview] = useState("")
  const [error, setError] = useState("")

  function renderStars(count: number) {
    return (
      <div className="flex items-center gap-1">
        {Array.from({ length: count }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        ))}
      </div>
    )
  }

  const { mutate, isPending } = useMutation({
    mutationKey: ["update-Review"],
    mutationFn: updateReview,
    onSuccess(data) {
      if (data.message == 'fail') {
        toast.error(data.errors.msg)
      } else {
        toast.success('Narrative updated')
        quaryClient.invalidateQueries({ queryKey: ['reviews', id] })
        setOpen(false)
      }
    },
  })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!rating) {
      setError("Please select a rating.")
      return
    }
    if (!review) {
      setError("Please write a review.")
      return
    }
    setError("")

    mutate({
      reviewId,
      rating: Number(rating),
      review,
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem
          className="flex items-center gap-2 px-3 py-2.5 text-sm font-bold text-[#1c1914]/70 focus:bg-[#f6f1e8] focus:text-[#0e8528] cursor-pointer rounded-lg transition-colors"
          onSelect={(e) => e.preventDefault()}
        >
          <Pencil className="size-4" />
          <span>Edit Narrative</span>
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-[#fffcf7] border-[#1c1914]/12 rounded-[24px] shadow-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl text-[#1c1914]">Update your experience</DialogTitle>
            <DialogDescription className="text-[#1c1914]/60">
              Refine your thoughts on this product for the community.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3">
            <Label className="text-[12px] font-bold text-[#1c1914]/72 uppercase tracking-wide">Satisfaction</Label>
            <Select value={rating} onValueChange={setRating}>
              <SelectTrigger className="h-11 rounded-[10px] border-[#1c1914]/12 bg-[#fffdf8]">
                <SelectValue placeholder="Update rating" />
              </SelectTrigger>
              <SelectContent className="rounded-[10px] border-[#1c1914]/12">
                {[1, 2, 3, 4, 5].map((num) => (
                  <SelectItem key={num} value={String(num)}>
                    <div className="flex items-center gap-2">
                      <span className="font-bold">{num}</span>
                      {renderStars(num)}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label htmlFor="review-edit" className="text-[12px] font-bold text-[#1c1914]/72 uppercase tracking-wide">Narrative</Label>
            <textarea
              id="review-edit"
              placeholder="Refine your experience..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="w-full min-h-[120px] rounded-[10px] border border-[#1c1914]/12 p-4 bg-[#fffdf8] text-[#1c1914] placeholder:text-[#1c1914]/30 focus:outline-none focus:ring-1 focus:ring-[#0e8528]/30 transition-all shadow-inner"
            />
          </div>

          {error && <p className="text-xs font-bold text-red-500">{error}</p>}

          <DialogFooter className="gap-2 sm:gap-0">
            <DialogClose asChild>
              <Button variant="ghost" type="button" className="rounded-full font-bold text-[#1c1914]/60">Cancel</Button>
            </DialogClose>
            <Button
              type="submit"
              className="bg-[#0e8528] hover:bg-[#0e8528]/90 text-white rounded-full px-8 font-bold shadow-lg shadow-[#0e8528]/20 transition-all"
              disabled={isPending}
            >
              {isPending ? 'Updating...' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
