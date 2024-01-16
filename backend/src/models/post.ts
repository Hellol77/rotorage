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

const postSchema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    createdAt: { type: Date, default: Date.now, required: true },
    likeCount: { type: Number, default: 0 },
    likers: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    imageUrl: {
      type: String,
      required: true,
    },
    commentsCount: { type: Number, default: 0 },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comment" }],
  },
  { versionKey: false }
);
export const Post = mongoose.model("post", postSchema);
// module.exports = mongoose.model<any, BoardModelInterface>("Board", boardSchema);
