import { gql } from '@apollo/client/core';

export const GET_ALL_USERS = gql`
query FindAllUsers {
  findAllUsers {
    id
    status
    username
    email
    telephone
    role
  }
}`;

// import { useQuery } from '@vue/apollo-composable';
// import {GET_ALL_USERS} from "@/query/GET_ALL_USERS";
// useQuery(GET_ALL_USERS);