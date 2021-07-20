import { AuthenticationError, UserInputError } from "apollo-server";
import Post from "../../models/Post.js";
import authCheck from "../../utils/auth-check.js";
export default {
  Mutation: {
    createComment: async (parent, args, context) => {
      const { postId, body } = args;
      const user = authCheck(context);
      if (body.trim() === "") {
        throw new UserInputError("Comment can not be empty", {
          errors: {
            body: "Comment body can not be empty",
          },
        });
      }

      const post = await Post.findById(postId);
      if (post) {
        post.comments.unshift({
          body,
          username: user.username,
          createdAt: new Date().toISOString(),
        });
        await post.save();
        return post;
      } else throw new UserInputError("Post not found");
    },
    deleteComment: async (_, { postId, commentId }, context) => {
      const user = authCheck(context);
      const post = await Post.findById(postId);
      if (post) {
        const commentIndex = post.comments.findIndex(
          (comment) => comment.id === commentId
        );
        if (post.comments[commentIndex].username === user.username) {
          post.comments.splice(commentIndex, 1);
          await post.save();
          return post;
        } else {
          throw new AuthenticationError("action not allowed");
        }
      } else {
        throw new UserInputError("Post not found");
      }
    },
  },
};
