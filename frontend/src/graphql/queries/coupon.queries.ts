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
