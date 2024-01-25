import mongoose from "mongoose";
const Schema = mongoose.Schema;

const reportedPostSchema = new Schema(
  {
    reportUser: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
    ],
    post: { type: mongoose.Schema.Types.ObjectId, ref: "post", required: true },
    reportCount: { type: Number, default: 1 },
  },
  { versionKey: false }
);

export const ReportedPost = mongoose.model("reportedPost", reportedPostSchema);
