"use client"
import React, { useState } from "react"
import { Star } from "lucide-react"
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
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addReview } from "@/app/_servecies/reviews/add_review"
import toast from "react-hot-toast"
import { updateReview } from "@/app/_servecies/reviews/update_review"

export function UpdateReview({ reviewId ,id }:{reviewId:string , id:string}) {
    const quaryClient= useQueryClient()
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

  const { mutate } = useMutation({
    mutationKey: ["update-Review"],
    mutationFn: updateReview,
    onSuccess(data) {
        console.log('data',data);
        if(data.message == 'fail'){
            toast.error(data.errors.msg)
        }else{
            toast.success('review updated')

            quaryClient.invalidateQueries({queryKey:['reviews', id]})
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

    setRating("")
    setReview("")
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={'ghost'} className="hover:bg-blue-500 hover:text-white border border-blue-200">update</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader>
            <DialogTitle>Write a Review</DialogTitle>
            <DialogDescription>
              Tell others about your experience.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <Label>Rating *</Label>
            <Select value={rating} onValueChange={setRating}>
              <SelectTrigger>
                <SelectValue placeholder="Select rating" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5].map((num) => (
                  <SelectItem key={num} value={String(num)}>
                    {renderStars(num)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="review">Your Review *</Label>
            <Input
              id="review"
              placeholder="Write your review..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Submit Review</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}