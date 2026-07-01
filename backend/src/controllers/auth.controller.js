const userModel = require("../models/auth.model");
const bcrytp = require("bcryptjs");
const jwt = require("jsonwebtoken");
async function Register(req, res) {
  try {
    const { username, useremail, password } = req.body;
    const userPresent = await userModel.findOne({
      $or: [{ username }, { useremail }],
    });
    if (userPresent) {
      return res.status(409).json({
        message: "user is already present",
      });
    }

    if (!username || !useremail || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    const hash = await bcrytp.hash(password, 10);
    const user = await userModel.create({
      username,
      useremail,
      password: hash,
    });

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );
    res.cookie("token", token);
    res.status(201).json({
      message: "User Registered Successfully",
      user: {
        id: user.id,
        username: user.username,
        useremail: user.useremail,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

module.exports = {
  Register,
};
