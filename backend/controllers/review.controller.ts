import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";
import Booking from "../models/booking.model";
import Car from "../models/car.model";
import Review from "../models/review.model";
import { ReviewInput } from "../types/review.types";
import APIFilters from "../utils/apiFilters";


export const getAllReviews = catchAsyncErrors(
  async (page: number,  query: string) => {
    const resPerPage = 3;
    const searchQuery = new APIFilters(Review)
      .filters({car:query})
      .populate("car");

    let reviews = await searchQuery.model;

    const totalCount = reviews.length;

    searchQuery.pagination(page, resPerPage);
    
    reviews = await searchQuery.model.clone();

    return { reviews, pagination: { totalCount, resPerPage } };
  }
);

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

export const canReview = async (canReviewCarId: string, userId: string) => {
  try {
    const bookings = await Booking.findOne({
      car: canReviewCarId,
      user: userId,
      "paymentInfo.status": "paid",
    });

    return !!bookings;
  } catch (error: any) {
    console.log(error.message);
  }
};
