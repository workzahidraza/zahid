const express = require("express");
const savedRoute = express.Router();
const savedController = require("../controllers/saved.controller");
const authMiddleware = require("../middleware/auth.middleware");

savedRoute.get("/", authMiddleware, savedController.getSavedPosts);
savedRoute.post("/:postId", authMiddleware, savedController.savePost);
savedRoute.delete("/:postId", authMiddleware, savedController.unsavePost);

module.exports = savedRoute;
