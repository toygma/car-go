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

export const updateProfileSchema = z.object({
  name: requiredStringName,
  email: z.string().email(),
  phoneNo: requiredStringPhoneNo,
});

export type createUpdateProfileSchema = z.infer<typeof updateProfileSchema>;

export const updatePasswordSchema = z
  .object({
    oldPassword: requiredStringPassword,
    newPassword: requiredStringPassword,
    confirmPassword: requiredStringPassword,
  })
  .refine((value) => value.newPassword === value.confirmPassword, {
    message: "Password is do not match",
    path: ["confirmPassword"],
  });

export type createUpdatePasswordSchema = z.infer<typeof updatePasswordSchema>;

export const UpdateAvatarSchema = z.object({
  avatar: z
  .instanceof(File, { message: "Please upload an image file" })
  .refine((file) => file.size < 3 * 1024 * 1024, {
    message: "Image must be less than 3MB",
  }),
});

export type createUpdateAvatarSchema = z.infer<typeof UpdateAvatarSchema>;
// Base64 veya URL olarak saklanacaksa → z.string()
// Doğrudan bir dosya (File) olarak saklanacaksa → z.instanceof(File)