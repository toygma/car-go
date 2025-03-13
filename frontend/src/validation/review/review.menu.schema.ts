import { z } from "zod";

const requiredStringName = z
  .string({ required_error: "required" })
  .min(3, { message: "Cannot be left blank" })
  .regex(/^[A-Za-z0-9@?!#%çÇğĞıİöÖşŞüÜ,^"\s]*$/, {
    message: "Invalid characters",
  });


export const reviewSchema = z.object({
  comment: requiredStringName,
});

export type reviewCreateSchema = z.infer<typeof reviewSchema>;
