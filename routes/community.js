const express = require("express");
const router = express.Router();

const {
  getAllCommunities,
  getSingleCommunity,

  getAllJoinedCommunities,

  joinCommunity,
  discoverCommunity,
  createCommunity,
  memberVerify,
  /* updateCommunity,
  deleteCommunity, */
} = require("../controllers/communityController");

router.route("/all").get(getAllCommunities);
router.route("/").post(createCommunity);
router.route("/joined").get(getAllJoinedCommunities);
router.route("/discover").get(discoverCommunity);
router.route("/:id").get(getSingleCommunity);
/*   .post(updateCommunity)
  .delete(deleteCommunity); */

router.route("/:id/ismember").get(memberVerify);

router.route("/:id/join").put(joinCommunity);
module.exports = router;
