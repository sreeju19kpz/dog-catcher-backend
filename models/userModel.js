import { mongoose } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  userModel: {
    type: Array,
    required: false,
  },
  bio: {
    type: String,
    required: false,
  },
  dp: {
    type: String,
    required: false,
  },
  coverImg: {
    type: String,
    required: false,
  },
  area: {
    type: Array,
    required: false,
  },
  expoPushToken: [
    {
      type: String,
      required: false,
    },
  ],
  notifications: [
    {
      postId: {
        type: mongoose.Types.ObjectId,
        ref: "acbreports",
        required: true,
      },
      notification: {
        type: String,
        required: true,
      },
    },
  ],
  email: {
    type: String,
    required: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    ],
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
});

userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRETIME,
    }
  );
};

userSchema.methods.comparePassword = async function (cp) {
  return await bcrypt.compare(cp, this.password);
};

export default mongoose.model("users", userSchema);
