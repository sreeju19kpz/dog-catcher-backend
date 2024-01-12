import Express from "express";
const router = Express.Router();

import {
  getAllUsers,
  createUser,
  getSingleUser,
  getUserBanner,
  updateUserFavArea,
  getUserAra,
  getNotifications,
  /* updateUser,
  deleteUser, */
} from "../controllers/userController.js";

router.route("/all").get(getAllUsers);
router.route("/").post(createUser);
router.route("/notifications").get(getNotifications);
router.route("/user/area").put(updateUserFavArea).get(getUserAra);
router.route("/user/banner").get(getUserBanner);
router
  .route("/:id")
  .get(getSingleUser) /* .post(updateUser).delete(deleteUser) */;

router.route("/:id/banner").get(getUserBanner);

export default router;
