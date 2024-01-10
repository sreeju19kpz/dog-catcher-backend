import { mongoose } from "mongoose";

const messagesSchema = new mongoose.Schema({
  reportedBy: {
    type: mongoose.Types.ObjectId,
    ref: "users",
    required: true,
  },
  reportedTo: {
    type: mongoose.Types.ObjectId,
    ref: "animalControllBoards",
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

export default mongoose.model("messages", messagesSchema);
