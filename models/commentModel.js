const { default: mongoose } = require("mongoose");

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

module.exports = mongoose.model("comments", commentSchema);
