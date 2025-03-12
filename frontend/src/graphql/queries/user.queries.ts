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
