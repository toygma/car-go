import Car from "../models/car.model";
import Review from "../models/review.model";
import { ReviewInput } from "../types/review.types";

export const createUpdateReview = async (
  reviewInput: ReviewInput,
  userId: string
) => {
  try {
    const isReview = await Review.findOne({
      user: userId,
      car: reviewInput.car,
    });

    if (isReview) {
      const review = Review.findByIdAndUpdate(isReview?.id, reviewInput, {
        new: true,
      });
      return review;
    } else {
      const review = await Review.create({ ...reviewInput, user: userId });

      await Car.findByIdAndUpdate(reviewInput.car, {
        $push: { reviews: review?.id },
      });
      return review;
    }

  } catch (error: any) {
    console.log(error.message);
  }
};
