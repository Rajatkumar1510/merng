import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  email: String,
  createdAt: String,
});

export default mongoose.model("User", userSchema);
