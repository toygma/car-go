import { gql } from "@apollo/client";

export const REGISTER_USER_MUTATION = gql`
  mutation RegisterUser($userInput: UserInput!) {
    registerUser(userInput: $userInput) {
      id
    }
  }
`;

export const LOGIN_USER_MUTATION = gql`
  mutation LoginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
    }
  }
`;
export const UPDATE_PROFILE_MUTATION = gql`
  mutation Mutation($userInput: UpdateUserInput!) {
    updateUserProfile(userInput: $userInput)
  }
`;

export const UPDATE_PASSWORD_MUTATION = gql`
  mutation UpdatePassword($oldPassword: String!, $newPassword: String!) {
    updatePassword(oldPassword: $oldPassword, newPassword: $newPassword)
  }
`;

export const UPDATE_AVATAR_MUTATION = gql`
  mutation UpdateAvatar($avatar: String!) {
    updateAvatar(avatar: $avatar)
  }
`;
export const FORGOT_PASSWORD = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`;

export const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($userId: String!, $userInput: UpdateUserInput!) {
    updateUser(userId: $userId, userInput: $userInput)
  }
`;

export const DELETE_USER_MUTATION = gql`
  mutation DeleteUser($userId: String!) {
    deleteUser(userId: $userId)
  }
`;
