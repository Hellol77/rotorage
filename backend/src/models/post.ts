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
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
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
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comment" }],
});
export const Post = mongoose.model("post", postSchema);
// module.exports = mongoose.model<any, BoardModelInterface>("Board", boardSchema);
