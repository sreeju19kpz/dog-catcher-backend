import Express from "express";
const router = Express.Router();

import {
  getAllUsers,
  createUser,
  getUserBanner,
  getACBFromArea,
  /* updateUser,
  deleteUser, */
} from "../controllers/animalControllBoardController.js";

router.route("/all").get(getAllUsers);
router.route("/").post(createUser);
router.route("/user/area").get(getACBFromArea);
router.route("/user/banner").get(getUserBanner);
router.route("/:id/banner").get(getUserBanner);

export default router;
