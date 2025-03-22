import { gql } from "@apollo/client";

export const CREATE_MUTATION_FAQ = gql`
  mutation CreateFaq($faqInput: FaqInput!) {
    createFaq(faqInput: $faqInput) {
      id
    }
  }
`;

export const UPDATE_MUTATION_FAQ = gql`
  mutation UpdateFaq($faqId: ID!, $faqInput: FaqInput!) {
    updateFaq(faqId: $faqId, faqInput: $faqInput) {
      id
    }
  }
`;

export const DELETE_MUTATION_FAQ = gql`
  mutation DeleteFaq($faqId: ID!) {
    deleteFaq(faqId: $faqId)
  }
`;
