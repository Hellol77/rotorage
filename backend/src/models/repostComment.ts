import mongoose from "mongoose";
const Schema = mongoose.Schema;

const reportedCommentSchema = new Schema(
  {
    reportUser: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
    ],
    comment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "comment",
      required: true,
    },
    reportCount: { type: Number, default: 1 },
  },
  { versionKey: false }
);

export const ReportedComment = mongoose.model(
  "reportedComment",
  reportedCommentSchema
);
