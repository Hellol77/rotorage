import mongoose from "mongoose";
const Schema = mongoose.Schema;

export interface BoardType {
  title: string;
  content: string;
  imageUrl: string;
}

interface BoardDoc extends mongoose.Document {
  title: string;
  content: string;
  imageUrl: string;
}
interface BoardModelInterface extends mongoose.Model<any> {
  bulid(attr: BoardType): BoardDoc;
}

const boardSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});
const Board = mongoose.model<BoardDoc, BoardModelInterface>(
  "Board",
  boardSchema
);
export { Board };
// module.exports = mongoose.model<any, BoardModelInterface>("Board", boardSchema);
