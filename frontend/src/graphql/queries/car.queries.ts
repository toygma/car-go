import { gql } from "@apollo/client";

export const GET_ALL_CARS = gql`
  query GetAllCars($page: Int, $filters: CarFilters, $query: String) {
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
        address
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
    $carId: ID
    $canReviewCarId: ID
    $getCarBookedDatesCarId2: String
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
      ratings {
        value
        count
      }
      createdAt
      updatedAt
    }
    canReview(canReviewCarId: $canReviewCarId)
    getCarBookedDates(carId: $getCarBookedDatesCarId2)
    getAllFaqs {
      id
      question
      answer
    }
  }
`;
