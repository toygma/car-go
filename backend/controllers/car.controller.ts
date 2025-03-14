import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";
import Car from "../models/car.model";
import { CarInput, CarFilters } from "../types/car.types";
import APIFilters from "../utils/apiFilters";
import {
  deleteCloudinary,
  uploadMultipleCloudinary,
} from "../utils/cloudinary";
import { NotFoundError } from "../utils/errorHandler";

export const getAllCars = catchAsyncErrors(
  async (page: number, filters: CarFilters, query: string) => {
    const resPerPage = 4;
    const searchQuery = new APIFilters(Car)
      .search(query)
      .filters(filters)
      .populate("reviews");
    let car = await searchQuery.model;

    const totalCount = car.length;

    searchQuery.pagination(page, resPerPage);
    car = await searchQuery.model.clone();
    return { car, pagination: { totalCount, resPerPage } };
  }
);

export const createCar = catchAsyncErrors(async (carInput: CarInput) => {
  let uploadedImageUrls: { url: String; public_id: string }[] = [];

  try {
    uploadedImageUrls = await uploadMultipleCloudinary(
      carInput.images,
      "gorental/cars"
    );

    const newCar = await Car.create({
      ...carInput,
      images: uploadedImageUrls,
    });
    return newCar;
  } catch (error) {
    if (uploadedImageUrls.length > 0) {
      const deletePromises = uploadedImageUrls.map((url) => {
        return deleteCloudinary(url.public_id);
      });

      await Promise.all(deletePromises);
    }

    throw error;
  }
});

export const getCarById = catchAsyncErrors(async (carId: string) => {
  const car = await Car.findById(carId).populate({
    path: "reviews",
    populate: {
      path: "user",
      model: "User",
    },
  });
  if (!car) throw new NotFoundError("Car not found");
  return car;
});

export const updateCar = catchAsyncErrors(
  async (carId: string, carInput: CarInput) => {
    const car = await Car.findByIdAndUpdate(carId, carInput, {
      new: true,
      runValidators: true,
    });
    if (!car) {
      throw new NotFoundError("Car not found");
    }
    let uploadedImageUrls: { url: String; public_id: string }[] = [];

    try {
      uploadedImageUrls = await uploadMultipleCloudinary(
        carInput.images,
        "gorental/cars"
      );

      const newCar = await Car.create({
        ...carInput,
        images: uploadedImageUrls,
      });
      return newCar;
    } catch (error) {
      if (uploadedImageUrls.length > 0) {
        const deletePromises = uploadedImageUrls.map((url) => {
          return deleteCloudinary(url.public_id);
        });

        await Promise.all(deletePromises);
      }
    }

    await car
      .set({
        ...carInput,
        images:
          uploadedImageUrls.length > 0
            ? [...car.images, ...uploadedImageUrls]
            : car.images,
      })
      .save();

    return true;
  }
);

export const deleteCar = catchAsyncErrors(async (carId: string) => {
  const car = await Car.deleteOne({ _id: carId });

  if (!car) {
    throw new NotFoundError("Car not found");
  }

  return true;
});
