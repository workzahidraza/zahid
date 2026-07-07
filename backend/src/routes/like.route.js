const express = require("express");
const likeRoute = express.Router();
const likeController = require("../controllers/like.controller");
const authMiddleware = require("../middleware/auth.middleware");

likeRoute.post("/:postId", authMiddleware, likeController.likePost);
likeRoute.delete("/:postId", authMiddleware, likeController.unlikePost);

module.exports = likeRoute;
