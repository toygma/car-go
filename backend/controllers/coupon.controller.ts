import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";
import Car from "../models/car.model";
import Coupon from "../models/coupon.model";
import { CouponInput } from "../types/coupon.types";

export const getAllCoupons = catchAsyncErrors(async (carId: string) => {
  const coupons = await Coupon.find({ car: carId }).sort({ createdAt: -1 });

  return coupons;
});

export const createCoupon = catchAsyncErrors(
  async (couponInput: CouponInput, userId: string) => {
    const car = await Car.findById(couponInput.car);

    if (!car) throw new Error("car not found");

    const coupon = await Coupon.create({
      ...couponInput,
      user: userId,
    });

    return coupon;
  }
);

export const updateCoupon = catchAsyncErrors(
  async (couponId: string, couponInput: CouponInput) => {
    const coupon = await Coupon.findByIdAndUpdate(couponId, couponInput, {
      new: true,
    });

    if (!coupon) throw new Error("coupon not found");

    return coupon;
  }
);

export const deleteCoupon = catchAsyncErrors(async (couponId: string) => {
  const coupon = await Coupon.findByIdAndDelete(couponId);
  if (!coupon) throw new Error("coupon not found");
  return true;
});
