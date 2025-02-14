import { gql } from '@apollo/client/core';

export const LOGIN_USER = gql`
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password)
}`;

export const LOGOUT_USER = gql`
mutation Logout($token: String!) {
    logout(token: $token)
}`;

export const ADD_USER = gql`
mutation CreateUser($username: String!, $email: String!, $password: String!, $telephone: String!, $role: String!) {
  createUser(username: $username, email: $email, password: $password, telephone: $telephone, role: $role) {
      id
      status
      username
      email
      telephone
      password
      role
  }
}
`;