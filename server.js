const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const cors = require("cors");
const authRout = require("./routes/auth");
const reportsRoute = require("./routes/reports");
const commentsRoute = require("./routes/comment");
const userRoute = require("./routes/user");
const PORT = process.env.PORT || 5000;
require("dotenv").config();

const authenticateUser = require("./middleware/authentication");
app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/api/v1/auth", authRout);
app.use("/api/v1/reports", authenticateUser, reportsRoute);
app.use("/api/v1/comments", authenticateUser, commentsRoute);
app.use("/api/v1/users", authenticateUser, userRoute);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log("server on", PORT);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
