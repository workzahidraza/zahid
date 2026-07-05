const userModel = require("../models/auth.model");
const bcrytp = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function Register(req, res) {
  try {
    const { userName, userEmail, password, bio, profile_pic } = req.body;

    if (!userName || !userEmail || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    const userPresent = await userModel.findOne({
      $or: [{ userName: userName }, { userEmail: userEmail }],
    });

    if (userPresent) {
      return res.status(409).json({
        success: false,
        message:
          userPresent.userName === userName
            ? "username already present"
            : "user email already present",
      });
    }

    const hash = await bcrytp.hash(password, 10);

    const user = await userModel.create({
      userName: userName,
      userEmail: userEmail,
      password: hash,
      bio: bio,
      profile_pic: profile_pic,
    });

    const token = jwt.sign(
      { id: user.id, userName: user.userName },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );
    res.cookie("token", token);
    res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      user: {
        id: user.id,
        userName: user.userName,
        userEmail: user.userEmail,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

async function Login(req, res) {
  const { userName, userEmail, password } = req.body;
  if (!userName || !password) {
    return res.status(400).json({
      message: "all fileds are required ",
    });
  }
  const isUserRegistered = await userModel.findOne({
    $or: [{ userName }, { userEmail }],
  });
  if (!isUserRegistered) {
    return res.status(400).json({
      message: "you are not registered ! registered before loggin",
    });
  }
  const checkPassword = await bcrytp.compare(
    password,
    isUserRegistered.password,
  );
  if (!checkPassword) {
    return res.status(401).json({
      message: "incorrect password",
    });
  }

  // const user = await userModel.findById(isUserRegistered.id);

  const token = jwt.sign(
    {
      _id: isUserRegistered.id,
      userName: isUserRegistered.userName,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );
  res.cookie("token", token);

  res.status(200).json({
    message: "user logged in succussfully",
    data: {
      userName: isUserRegistered.userName,
      userEmail: isUserRegistered.userEmail,
    },
  });
}

module.exports = {
  Register,
  Login,
};
