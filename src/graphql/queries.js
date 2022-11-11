import { gql } from "@apollo/client";

import { REPOSITORY_BASE_FIELDS, USER_BASE_FIELDS } from "./fragments";

export const GET_REPOSITORIES = gql`
  query(
    $orderBy: AllRepositoriesOrderBy, 
    $searchKeyword: String, 
    $ownerName: String, 
    $orderDirection: OrderDirection, 
    $after: String, 
    $first: Int) {
      repositories(
        orderBy: $orderBy, 
        searchKeyword: $searchKeyword, 
        ownerName: $ownerName, 
        orderDirection: $orderDirection, 
        after: $after, 
        first: $first
      ) {
        edges {
          node {
            ...repositoryBaseFields
          }
        }
      }
  }

  ${REPOSITORY_BASE_FIELDS}
`;

export const GET_CURRENT_USER = gql`
  query {
    me {
      ...userBaseFields
    }
  }

  ${USER_BASE_FIELDS}
`;

export const SINGLE_REPOSITORY = gql`
  query ($repositoryId: ID!) {
    repository(id: $repositoryId) {
      ...repositoryBaseFields
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
  ${REPOSITORY_BASE_FIELDS}
`;
