import { z } from "zod";

export const faqSchema = z.object({
  question: z
    .string({ required_error: "Please enter question" })
    .min(10, "Question must be at least 10 characters"),
  answer: z
    .string({ required_error: "Please enter answer" })
    .min(10, "Answer must be at least 10 characters"),
});
export type createfaqSchema = z.infer<typeof faqSchema>;
