import mongoose from "mongoose";
const Schema = mongoose.Schema;

// export interface BoardType {
//   title: string;
//   content: string;
//   imageUrl: string;
// }

// export interface BoardDoc extends mongoose.Document {
//   title: string;
//   content: string;
//   imageUrl: string;
// }
// interface BoardModelInterface extends mongoose.Model<BoardDoc> {
//   bulid(attr: BoardType): BoardDoc;
// }

const postSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  likes: { type: Number, default: 0 },
  imageUrl: {
    type: String,
    required: true,
  },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});
export const Post = mongoose.model("Post", postSchema);
// module.exports = mongoose.model<any, BoardModelInterface>("Board", boardSchema);
