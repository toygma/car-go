import { gql } from "@apollo/client";

export const GET_ALL_REVIEWS = gql`
  query GetAllReviews($query: String, $page: Int) {
    getAllReviews(query: $query, page: $page) {
      pagination {
        totalCount
        resPerPage
      }
      reviews {
        id
        car {
          id
          name
        }
        rating
        comment
        createdAt
        updatedAt
      }
    }
  }
`;
