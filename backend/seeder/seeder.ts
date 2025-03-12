import mongoose from "mongoose";
import Car from "../models/car.model";
import { cars } from "./data";
import * as dotenv from "dotenv";
dotenv.config();


const Seeder = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);

    await Car.deleteMany({});
    console.log("Cars deleted");

    await Car.insertMany(cars);
    console.log("Cars addedd");

    process.exit();
  } catch (error: any) {
    console.log(error.message);
    process.exit();
  }
};
Seeder();
