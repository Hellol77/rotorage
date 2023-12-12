import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
  nickname: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  myPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }], // 추가된 부분
  likedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
});
export const User = mongoose.model("User", userSchema);
