const express = require("express");
const followRoute = express.Router();
const followController = require("../controllers/follow.controller");
const authMiddleware = require("../middleware/auth.middleware");

followRoute.post("/:userName", authMiddleware, followController.followUser);
followRoute.delete("/:userName", authMiddleware, followController.unfollowUser);

module.exports = followRoute;
