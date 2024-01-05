const userModel = require("../models/userModel");

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
const getUserAra = async (req, res) => {
  try {
    const area = await userModel.findOne(
      { _id: req.user.userId },
      { area: 1, _id: 0 }
    );
    res.status(201).json(area);
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};
const updateUserFavArea = async (req, res) => {
  try {
    console.log(req.body);
    const user = await userModel.findOneAndUpdate(
      { _id: req.user.userId },
      { $set: { area: [...req.body.area] } },
      { new: true, runValidators: true }
    );
    console.log(user.area);
    res.status(201).json({ area: user.area });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};
const getSingleUser = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.params.id });
    res.status(200).json(user);
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

module.exports = {
  getAllUsers,
  createUser,
  getSingleUser,
  getUserBanner,
  updateUserFavArea,
  getUserAra,
};
