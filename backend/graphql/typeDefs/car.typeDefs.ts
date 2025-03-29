import { gql } from "graphql-tag";

export const carTypeDefs = gql`
  type CarImages {
    url: String
    public_id: String
  }

  type CarRatings {
    value: Float
    count: Int
  }

  type Car {
    id: ID
    name: String
    description: String
    status: String
    rentPerDay: Float
    address: String
    year: Int
    power: Int
    milleage: Int
    brand: String
    transmission: String
    fuelType: String
    seats: Int
    doors: Int
    images: [CarImages]
    reviews: [Review]
    category: String
    ratings: CarRatings
    createdAt: String
    updatedAt: String
  }

  input CarInput {
    name: String
    description: String
    status: String
    rentPerDay: Float
    address: String
    images: [String]
    year: Int
    power: Int
    milleage: Int
    brand: String
    transmission: String
    fuelType: String
    seats: Int
    doors: Int
    category: String
  }

  input RentPerDayFilter {
    gt: Int
    gte: Int
    lt: Int
    lte: Int
  }
  input YearFilter {
    gte: Int
    lte: Int
  }

  input CarFilters {
    category: String
    brand: String
    transmission: String
    status: String
    rentPerDay: RentPerDayFilter
    year: YearFilter
    milleage: YearFilter
  }

  type Pagination {
    totalCount: Int
    resPerPage: Int
  }

  type PaginatedCars {
    car: [Car]
    pagination: Pagination
  }

  type Query {
    getAllCars(page: Int, filters: CarFilters, query: String): PaginatedCars
    getCarById(carId: ID): Car
  }

  type Mutation {
    createCar(carInput: CarInput): Car
    updateCar(carId: ID, carInput: CarInput): Boolean
    deleteCar(carId: ID): Boolean
    deleteCarImage(carId: ID!, imageId: String!): Boolean
  }
`;
