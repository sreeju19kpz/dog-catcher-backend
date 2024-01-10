import { StatusCodes } from "http-status-codes";
import userModel from "../models/animalControllBoardModel.js";

const register = async (req, res) => {
  const user = await userModel.create({ ...req.body });
  const token = user.createJWT();
  res
    .status(StatusCodes.CREATED)
    .json({ user: { username: user.name }, token });
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

  res.status(200).json({ token });
};

export { register, login };
