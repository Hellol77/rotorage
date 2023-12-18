const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  content: String,
  createdAt: { type: Date, default: Date.now, required: true },
});

export const Comment = mongoose.model("comment", commentSchema);
