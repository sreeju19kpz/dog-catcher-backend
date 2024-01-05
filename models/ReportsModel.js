const { default: mongoose } = require("mongoose");

const reportsSchema = new mongoose.Schema({
  reportedBy: {
    type: mongoose.Types.ObjectId,
    ref: "users",
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  noOfDogs: {
    type: String,
    required: false,
  },
  noOfAttacks: {
    type: Number,
    required: false,
  },
  isAffectedByRabies: {
    type: Boolean,
    required: true,
  },
  area: {
    type: String,
    required: true,
    enum: ["palakkad", "kozhikkod"],
  },
  status: {
    type: String,
    required: true,
    enum: ["reported", "working", "captured"],
    default: "reported",
  },
  likes: [
    {
      type: mongoose.Types.ObjectId,
      ref: "users",
      required: false,
    },
  ],
});

module.exports = mongoose.model("reports", reportsSchema);
