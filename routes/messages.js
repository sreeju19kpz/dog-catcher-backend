import Express from "express";
import { addReport, getAllReports } from "../controllers/messageControll.js";
const router = Express.Router();

router.route("/").post(addReport);
router.route("/:id").get(getAllReports);

export default router;
