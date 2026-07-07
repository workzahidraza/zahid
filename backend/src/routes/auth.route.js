const express = require("express");
const authRoute = express.Router();
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware");

authRoute.post("/register", authController.Register);
authRoute.post("/login", authController.Login);
authRoute.post("/logout", authController.Logout);
authRoute.get("/me", authMiddleware, authController.getMe);
authRoute.get("/search", authMiddleware, authController.searchUsers);
authRoute.get("/profile/:userName", authMiddleware, authController.getUserProfile);
authRoute.put(
  "/profile",
  authMiddleware,
  upload.single("profile_pic"),
  authController.updateProfile,
);

module.exports = authRoute;
