import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";
import Car from "../models/car.model";
import { CarInput, CarFilters } from "../types/car.types";
import APIFilters from "../utils/apiFilters";
import { NotFoundError } from "../utils/errorHandler";

export const getAllCars = catchAsyncErrors(
  async (page: number, filters: CarFilters, query: string) => {
    const resPerPage = 4;
    const searchQuery = new APIFilters(Car).search(query).filters(filters);
    let car = await searchQuery.model;

    const totalCount = car.length;

    searchQuery.pagination(page, resPerPage);
    car = await searchQuery.model.clone();
    return { car, pagination: { totalCount, resPerPage } };
  }
);

export const createCar = catchAsyncErrors(async (carInput: CarInput) => {
  const newCar = await Car.create(carInput);
  return newCar;
});

export const getCarById = catchAsyncErrors(async (carId: string) => {
  const car = await Car.findById(carId);
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
