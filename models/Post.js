import mongoose from "mongoose";

const PostSchema = mongoose.Schema({
  body: String,

  username: String,
  createdAt: String,
  file: String,

  comments: [
    {
      body: String,
      username: String,
      createdAt: String,
    },
  ],
  likes: [
    {
      username: String,
      createdAt: String,
    },
  ],

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
});
export default mongoose.model("Post", PostSchema);
