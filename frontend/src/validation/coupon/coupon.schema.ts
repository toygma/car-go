import { z } from "zod";

export const couponSchema = z.object({
  name: z
    .string({ required_error: "Please enter name" })
    .min(2, "Name must be at least 2 characters"),
  code: z
    .string({ required_error: "Please enter code" })
    .min(3, "Code must be at least 3 characters"),
  discountPercent: z.coerce
    .number({ required_error: "Please enter discount percent" })
    .min(1, "Discount must be at least 1%")
    .max(100, "Discount cannot exceed 100%"),
  expiry: z.date({ required_error: "please enter coupon expiry date" }),
});

export type createCouponSchema = z.infer<typeof couponSchema>;
