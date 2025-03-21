import { IUser } from "shared";
import {
  canReview,
  createUpdateReview,
  deleteReview,
  getAllReviews,
} from "../../controllers/review.controller";
import { ReviewInput } from "../../types/review.types";

export const reviewResolvers = {
  Mutation: {
    createUpdateReview: async (
      _: any,
      { reviewInput }: { reviewInput: ReviewInput },
      { user }: { user: IUser }
    ) => {
      return createUpdateReview(reviewInput, user?.id);
    },
    deleteReview: async (_: any, { reviewId }: { reviewId: string }) => {
      return deleteReview(reviewId);
    },
  },
  Query: {
    canReview: async (
      _: any,
      { canReviewCarId }: { canReviewCarId: string },
      { user }: { user: IUser }
    ) => canReview(canReviewCarId, user?.id),
    getAllReviews: async (
      _: any,
      { page, query }: { page: number; query: string }
    ) => getAllReviews(page, query),
  },
};
