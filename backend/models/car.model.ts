import mongoose from "mongoose";
import {
  CarStatus,
  CarBrand,
  CarCategories,
  CarFuelTypes,
  CarTransmissions,
  CarDoors,
  CarSeats,
  ICar,
} from "shared";

const carSchema = new mongoose.Schema<ICar>(
  {
    name: {
      type: String,
      required: [true, "Please enter car name"],
    },
    description: {
      type: String,
      required: [true, "Please enter car description"],
    },
    status: {
      type: String,
      required: [true, "Please enter car status"],
      default: "Draft",
      enum: {
        values: CarStatus,
      },
    },
    rentPerDay: {
      type: Number,
      required: [true, "Please enter rent per day"],
    },
    address: {
      type: String,
      required: [true, "Please enter address"],
    },
    images: [
      {
        url: String,
        public_id: String,
      },
    ],
    brand: {
      type: String,
      required: [true, "Please enter car brand"],
      enum: {
        values: CarBrand,
        message: "Please select correct brand for car",
      },
    },
    year: {
      type: Number,
      required: [true, "Please enter car year"],
    },
    transmission: {
      type: String,
      enum: {
        values: CarTransmissions,
      },
      required: [true, "Please enter car transmission"],
    },
    milleage: {
      type: Number,
      required: [true, "Please enter car milleage"],
    },
    power: {
      type: Number,
      required: [true, "Please enter car power"],
    },
    seats: {
      type: Number,
      enum: {
        values: CarSeats,
      },
      required: [true, "Please enter car seats"],
    },
    doors: {
      type: Number,
      enum: {
        values: CarDoors,
      },
      required: [true, "Please enter car doors"],
    },
    fuelType: {
      type: String,
      enum: {
        values: CarFuelTypes,
      },
      required: [true, "Please enter car fuel type"],
    },
    category: {
      type: String,
      enum: {
        values: CarCategories,
      },
      required: [true, "Please enter car category"],
    },
    reviews: [String],
  },
  { timestamps: true }
);

carSchema.virtual("ratings").get(function () {
  return {
    value: 5,
    count: 10,
  };
});

const Car = mongoose.model<ICar>("Car", carSchema);

export default Car;
