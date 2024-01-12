import { createRequire } from "module";
const require = createRequire(import.meta.url);
import Express from "express";
import connectDB from "./db/connect.js";
import cors from "cors";
import authRout from "./routes/auth.js";
import acbAuthRout from "./routes/ACBAuth.js";
import reportsRoute from "./routes/reports.js";
import commentsRoute from "./routes/comment.js";
import userRoute from "./routes/user.js";
import acbRoute from "./routes/animalControllBoard.js";
import ACBReports from "./routes/ACBReports.js";
import messageRoutes from "./routes/messages.js";
const PORT = process.env.PORT || 5000;
const app = Express();

const http = require("http").Server(app);
initSocket(http);
require("dotenv").config();
import authenticateUser from "./middleware/authentication.js";
import { initSocket } from "./utils/socketHandler.js";
app.use(cors({ origin: "*" }));
app.use(Express.json());

app.use("/api/v1/auth", authRout);
app.use("/api/v1/acbauth", acbAuthRout);
app.use("/api/v1/reports", authenticateUser, reportsRoute);
app.use("/api/v1/acbreports", authenticateUser, ACBReports);
app.use("/api/v1/comments", authenticateUser, commentsRoute);
app.use("/api/v1/users", authenticateUser, userRoute);
app.use("/api/v1/animalcontrollboards", authenticateUser, acbRoute);
app.use("/api/v1/messages", authenticateUser, messageRoutes);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    http.listen(PORT, () => {
      console.log("server on", PORT);
    });
  } catch (err) {
    console.log(err);
  }
};
start();
