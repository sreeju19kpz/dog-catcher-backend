const communityModel = require("../models/communityModel");

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

const getAllCommunities = async (req, res) => {
  try {
    const allCommunities = await communityModel.find({});

    res.status(200).json({ allCommunities });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};
const getAllJoinedCommunities = async (req, res) => {
  await sleep(1000);
  try {
    const allCommunities = await communityModel.find({
      members: { $in: req.user.userId },
    });
    res.status(200).json(
      allCommunities.map((item) => {
        return {
          name: item.name,
          thumbnail: item.thumbnail,
          id: item._id,
        };
      })
    );
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

const memberVerify = async (req, res) => {
  try {
    const community = await communityModel.findOne({
      _id: req.params.id,
      members: { $in: req.user.userId },
    });

    res.status(200).json({ isMember: community ? true : false });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};
const getSingleCommunity = async (req, res) => {
  try {
    const Community = await communityModel.findOne({ _id: req.params.id });
    const { _id: id, name, thumbnail, dp } = Community;
    res.status(200).json({
      id,
      name,
      thumbnail,
      dp,
      isMember:
        Community.members.filter((item) => item === req.user.userId).length > 0
          ? true
          : false,
    });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};
const createCommunity = async (req, res) => {
  try {
    req.body.createdBy = req.user.userId;
    req.body.members = req.user.userId;
    const community = await communityModel.create(req.body);
    res.status(201).json({ community });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

const joinCommunity = async (req, res) => {
  try {
    const community = await communityModel.findOne(
      { _id: req.params.id },
      { members: 1, _id: 0 }
    );

    const Community =
      community.members.filter((item) => item === req.user.userId).length > 0
        ? await communityModel.findOneAndUpdate(
            {
              _id: req.params.id,
            },
            { $pull: { members: req.user.userId } },
            { new: true, runValidators: true }
          )
        : await communityModel.findOneAndUpdate(
            {
              _id: req.params.id,
            },
            { $push: { members: req.user.userId } },
            { new: true, runValidators: true }
          );

    res.status(201).json({
      isMember:
        Community.members.filter((item) => item == req.user.userId).length > 0
          ? true
          : false,
    });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};
const discoverCommunity = async (req, res) => {
  try {
    const communities = await communityModel.find({
      members: { $nin: req.user.userId },
    });
    res.status(200).json(
      communities.map((item) => {
        return { id: item._id, name: item.name, thumbnail: item.thumbnail };
      })
    );
  } catch (err) {
    res.status(500).json({ msg: err });
  }

  // communities.filter((item) => !following.includes(item));
};
module.exports = {
  getAllCommunities,
  getAllJoinedCommunities,
  getSingleCommunity,
  memberVerify,
  joinCommunity,
  discoverCommunity,
  createCommunity,
};
