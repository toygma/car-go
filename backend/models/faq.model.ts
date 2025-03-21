import mongoose from "mongoose";
import { IFaq } from "shared";


const faqSchema = new mongoose.Schema<IFaq>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Faq = mongoose.model<IFaq>("Faq", faqSchema);
export default Faq;
