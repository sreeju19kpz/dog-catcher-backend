const express = require("express");
const router = express.Router();
const {
  postComment,
  getAllCommentsFromPost,
} = require("../controllers/commentController");

router.route("/").post(postComment);
router.route("/:id").get(getAllCommentsFromPost);
module.exports = router;
