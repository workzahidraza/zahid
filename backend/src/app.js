const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRoute = require("./routes/auth.route");
const postRoute = require("./routes/post.route");
const likeRoute = require("./routes/like.route");
const followRoute = require("./routes/follow.route");
const savedRoute = require("./routes/saved.route");

const uploadsDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use("/uploads", express.static(uploadsDir));
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/likes", likeRoute);
app.use("/api/follows", followRoute);
app.use("/api/saved", savedRoute);

module.exports = app;
