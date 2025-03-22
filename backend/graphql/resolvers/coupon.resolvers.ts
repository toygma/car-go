import { IUser } from "shared";
import {
  createCoupon,
  deleteCoupon,
  getAllCoupons,
  updateCoupon,
} from "../../controllers/coupon.controller";
import { CouponInput } from "../../types/coupon.types";

export const couponResolvers = {
  Query: {
    getAllCoupons: async (_: any, { carId }: { carId: string }) =>
      getAllCoupons(carId),
  },

  Mutation: {
    createCoupon: async (
      _: any,
      { couponInput }: { couponInput: CouponInput },
      { user }: { user: IUser }
    ) => createCoupon(couponInput, user?.id),
    updateCoupon: async (
      _: any,
      { couponId, couponInput }: { couponId: string; couponInput: CouponInput }
    ) => updateCoupon(couponId, couponInput),

    deleteCoupon: async (_: any, { couponId }: { couponId: string }) =>
      deleteCoupon(couponId),
  },
};
