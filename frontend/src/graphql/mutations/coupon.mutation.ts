import { gql } from "@apollo/client";

export const CREATE_MUTATION_COUPON = gql`
  mutation CreateCoupon($couponInput: CouponInput!) {
    createCoupon(couponInput: $couponInput) {
      id
    }
  }
`;
