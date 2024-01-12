import Express from "express";
const router = Express.Router();
import {
  addReport,
  getAllReports,
  getAllReportsForUser,
  like,
  getIsLiked,
  getAllReportsByUser,
  updateData,
  getSingleReport,
} from "../controllers/ACBReportsController.js";

router.route("/").post(addReport);
router.route("/").get(getAllReports);
router.route("/update/:id").put(updateData);
router.route("/user").get(getAllReportsForUser);
router.route("/area").get(getAllReportsByUser);
router.route("/:id/isliked").get(getIsLiked);
router.route("/:id/like").put(like);
router.route("/:id/details").get(getSingleReport);

export default router;
