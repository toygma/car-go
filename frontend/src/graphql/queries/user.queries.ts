import { gql } from "@apollo/client";

export const CURRENT_USER = gql`
  query Me {
    me {
      id
      name
      email
      phoneNo
      avatar {
        public_id
        url
      }
      role
      createdAt
      updatedAt
    }
  }
`;

export const LOGOUT_USER = gql`
  query Logout {
    logout
  }
`;

export const GET_ALL_USERS = gql`
  query GetAllUsers($query: String, $page: Int) {
    getAllUsers(query: $query, page: $page) {
      pagination {
        totalCount
        resPerPage
      }
      users {
        id
        name
        email
        password
        phoneNo
        avatar {
          url
          public_id
        }
        role
        createdAt
        updatedAt
      }
    }
  }
`;
