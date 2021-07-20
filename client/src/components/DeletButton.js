import React from "react";
import Delete from "@material-ui/icons/Delete";

import { Button } from "@material-ui/core";
import { useMutation, gql } from "@apollo/client";
import { FETCH_POSTS } from "../utils/graphQlQuery";

const DeleteButton = ({ postId, commentId }) => {
  const mutation = commentId ? DELETE_COMMENT : DELETE_POST;
  const [deletePostOrComment] = useMutation(mutation, {
    variables: { postId, commentId },
    update(proxy, result) {
      if(!commentId){
        const data = proxy.readQuery({
          query: FETCH_POSTS,
        });
        let newData = [...data.getPosts];
        newData = newData.filter((post) => post.id !== postId);
        proxy.writeQuery({
          query: FETCH_POSTS,
          data: {
            ...data,
            getPosts: {
              newData,
            },
          },
        })
      }
    },
  });
  return (
    <Button
      color={"secondary"}
      onClick={deletePostOrComment}
      startIcon={
        <Delete
          style={{
            fontSize: 35,
          }}
        />
      }
    ></Button>
  );
};

export default DeleteButton;
const DELETE_POST = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;
const DELETE_COMMENT = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
        createdAt
        body
        username
      }
    }
  }
`;
