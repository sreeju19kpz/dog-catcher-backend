const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  createUser,
  getSingleUser,

  getUserBanner,
  updateUserFavArea,
  getUserAra,
  /* updateUser,
  deleteUser, */
} = require("../controllers/userController");

router.route("/all").get(getAllUsers);
router.route("/").post(createUser);
router.route("/user/area").put(updateUserFavArea).get(getUserAra);
router.route("/user/banner").get(getUserBanner);
router
  .route("/:id")
  .get(getSingleUser) /* .post(updateUser).delete(deleteUser) */;

router.route("/:id/banner").get(getUserBanner);

module.exports = router;
