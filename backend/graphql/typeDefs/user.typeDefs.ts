import gql from "graphql-tag";

export const userTypeDefs = gql`
  type Avatar {
    url: String
    public_id: String
  }

  type User {
    id: ID!
    name: String!
    email: String!
    password: String
    phoneNo: String!
    avatar: Avatar
    role: [String]
    createdAt: String!
    updatedAt: String!
  }

  input UserInput {
    name: String!
    email: String!
    password: String!
    phoneNo: String!
  }

  input UpdateUserInput {
    name: String!
    email: String!
    phoneNo: String!
    role: [String]
  }

  type PaginatedUsers {
    users: [User]
    pagination: Pagination
  }
  type Query {
    me: User
    logout: Boolean
    getAllUsers(page: Int, query: String): PaginatedUsers
  }

  type Mutation {
    registerUser(userInput: UserInput!): User
    login(email: String!, password: String!): User
    updateUserProfile(userInput: UpdateUserInput!): Boolean
    updatePassword(oldPassword: String!, newPassword: String!): Boolean
    updateAvatar(avatar: String!): Boolean
    forgotPassword(email: String!): Boolean
    updateUser(userId: String!, userInput: UpdateUserInput!): Boolean
    deleteUser(userId: String!): Boolean
  }
`;
