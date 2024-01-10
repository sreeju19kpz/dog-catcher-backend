import ReportsModel from "../models/ACBReportsModel.js";
import userModel from "../models/userModel.js";
import animalControllBoardModel from "../models/animalControllBoardModel.js";

const addReport = async (req, res) => {
  req.body.reportedBy = req.user.userId;
  try {
    const report = await ReportsModel.create({ ...req.body });
    res.status(200).json(report);
  } catch (err) {
    res.status(200).json({ err });
  }
};
const getAllReports = async (req, res) => {
  try {
    const reports = await ReportsModel.find({}).populate("reportedBy", [
      "name",
      "_id",
    ]);
    res.status(200).json(reports);
  } catch (err) {
    res.status(200).json({ err });
  }
};
const getAllReportsByUser = async (req, res) => {
  try {
    const reports = await ReportsModel.find({
      reportedBy: req.user.userId,
    }).populate("reportedBy", ["name", "_id"]);
    res.status(200).json(reports);
  } catch (err) {
    res.status(200).json({ err });
  }
};
const getAllReportsForUser = async (req, res) => {
  try {
    const area = await userModel.findOne(
      { _id: req.user.userId },
      { area: 1, _id: 0 }
    );
    const followings = await animalControllBoardModel.find({
      followers: { $in: req.user.userId },
    });

    const reports = await ReportsModel.find({
      $or: [{ area: { $in: area.area } }, { reportedBy: { $in: followings } }],
    }).populate("reportedBy");
    res.status(200).json(reports);
  } catch (err) {
    res.status(200).json({ err });
  }
};

const like = async (req, res) => {
  try {
    const report = await ReportsModel.findOne({ _id: req.params.id });
    console.log(report);
    const data =
      report.likes.filter((item) => item.toString() === req.user.userId)
        .length > 0
        ? await ReportsModel.findOneAndUpdate(
            { _id: req.params.id },
            { $pull: { likes: req.user.userId } },
            { new: true, runValidators: true }
          )
        : await ReportsModel.findOneAndUpdate(
            { _id: req.params.id },
            { $push: { likes: req.user.userId } },
            { new: true, runValidators: true }
          );

    res.status(201).json({
      data:
        data.likes.filter((item) => item.toString() === req.user.userId)
          .length > 0
          ? true
          : false,
    });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};
const getIsLiked = async (req, res) => {
  try {
    const report = await ReportsModel.findOne(
      { _id: req.params.id },
      { likes: 1, _id: 0 }
    );

    res.status(200).json({
      isLiked:
        report.likes.filter((item) => item.toString() === req.user.userId)
          .length > 0
          ? true
          : false,
    });
  } catch (err) {}
};

export {
  addReport,
  getAllReports,
  getAllReportsForUser,
  getAllReportsByUser,
  like,
  getIsLiked,
};
