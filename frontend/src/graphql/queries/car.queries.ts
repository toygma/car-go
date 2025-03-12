import { gql } from "@apollo/client";

export const GET_ALL_QUERIES = gql`
  query Cars($query: String, $filters: CarFilters, $page: Int) {
    getAllCars(query: $query, filters: $filters, page: $page) {
      car {
        id
        category
        fuelType
        name
        rentPerDay
        brand
        transmission
        milleage
        year
        images {
          public_id
          url
        }
        ratings {
          count
          value
        }
      }
      pagination {
        resPerPage
        totalCount
      }
    }
  }
`;

export const GET_CAR_BY_ID = gql`
  query Query($carId: ID!, $getCarBookedDatesCarId2: String!) {
    getCarById(carId: $carId) {
      id
      name
      description
      updatedAt
      createdAt
      status
      rentPerDay
      address
      year
      power
      category
      doors
      seats
      fuelType
      transmission
      brand
      milleage
      images {
        url
        public_id
      }
      ratings {
        value
        count
      }
    }
    getCarBookedDates(carId: $getCarBookedDatesCarId2)
  }
`;
