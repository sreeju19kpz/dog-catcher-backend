import Express from "express";
const router = Express.Router();

import {
  getAllCommunities,
  getSingleCommunity,
  getAllJoinedCommunities,
  joinCommunity,
  discoverCommunity,
  createCommunity,
  memberVerify,
  /* updateCommunity,
  deleteCommunity, */
} from "../controllers/communityController.js";

router.route("/all").get(getAllCommunities);
router.route("/").post(createCommunity);
router.route("/joined").get(getAllJoinedCommunities);
router.route("/discover").get(discoverCommunity);
router.route("/:id").get(getSingleCommunity);
/*   .post(updateCommunity)
  .delete(deleteCommunity); */

router.route("/:id/ismember").get(memberVerify);

router.route("/:id/join").put(joinCommunity);
export default router;
