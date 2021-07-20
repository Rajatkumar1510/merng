import postResolvers from "./post.js";
import userResolvers from "./user.js";

import commentsResolvers from "./comment.js";
export default {
  Query: {
    ...postResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...postResolvers.Mutation,
    ...commentsResolvers.Mutation,
  },
};
