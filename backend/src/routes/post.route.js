const express = require("express");
const postRoute = express.Router();
const postController = require("../controllers/post.controller");
const authMiddleware = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware");

postRoute.post(
  "/",
  authMiddleware,
  upload.single("photo"),
  postController.createPost,
);
postRoute.get("/", authMiddleware, postController.getFeed);
postRoute.get("/user/:userName", authMiddleware, postController.getUserPosts);
postRoute.delete("/:id", authMiddleware, postController.deletePost);

module.exports = postRoute;
