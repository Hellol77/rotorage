import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
  nickname: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  introduce: {
    type: String,
    default: "",
  },
  myPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "post" }], // 추가된 부분
  likedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "post" }],
});
export const User = mongoose.model("user", userSchema);
