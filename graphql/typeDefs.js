import { gql } from "apollo-server";

export default gql`
  type Post {
    id: ID!
    body: String!
    file: String!
    createdAt: String!
    username: String!

    comments: [Comment]!
    likes: [Like]!
  }
  type Like {
    id: ID!
    createdAt: String!
    username: String!
  }
  type Comment {
    id: ID!
    body: String!
    username: String!
    createdAt: String!
  }
  input RegisterInput {
    email: String!
    username: String!
    password: String!
    confirmPassword: String!
  }
  input LoginInput {
    username: String!
    password: String!
  }
  type User {
    id: ID!
    email: String!
    username: String!
    token: String!
    createdAt: String!
  }
  type Query {
    getPosts: [Post]
    getPost(postId: ID!): Post!
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(loginInput: LoginInput): User!
    createPost(body: String!, file: String!): Post!
    deletePost(postId: ID!): String!
    createComment(postId: String!, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
    likePost(postId: ID!): Post!
  }
`;
