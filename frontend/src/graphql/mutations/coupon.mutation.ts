import { gql } from "@apollo/client";

export const CREATE_MUTATION_COUPON = gql`
  mutation CreateCoupon($couponInput: CouponInput!) {
    createCoupon(couponInput: $couponInput) {
      id
    }
  }
`;

export const UPDATE_MUTATION_COUPON = gql`
  mutation UpdateCoupon($couponId: ID!, $couponInput: CouponInput!) {
    updateCoupon(couponId: $couponId, couponInput: $couponInput) {
      id
    }
  }
`;

export const DELETE_MUTATION_COUPON = gql`
  mutation DeleteCoupon($couponId: ID!) {
    deleteCoupon(couponId: $couponId)
  }
`;
