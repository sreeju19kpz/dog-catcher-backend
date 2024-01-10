import Express from "express";
const router = Express.Router();
import {
  postComment,
  getAllCommentsFromPost,
} from "../controllers/commentController.js";

router.route("/").post(postComment);
router.route("/:id").get(getAllCommentsFromPost);
export default router;
