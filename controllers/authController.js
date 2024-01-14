import { StatusCodes } from "http-status-codes";
import userModel from "../models/userModel.js";

const register = async (req, res) => {
  const user = await userModel.create({ ...req.body });
  await userModel.findOneAndUpdate(
    { $ne: { _id: user._id }, expoPushToken: req.body.expoPushToken },
    { $pull: { expoPushToken: req.body.expoPushToken } }
  );
  const token = user.createJWT();

  res
    .status(StatusCodes.CREATED)
    .json({ user: { username: user.name, userId: user._id }, token });
};
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new Error("error no e p");
  }
  const user = await userModel.findOne({ email });
  if (!user) {
    throw new Error("error no user");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new Error("invalid credentials");
  }
  const token = user.createJWT();
  await userModel.findOneAndUpdate(
    { expoPushToken: req.body.expoPushToken },
    { $pull: { expoPushToken: req.body.expoPushToken } }
  );
  await userModel.findOneAndUpdate(
    { _id: user._id },
    { $push: { expoPushToken: req.body.expoPushToken } }
  );
  res
    .status(200)
    .json({ user: { username: user.name, userId: user._id }, token });
};

export { register, login };
