const express = require("express");
const authRoute = express.Router();
const authController = require("../controllers/auth.controller");

authRoute.post("/register", authController.Register);

module.exports = authRoute;
