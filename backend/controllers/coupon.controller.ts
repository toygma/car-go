import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";
import Car from "../models/car.model";
import Coupon from "../models/coupon.model";
import { CouponInput } from "../types/coupon.types";

export const getAllCoupons = catchAsyncErrors(async (carId: string) => {
  const coupons = await Coupon.find({ _id: carId });

  return coupons;
});

export const createCoupon = catchAsyncErrors(
  async (couponInput: CouponInput, userId: string) => {
    const car = await Car.findById(couponInput.car);

    if (car) throw new Error("car not found");

    const coupon = await Coupon.create({
      ...couponInput,
      user: userId,
    });

    return coupon;
  }
);
