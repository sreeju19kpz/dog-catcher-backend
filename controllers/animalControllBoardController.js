import normalUserModel from "../models/userModel.js";
import userModel from "../models/animalControllBoardModel.js";

const getAllUsers = async (req, res) => {
  try {
    const allusers = await userModel.find({});
    res.status(200).json(allusers);
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};
const createUser = async (req, res) => {
  try {
    const user = await userModel.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};
const getACBFromArea = async (req, res) => {
  try {
    const area = await normalUserModel.findOne(
      { _id: req.user.userId },
      { area: 1, _id: 0 }
    );
    const ACB = await userModel.find(
      { area: { $in: area.area } },
      { _id: 1, name: 1, dp: 1 }
    );
    res.status(201).json(ACB);
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

const getUserBanner = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.user.userId });
    const { dp, name, coverImg } = user;

    res.status(200).json({ dp, name, coverImg });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

export { getAllUsers, createUser, getUserBanner, getACBFromArea };
