import { gql } from "@apollo/client";

export const GET_BOOKING_BY_ID = gql`
  query BookingId($bookingId: String!) {
    getBookingById(bookingId: $bookingId) {
      id
      car {
        name
      }
      startDate
      endDate
      daysOfRent
      rentPerDay
      customer {
        name
        email
        phoneNo
      }
      amount {
        tax
        rent
        discount
        total
      }
      paymentInfo {
        status
      }
      additionalNotes
      createdAt
    }
  }
`;

export const GET_MY_BOOKINGS = gql`
  query MyBookings($page: Int, $query: String) {
    myBookings(page: $page, query: $query) {
      bookings {
        car {
          name
          images {
            url
            public_id
          }
        }
        amount {
          rent
          discount
          tax
          total
        }
        paymentInfo {
          status
        }
        createdAt
        id
      }
      totalAmount
      totalBookings
      pagination {
        totalCount
        resPerPage
      }
      totalUnpaidBookings
    }
  }
`;

export const GET_DASHBOARD_STATS = gql`
  query GetDashboardStats($endDate: String, $startDate: String) {
    getDashboardStats(endDate: $endDate, startDate: $startDate) {
      totalBookings
      totalPaidCash
      totalPendingCash
      totalSales
      sales {
        date
        sales
        bookings
      }
    }
  }
`;
