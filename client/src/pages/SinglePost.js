import React, { useContext, useState } from "react";
import cx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import { IconButton, TextField, Divider, Typography } from "@material-ui/core";
import AddCommentIcon from "@material-ui/icons/AddComment";
import Button from "@material-ui/core/Button";
import TextInfoContent from "@mui-treasury/components/content/textInfo";
import { useBlogTextInfoContentStyles } from "@mui-treasury/styles/textInfoContent/blog";
import { useOverShadowStyles } from "@mui-treasury/styles/shadow/over";

import { Spinner } from "react-bootstrap";

import { gql, useMutation, useQuery } from "@apollo/client";
import { AuthContext } from "../context/auth/auth";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

import moment from "moment";

import LikeButton from "../components/LikeButton";
import DeleteButton from "../components/DeletButton";
const useStyles = makeStyles(({ breakpoints, spacing }) => ({
  root: {
    margin: "auto",
    marginTop: "20px",
    borderRadius: spacing(2), // 16px
    transition: "0.3s",
    boxShadow: "0px 14px 80px rgba(34, 35, 58, 0.2)",
    position: "relative",
    maxWidth: 500,
    minWidth: 275,
    marginLeft: "auto",
    overflow: "initial",
    background: "#ffffff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: spacing(2),
    // [breakpoints.up("md")]: {
    //   flexDirection: "row",
    //   paddingTop: spacing(2),
    // },
  },
  media: {
    width: "88%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: spacing(-3),
    height: 0,
    paddingBottom: "48%",
    borderRadius: spacing(2),
    backgroundColor: "#fff",
    position: "relative",
    // [breakpoints.up("md")]: {
    //   width: "100%",
    //   marginLeft: spacing(-3),
    //   marginTop: 0,
    //   transform: "translateX(-8px)",
    // },
    "&:after": {
      content: '" "',
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: spacing(2), // 16
      opacity: 0.5,
    },
  },
  content: {
    padding: 24,
  },
  cta: {
    marginTop: 24,
    textTransform: "initial",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

export const SinglePost = React.memo(function BlogCard() {
  const styles = useStyles();
  const { button: buttonStyles, ...contentStyles } =
    useBlogTextInfoContentStyles();
  const shadowStyles = useOverShadowStyles();

  const history = useHistory();
  const { id: postId } = useParams();
  const { user } = useContext(AuthContext);
  const { data } = useQuery(GET_POST, {
    variables: { postId },
  });

  const [comment, setComment] = useState("");
  const [submitComment] = useMutation(CREATE_COMMENT, {
    variables: {
      postId,
      body: comment,
    },
    update() {
      setComment("");
    },
  });
  const post = data && data.getPost;
  return (
    <>
      {data ? (
        <Card className={cx(styles.root, shadowStyles.root)}>
          <CardMedia
            className={styles.media}
            image={post.file}
            title={post.body}
          />
          <CardContent>
            <TextInfoContent
              classes={contentStyles}
              overline={moment(post.createdAt).fromNow()}
              heading={post.username}
              body={post.body}
            />
            <Divider />
            <Divider />
            <Divider />
            <Divider />
            <Divider />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "2rem",
                justifyContent: "space-between",
              }}
            >
              <LikeButton
                className={buttonStyles}
                likes={post.likes}
                id={postId}
                user={user}
              />
              <span>
                {user && user.username === post.username && (
                  <DeleteButton postId={post.id} />
                )}
              </span>
            </div>
          </CardContent>{" "}
          {user && (
            <div className="comments">
              <form>
                <TextField
                  placeholder="Add Comment"
                  type="text"
                  name="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <Button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    submitComment();
                  }}
                  startIcon={<AddCommentIcon />}
                >
                  Comment
                </Button>
              </form>
            </div>
          )}
          <div>
            {post &&
              post.comments.map((comment) => {
                return (
                  <Card>
                    <CardContent
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-around",
                        margin: "auto",
                        padding: "15px",
                      }}
                    >
                      <Typography className={styles.pos} color="textSecondary">
                        {comment.username}
                      </Typography>
                      <Divider />
                      <Typography variant="h5" component="h2">
                        {comment.body}
                      </Typography>
                      <Divider />
                      <Typography
                        className={styles.title}
                        color="textSecondary"
                        gutterBottom
                      >
                        {moment(comment.createdAt).fromNow()}
                      </Typography>
                      {user && user.username === comment.username && (
                        <DeleteButton postId={post.id} commentId={comment.id} />
                      )}
                    </CardContent>
                  </Card>
                );
              })}
          </div>
        </Card>
      ) : (
        <>
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </>
      )}
    </>
  );
});

export default SinglePost;

const GET_POST = gql`
  query ($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      username
      file
      createdAt
      comments {
        id
        username
        body
        createdAt
      }
      likes {
        username
        createdAt
        id
      }
    }
  }
`;

const CREATE_COMMENT = gql`
  mutation ($postId: String!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        body
        createdAt
        username
      }
    }
  }
`;
