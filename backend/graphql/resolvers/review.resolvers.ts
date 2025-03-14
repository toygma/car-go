import { IUser } from "shared";
import {
  canReview,
  createUpdateReview,
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
  },
  Query: {
    canReview: async (
      _: any,
      { canReviewCarId }: { canReviewCarId: string },
      { user }: { user: IUser }
    ) => canReview(canReviewCarId, user?.id),
  },
};
