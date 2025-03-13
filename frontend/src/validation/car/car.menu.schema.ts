import { z } from "zod";

export const newUpdateCarSchema = z.object({
  name: z
    .string({ required_error: "Please enter car name" })
    .min(5, "Name must be at least 5 characters"),
  rentPerDay: z.coerce
    .number({ invalid_type_error: "Please enter car rent per day" })
    .positive(),
  description: z
    .string({ required_error: "Please enter car description" })
    .min(10, "Description must be at least 10 characters"),
  address: z.string({ required_error: "Please enter car address" }),
  milleage: z.coerce
    .number({ invalid_type_error: "Please enter car mileage" })
    .positive(),
  power: z.coerce
    .number({ invalid_type_error: "Please enter car power" })
    .positive(),
  year: z.coerce
    .number({ invalid_type_error: "Please enter car year" })
    .positive(),
  brand: z.string({ required_error: "Please enter car brand" }),

  transmission: z.enum(["Automatic", "Manual"], {
    required_error: "Please select a transmission type",
  }),
  fuelType: z.enum(["Petrol", "Diesel"], {
    required_error: "Please select a fuel type",
  }),
  category: z.enum(["Sedan", "Convertible", "SUV", "Hatchback"], {
    required_error: "Please select a category",
  }),
  seats: z.coerce
    .number({ invalid_type_error: "Please enter number of seats" })
    .min(1, "Must have at least 1 seat"),
  doors: z.coerce
    .number({ invalid_type_error: "Please enter number of doors" })
    .min(1, "Must have at least 1 door"),
  status: z.enum(["Draft", "Active"], {
    required_error: "Please select car status",
  }),
});

export type createOrUpdateCarSchema = z.infer<typeof newUpdateCarSchema>;
