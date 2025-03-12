import { z } from "zod";

const requiredStringName = z
  .string({ required_error: "required" })
  .min(3, "min length should be 3")
  .regex(/^[A-Za-z0-9@?!#%çÇğĞıİöÖşŞüÜ,^"\s]*$/, {
    message: "Invalid characters",
  });

const requiredStringPassword = z
  .string({ required_error: "required" })
  .min(3, "min length should be 6")
  .regex(/^[A-Za-z0-9@?!#%çÇğĞıİöÖşŞüÜ,^"\s]*$/, {
    message: "Invalid characters",
  });

  const requiredStringPhoneNo = z
  .string({ required_error: "required" })
  .regex(/^\d{3}\s\d{3}\s\d{2}\s\d{2}$/g, "Telephone number is invalid");

export const createFormSchema = z.object({
  name: requiredStringName,
  email: z.string().email(),
  password: requiredStringPassword,
  phoneNo: requiredStringPhoneNo,
});

export type createFormData = z.infer<typeof createFormSchema>;

export const loginFormSchema = z.object({
  email: z.string().email(),
  password: requiredStringPassword,
});

export type createLoginData = z.infer<typeof loginFormSchema>;



export const forgotFormSchema = z.object({
  email: z.string().email(),
});

export type createForgotPassword = z.infer<typeof forgotFormSchema>;
