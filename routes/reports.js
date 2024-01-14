import Express from "express";
import {
  addReport,
  getAllReports,
  getAllReportsFromArea,
  like,
  getIsLiked,
  getAllReportsByUser,
  updateData,
} from "../controllers/reportsController.js";
const router = Express.Router();

router.route("/").post(addReport);
router.route("/").get(getAllReports);

router.route("/user").get(getAllReportsByUser);
router.route("/area").get(getAllReportsFromArea);
router.route("/:id/isliked").get(getIsLiked);
router.route("/:id/like").put(like);
router.route("/:id/updatedata").put(updateData);

export default router;
