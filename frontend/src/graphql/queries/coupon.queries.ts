import { gql } from "@apollo/client";

export const GET_ALL_COUPONS = gql`
  query GetAllCoupons($carId: ID!) {
    getAllCoupons(carId: $carId) {
      id
      user
      car
      name
      code
      discountPercent
      expiry
      createdAt
      updatedAt
    }
  }
`;

export const GET_COUPON_DETAILS = gql`
  query getCoupon($couponCode: String!, $carId: ID!) {
    getCoupon(couponCode: $couponCode, carId: $carId) {
      id
      name
      expiry
      discountPercent
      code
    }
  }
`;
