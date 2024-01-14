import ReportsModel from "../models/ReportsModel.js";
import userModel from "../models/userModel.js";
import { Expo } from "expo-server-sdk";
let expo = new Expo({ accessToken: process.env.EXPO_ACCESS_TOKEN });

const addReport = async (req, res) => {
  req.body.reportedBy = req.user.userId;
  try {
    const report = await ReportsModel.create({ ...req.body });
    res.status(200).json(report);
  } catch (err) {
    res.status(200).json({ err });
  }
};
const getAllReports = async (req, res) => {
  try {
    const reports = await ReportsModel.find({}).populate("reportedBy", [
      "name",
      "_id",
    ]);
    res.status(200).json(reports);
  } catch (err) {
    res.status(200).json({ err });
  }
};
const getAllReportsByUser = async (req, res) => {
  try {
    const reports = await ReportsModel.find({
      reportedBy: req.user.userId,
    }).populate("reportedBy", ["name", "_id"]);
    res.status(200).json(reports);
  } catch (err) {
    res.status(200).json({ err });
  }
};
const getAllReportsFromArea = async (req, res) => {
  try {
    const area = await userModel.findOne(
      { _id: req.user.userId },
      { area: 1, _id: 0 }
    );

    const reports = await ReportsModel.find({
      area: { $in: area.area },
    }).populate("reportedBy", ["name", "_id"]);
    res.status(200).json(reports);
  } catch (err) {
    res.status(200).json({ err });
  }
};

const like = async (req, res) => {
  try {
    const report = await ReportsModel.findOne({ _id: req.params.id });
    const data =
      report.likes.filter((item) => item.toString() === req.user.userId)
        .length > 0
        ? await ReportsModel.findOneAndUpdate(
            { _id: req.params.id },
            { $pull: { likes: req.user.userId } },
            { new: true, runValidators: true }
          )
        : await ReportsModel.findOneAndUpdate(
            { _id: req.params.id },
            { $push: { likes: req.user.userId } },
            { new: true, runValidators: true }
          );

    res.status(201).json({
      data:
        data.likes.filter((item) => item.toString() === req.user.userId)
          .length > 0
          ? true
          : false,
    });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};
const getIsLiked = async (req, res) => {
  try {
    const report = await ReportsModel.findOne(
      { _id: req.params.id },
      { likes: 1, _id: 0 }
    );

    res.status(200).json({
      isLiked:
        report.likes.filter((item) => item.toString() === req.user.userId)
          .length > 0
          ? true
          : false,
    });
  } catch (err) {}
};
const updateData = async (req, res) => {
  console.log(req.body);
  try {
    const post = await ReportsModel.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { status: req.body.status } },
      { new: true, runValidators: true }
    );

    if (post) {
      const users = await userModel.find(
        {
          $or: [{ area: { $in: post.area } }, { _id: { $in: post.likes } }],
        },
        { expoPushToken: 1 }
      );

      await userModel.updateMany(
        {
          $or: [{ _id: { $in: post.likes } }, { area: { $in: post.area } }],
        },
        {
          $push: {
            notifications: {
              postId: post._id,
              notification: `status changed to ${post.status}`,
            },
          },
        }
      );

      let somePushTokens = [];
      users.map(
        (user) => (somePushTokens = [...somePushTokens, ...user.expoPushToken])
      );

      let messages = [];
      for (let pushToken of somePushTokens) {
        if (!Expo.isExpoPushToken(pushToken)) {
          console.error(
            `Push token ${pushToken} is not a valid Expo push token`
          );
          continue;
        }
        messages.push({
          to: pushToken,
          sound: "default",
          body: `${post.status}`,
          data: { url: `https://mydcapp.com/alerts/acbdetails/${post._id}` },
        });
      }

      let chunks = expo.chunkPushNotifications(messages);
      let tickets = [];

      (async () => {
        // Send the chunks to the Expo push notification service. There are
        // different strategies you could use. A simple one is to send one chunk at a
        // time, which nicely spreads the load out over time:
        for (let chunk of chunks) {
          try {
            let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
            console.log(ticketChunk);
            tickets.push(...ticketChunk);
            // NOTE: If a ticket contains an error code in ticket.details.error, you
            // must handle it appropriately. The error codes are listed in the Expo
            // documentation:
            // https://docs.expo.io/push-notifications/sending-notifications/#individual-errors
          } catch (error) {
            console.error(error);
          }
        }
      })();
      let receiptIds = [];
      for (let ticket of tickets) {
        // NOTE: Not all tickets have IDs; for example, tickets for notifications
        // that could not be enqueued will have error information and no receipt ID.
        if (ticket.id) {
          receiptIds.push(ticket.id);
        }
      }
      let receiptIdChunks = expo.chunkPushNotificationReceiptIds(receiptIds);
      (async () => {
        for (let chunk of receiptIdChunks) {
          try {
            let receipts = await expo.getPushNotificationReceiptsAsync(chunk);
            for (let receiptId in receipts) {
              let { status, message, details } = receipts[receiptId];
              if (status === "ok") {
                continue;
              } else if (status === "error") {
                console.error(
                  `There was an error sending a notification: ${message}`
                );
                if (details && details.error) {
                  console.error(`The error code is ${details.error}`);
                }
              }
            }
          } catch (error) {
            console.error(error);
          }
        }
      })();

      res.status(400).json({ users, post });
    }
  } catch (err) {
    res.status(400).json({ err });
  }
};
export {
  addReport,
  getAllReports,
  getAllReportsFromArea,
  getAllReportsByUser,
  like,
  updateData,
  getIsLiked,
};
