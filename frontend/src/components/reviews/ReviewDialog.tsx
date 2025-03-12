import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import EditInput from "../input/EditInput";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  reviewCreateSchema,
  reviewSchema,
} from "@/validation/review/reviewValidation";
import { CREATE_UPDATE_REVIEW_MUTATION } from "@/graphql/mutations/review.mutation";
import { useMutation } from "@apollo/client";
import { toast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { toastNotification } from "@/helpers/helpers";

import StarRatings from "react-star-ratings";

interface Props {
  buttonText: string;
  carId?: string;
}

export function ReviewDialog({ buttonText, carId }: Props) {
  const [rating, setRating] = useState(0);

  const form = useForm<reviewCreateSchema>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      comment: "",
    },
    mode: "onChange",
  });

  const [reviewUserCreate, { loading, error }] = useMutation(
    CREATE_UPDATE_REVIEW_MUTATION,
    {
      onCompleted: () => {
        toast({
          title: "Comment posted",
          variant: "success",
        });
      },
    }
  );

  useEffect(() => {
    if (error) {
      toastNotification(error);
    }
  }, [error]);

  const onSubmit = async (data: reviewCreateSchema) => {
    const reviewInput = {
      rating: rating,
      comment: data.comment,
      car: carId,
    };
    await reviewUserCreate({
      variables: {
        reviewInput,
      },
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"destructive"}>{buttonText}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{buttonText}</DialogTitle>
          <DialogDescription>
            Post or update your review for this car
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid w-full gap-2"
          >
            <div className="grid gap-7 py-4">
              <div className="grid w-full gap-3">
                <Label htmlFor="message">Your Ratings</Label>
                <StarRatings
                  starRatedColor="orange"
                  numberOfStars={5}
                  name="rating"
                  starDimension="25px"
                  starSpacing="1px"
                  rating={rating}
                  changeRating={(newRating: number) => setRating(newRating)}
                />
              </div>
              <Label htmlFor="comments">Your comments</Label>
              <EditInput
                placeholder="Type your review here."
                multiline
                control={form.control}
                name="comment"
                error={form.formState.errors.comment}
              />
            </div>
            <DialogFooter>
              <Button type="submit" disabled={loading} loading={loading}>
                Post Your Review
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
