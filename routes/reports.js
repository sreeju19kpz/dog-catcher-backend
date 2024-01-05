const express = require("express");
const {
  addReport,
  getAllReports,
  getAllReportsFromArea,
  like,
  getIsLiked,
  getAllReportsByUser,
} = require("../controllers/reportsController");
const router = express.Router();

router.route("/").post(addReport);
router.route("/").get(getAllReports);
router.route("/user").get(getAllReportsByUser);
router.route("/area").get(getAllReportsFromArea);
router.route("/:id/isliked").get(getIsLiked);
router.route("/:id/like").put(like);

module.exports = router;
