import { gql } from '@apollo/client/core';

export const LOGIN_USER_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
    }
  }
`;