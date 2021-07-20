import React from "react";
import Delete from "@material-ui/icons/Delete";

import { Button } from "@material-ui/core";
import { useMutation, gql } from "@apollo/client";
import { FETCH_POSTS } from "../utils/graphQlQuery";

const DeleteButton = ({ postId }) => {
  const [deletePost] = useMutation(DELETE_POST, {
    variables: { postId },
    update(proxy, result) {
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
      });
    },
  });
  return (
    <Button
      color={"secondary"}
      onClick={deletePost}
      startIcon={
        <Delete
          style={{
            fontSize: 40,
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
