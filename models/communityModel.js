const { default: mongoose } = require("mongoose");

const communitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: false,
    },
    dp: {
      type: String,
      required: false,
    },
    members: {
      type: Array,
      required: false,
    },
    posts: {
      type: Array,
      required: false,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("communities", communitySchema);
