import { mongoose } from "mongoose";

const commentSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Types.ObjectId,
    ref: "reports",
    required: false,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "users",
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
});

export default mongoose.model("comments", commentSchema);
