import { IUser } from "shared";
import { createUpdateReview } from "../../controllers/review.controller";
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
};
