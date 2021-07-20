import React, { useContext } from "react";

import moment from "moment";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth/auth";
import LikeButton from "./LikeButton";
import DeleteButton from "./DeletButton";

import cx from "clsx";
import { makeStyles } from "@material-ui/core/styles";

import TextInfoContent from "@mui-treasury/components/content/textInfo";
import { useSizedIconButtonStyles } from "@mui-treasury/styles/iconButton/sized";

import { useFourThreeCardMediaStyles } from "@mui-treasury/styles/cardMedia/fourThree";
import { useN04TextInfoContentStyles } from "@mui-treasury/styles/textInfoContent/n04";
import { useOverShadowStyles } from "@mui-treasury/styles/shadow/over";

import {
  IconButton,
  Typography,
  CardContent,
  Card,
  CardMedia,
  Button,
} from "@material-ui/core";
import CommentIcon from "@material-ui/icons/Comment";
const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 343,
    margin: "auto",
    borderRadius: 12,
    padding: 12,
  },
  media: {
    borderRadius: 6,
  },
}));
const PostCard = ({
  post: { body, createdAt, file, username, likes, comments, id },
}) => {
  const styles = useStyles();
  const large = useSizedIconButtonStyles({ padding: 16, childSize: 32 });

  const { user } = useContext(AuthContext);
  const mediaStyles = useFourThreeCardMediaStyles();
  const textCardContentStyles = useN04TextInfoContentStyles();
  const shadowStyles = useOverShadowStyles({ inactive: true });
  return (
    <Card className={cx(styles.root, shadowStyles.root)}>
      <CardMedia
        className={cx(styles.media, mediaStyles.root)}
        image={file}
        component={Link}
        to={`/posts/${id}`}
      />
      <CardContent>
        <TextInfoContent
          classes={textCardContentStyles}
          overline={moment(createdAt).fromNow()}
          heading={username}
          body={body}
        />
        <div className="btn">
          <LikeButton likes={likes} user={user} id={id} />
          {/* <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        startIcon={<DeleteIcon />}
      >
        Delete */}

          <Button
            color={"primary"}
            component={Link}
            to={`/posts/${id}`}
            startIcon={
              <CommentIcon
                style={{
                  fontSize: 40,
                }}
              />
            }
          >
            {comments.length}
          </Button>

          {user && user.username === username && <DeleteButton postId={id} />}
        </div>
      </CardContent>
    </Card>
  );
};

export default PostCard;
