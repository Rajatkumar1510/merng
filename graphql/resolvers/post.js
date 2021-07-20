import { AuthenticationError, UserInputError } from "apollo-server";
import Post from "../../models/Post.js";
import authCheck from "../../utils/auth-check.js";
export default {
  Query: {
    getPosts: async () => {
      try {
        const posts = await Post.find().sort({ createdAt: -1 });
        return posts;
      } catch (error) {
        console.log(error);
      }
    },
    getPost: async (parent, args, context, info) => {
      const { postId } = args;
      try {
        const post = await Post.findById(postId);
        if (post) {
          return post;
        } else {
          throw new Error("No post by this id ");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    createPost: async (parent, args, context, info) => {
      const { body, file } = args;
      const user = authCheck(context);
      const newPost = new Post({
        body,
        file,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString(),
      });
      const post = await newPost.save();
      return post;
    },

  
    deletePost: async (parent, args, context, info) => {
      const { postId } = args;
      const user = authCheck(context);
      try {
        const post = await Post.findById(postId);
        if (user.username === post.username) {
          await post.delete();
          return "Post deleted Succesfully";
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } catch (error) {
        throw new Error(error);
      }
    },


    likePost: async (_, { postId }, context) => {
      const { username } = authCheck(context);
      const post = await Post.findById(postId);
      if (post) {
        if (post.likes.find((like) => like.username === username)) {
          // Post already liked remove like
          post.likes = post.likes.filter((like) => like.username !== username);
        } else {
          // Not liked like the post now
          post.likes.push({
            username,
            createdAt: new Date().toISOString(),
          });
        }
        await post.save();
        return post;
      } else throw new UserInputError("Post not found");
    },

  },
};
