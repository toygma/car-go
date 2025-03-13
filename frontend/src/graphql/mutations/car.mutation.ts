import { gql } from "@apollo/client";

export const NEW_CAR_MUTATION = gql`
  mutation CreateCar($carInput: CarInput) {
    createCar(carInput: $carInput) {
      id
    }
  }
`;
