import { z } from "zod";

const requiredStringName = z.string({ required_error: "required" });
export const searchMenuSchema = z.object({
  year: requiredStringName,
  name: requiredStringName,
  doors: requiredStringName,
  seats: requiredStringName,
  power: requiredStringName,
  transmission: requiredStringName,
  fuelType: requiredStringName,
  category: requiredStringName,
  start_year: requiredStringName,
  finish_year: requiredStringName,
});

export type createSearchSchema = z.infer<typeof searchMenuSchema>;

export const filteredMenuSchema = z.object({
  start_year: requiredStringName.optional(),
  finish_year: requiredStringName.optional(),
  min_mileage: requiredStringName.optional(),
  max_mileage: requiredStringName.optional(),
  brand: z.array(requiredStringName).optional(),
  model: z.array(requiredStringName).optional(),
  category: z.array(requiredStringName).optional(),
  transmission: z.array(requiredStringName).optional(),
});

export type createFilteredSchema = z.infer<typeof filteredMenuSchema>;
