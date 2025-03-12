import { z } from "zod";

const requiredStringName = z
  .string({ required_error: "required" })
  .min(3, { message: "Cannot be left blank" })
  .regex(/^[A-Za-z0-9@?!#%çÇğĞıİöÖşŞüÜ,^"\s]*$/, {
    message: "Invalid characters",
  });
const requiredStringPhoneNo = z
  .string({ required_error: "required" })
  .regex(/^\d{3}\s\d{3}\s\d{2}\s\d{2}$/g, "Telephone number is invalid");
export const detailMenuSchema = z.object({
  name: requiredStringName,
  email: z.string().email(),
  phoneNo: requiredStringPhoneNo,
  bookingDates: z.number().min(3, { message: "Cannot be left blank" }),
  additionalNotes: requiredStringName,
});

export type createDetailSchema = z.infer<typeof detailMenuSchema>;
