import gql from "graphql-tag";

export const bookingTypeDefs = gql`
  type Customer {
    name: String!
    email: String!
    phoneNo: String!
  }

  type Amount {
    rent: Float!
    discount: Float!
    tax: Float!
    total: Float!
  }
  type Pagination {
    totalCount: Int
    resPerPage: Int
  }
  type PaymentInfo {
    id: String!
    status: String!
    method: String!
  }

  type Booking {
    id: ID!
    user: User
    car: Car
    startDate: String!
    endDate: String!
    customer: Customer!
    amount: Amount!
    daysOfRent: Int!
    rentPerDay: Float!
    paymentInfo: PaymentInfo!
    additionalNotes: String!
    createdAt: String!
    updatedAt: String!
  }

  type CurrentUserBookings {
    bookings: [Booking]
    totalAmount: Float
    totalBookings: Int
    totalUnpaidBookings: Int
    pagination: Pagination
  }

  input UpdateBookingInput {
    paymentInfo: PaymentInfoInput
  }

  type SalesData {
    date: String
    sales: Float
    bookings: Int
  }

  type DashboardStats {
    totalSales: Float
    totalBookings: Int
    totalPendingCash: Float
    totalPaidCash: Float
    sales: [SalesData]
  }

  type Mutation {
    createBooking(bookingInput: BookingInput!): Booking!
    updateBooking(
      bookingId: String!
      bookingInput: UpdateBookingInput!
    ): Boolean
  }
  type Query {
    getBookingById(bookingId: String!): Booking!
    getCarBookedDates(carId: String!): [String]!
    myBookings(page: Int, query: String): CurrentUserBookings
    getDashboardStats(startDate: String, endDate: String): DashboardStats
  }

  input BookingAmountInput {
    tax: Float!
    discount: Float!
    rent: Float!
    total: Float!
  }

  input BookingInput {
    car: ID!
    startDate: String!
    endDate: String!
    customer: CustomerInput!
    amount: BookingAmountInput!
    daysOfRent: Int!
    rentPerDay: Float!
    additionalNotes: String
  }

  input CustomerInput {
    name: String!
    email: String!
    phoneNo: String!
  }

  input AmountInput {
    rent: Float!
    discount: Float!
    tax: Float!
    total: Float!
  }

  input PaymentInfoInput {
    id: String
    status: String
    method: String
  }
`;
