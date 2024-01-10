import ReportsModel from "../models/messageModel.js";
import userModel from "../models/userModel.js";

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
    const reports = await ReportsModel.find(
      {
        reportedBy: req.user.userId,
        reportedTo: req.params.id,
      },
      { description: 1, _id: 0 }
    );
    res.status(200).json(reports);
  } catch (err) {
    res.status(200).json({ err });
  }
};

export { addReport, getAllReports };
