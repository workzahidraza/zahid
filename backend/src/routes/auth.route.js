const express = require("express");
const authRoute = express.Router();
const authController = require("../controllers/auth.controller");

//http://localhost:3000/api/auth/?
authRoute.post("/register", authController.Register);
authRoute.post("/login", authController.Login);

module.exports = authRoute;
