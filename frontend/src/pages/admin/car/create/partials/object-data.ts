import {
  CarBrand,
  CarCategories,
  CarDoors,
  CarFuelTypes,
  CarSeats,
  CarStatus,
  CarTransmissions,
} from "shared/src/interfaces";
export const carBrand = Object.values(CarBrand).map((value) => ({
  value,
  label: value,
}));

export const carTransmission = Object.values(CarTransmissions).map((value) => ({
  value,
  label: value,
}));

export const carSeats = Object.values(CarSeats).map((value) => ({
  value,
  label: value,
}));

export const carDoors = Object.values(CarDoors).map((value) => ({
  value,
  label: value,
}));

export const carFuelTypes = Object.values(CarFuelTypes).map((value) => ({
  value,
  label: value,
}));

export const carCategory = Object.values(CarCategories).map((value) => ({
  value,
  label: value,
}));

export const carStatus = Object.values(CarStatus).map((value) => ({
  value,
  label: value,
}));
