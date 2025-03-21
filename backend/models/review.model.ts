import mongoose from "mongoose";
import { IReview } from "shared";
import Car from "./car.model";
const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    car: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    rating: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

reviewSchema.post("findOneAndDelete",async function (doc){
  if(doc){
    await Car.findByIdAndUpdate(doc.car,{$pull:{reviews:doc._id}})
  }
})

const Review = mongoose.model<IReview>("Review", reviewSchema);
export default Review;
