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
  query GetCarById(
    $carId: ID!
    $getCarBookedDatesCarId2: String
    $canReviewCarId: ID
  ) {
    getCarById(carId: $carId) {
      id
      name
      description
      status
      rentPerDay
      address
      year
      power
      milleage
      brand
      transmission
      fuelType
      seats
      doors
      images {
        url
        public_id
      }
      reviews {
        id
        user {
          id
          name
          avatar {
            url
            public_id
          }
        }
        rating
        comment
        createdAt
        updatedAt
      }
      category
      createdAt
      updatedAt
      ratings {
        value
        count
      }
    }
    getCarBookedDates(carId: $getCarBookedDatesCarId2)
    canReview(canReviewCarId: $canReviewCarId)
  }
`;
