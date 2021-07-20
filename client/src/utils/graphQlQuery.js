import { gql } from "@apollo/client";

export const FETCH_POSTS = gql`
  query {
    getPosts {
      id
      body
      file
      createdAt
      username
      comments {
        body
        username
        createdAt
      }
      likes {
        createdAt
        id
        username
      }
    }
  }
`;
