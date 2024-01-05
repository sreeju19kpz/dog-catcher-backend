const { StatusCodes } = require("http-status-codes");

const ReportsModel = require("../models/ReportsModel");
const userModel = require("../models/userModel");

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
const getAllReportsFromArea = async (req, res) => {
  try {
    const area = await userModel.findOne(
      { _id: req.user.userId },
      { area: 1, _id: 0 }
    );

    const reports = await ReportsModel.find({ area: { $in: area.area } });
    res.status(200).json(reports);
  } catch (err) {
    res.status(200).json({ err });
  }
};

const like = async (req, res) => {
  try {
    const report = await ReportsModel.findOne({ _id: req.params.id });
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

module.exports = {
  addReport,
  getAllReports,
  getAllReportsFromArea,
  getAllReportsByUser,
  like,
  getIsLiked,
};
