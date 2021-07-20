import { useMutation, gql } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Typography } from "@material-ui/core";
import { useSizedIconButtonStyles } from "@mui-treasury/styles/iconButton/sized";

import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbUpOutlinedIcon from "@material-ui/icons/ThumbUpOutlined";
const LikeButton = ({ likes, id, user }) => {
  const large = useSizedIconButtonStyles({ padding: 16, childSize: 32 });

  const [likePost] = useMutation(LIKE_POST, {
    variables: { postId: id },
  });
  const [liked, setLiked] = useState(false);
  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else setLiked(false);
  }, [user, likes]);

  return (
    <div>
      {user ? (
        liked ? (
          <Button
            color={"primary"}
            onClick={likePost}
            startIcon={
              <ThumbUpIcon
                style={{
                  fontSize: 40,
                }}
              />
            }
          >
            {likes && likes.length}
          </Button>
        ) : (
          <Button
            color={"primary"}
            onClick={likePost}
            startIcon={
              <ThumbUpOutlinedIcon
                style={{
                  fontSize: 40,
                }}
              />
            }
          >
            {likes && likes.length}
          </Button>
        )
      ) : (
        <Button
          color={"primary"}
          component={Link}
          to="/login"
          startIcon={
            <ThumbUpOutlinedIcon
              style={{
                fontSize: 40,
              }}
            />
          }
        >
          {likes && likes.length}
        </Button>
      )}
    </div>
  );
};

export default LikeButton;
const LIKE_POST = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
    }
  }
`;
