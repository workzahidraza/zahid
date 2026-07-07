const userModel = require("../models/auth.model");
const postModel = require("../models/postCreation.model");
const followModel = require("../models/follow.model");
const bcrytp = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function Register(req, res) {
  try {
    const { userName, userEmail, password, bio, profile_pic } = req.body;

    if (!userName || !userEmail || !password) {
      return res.status(400).json({
        success: false,
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
      userName,
      userEmail,
      password: hash,
      bio,
      profile_pic,
    });

    const token = jwt.sign(
      { id: user.id, userName: user.userName },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      user: {
        id: user.id,
        userName: user.userName,
        userEmail: user.userEmail,
        profile_pic: user.profile_pic,
        bio: user.bio,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

async function Login(req, res) {
  try {
    const { userName, userEmail, password } = req.body;

    if (!userName || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const isUserRegistered = await userModel.findOne({
      $or: [{ userName }, { userEmail }],
    });

    if (!isUserRegistered) {
      return res.status(400).json({
        success: false,
        message: "You are not registered. Please register before logging in.",
      });
    }

    const checkPassword = await bcrytp.compare(
      password,
      isUserRegistered.password,
    );

    if (!checkPassword) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password",
      });
    }

    const token = jwt.sign(
      { id: isUserRegistered.id, userName: isUserRegistered.userName },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: {
        id: isUserRegistered.id,
        userName: isUserRegistered.userName,
        userEmail: isUserRegistered.userEmail,
        profile_pic: isUserRegistered.profile_pic,
        bio: isUserRegistered.bio,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

async function Logout(req, res) {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Logged out successfully" });
}

async function getMe(req, res) {
  try {
    const user = await userModel.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const [postCount, followersCount, followingCount] = await Promise.all([
      postModel.countDocuments({ userId: user._id }),
      followModel.countDocuments({ followee: user.userName }),
      followModel.countDocuments({ follower: user.userName }),
    ]);

    res.status(200).json({
      success: true,
      user: {
        id: user.id,
        userName: user.userName,
        userEmail: user.userEmail,
        profile_pic: user.profile_pic,
        bio: user.bio,
        postCount,
        followersCount,
        followingCount,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

async function searchUsers(req, res) {
  try {
    const { q } = req.query;
    if (!q || q.trim().length === 0) {
      return res.status(200).json({ success: true, users: [] });
    }

    const users = await userModel
      .find({
        userName: { $regex: q.trim(), $options: "i" },
        _id: { $ne: req.user.id },
      })
      .select("userName profile_pic bio")
      .limit(20);

    const usersWithFollowStatus = await Promise.all(
      users.map(async (user) => {
        const isFollowing = await followModel.findOne({
          follower: req.user.userName,
          followee: user.userName,
        });
        return {
          id: user.id,
          userName: user.userName,
          profile_pic: user.profile_pic,
          bio: user.bio,
          isFollowing: !!isFollowing,
        };
      }),
    );

    res.status(200).json({ success: true, users: usersWithFollowStatus });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

async function getUserProfile(req, res) {
  try {
    const { userName } = req.params;
    const user = await userModel.findOne({ userName }).select("-password");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const [postCount, followersCount, followingCount, isFollowing] =
      await Promise.all([
        postModel.countDocuments({ userId: user._id }),
        followModel.countDocuments({ followee: user.userName }),
        followModel.countDocuments({ follower: user.userName }),
        followModel.findOne({
          follower: req.user.userName,
          followee: user.userName,
        }),
      ]);

    res.status(200).json({
      success: true,
      user: {
        id: user.id,
        userName: user.userName,
        profile_pic: user.profile_pic,
        bio: user.bio,
        postCount,
        followersCount,
        followingCount,
        isFollowing: !!isFollowing,
        isOwnProfile: user.id === req.user.id,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

async function updateProfile(req, res) {
  try {
    const { bio } = req.body;
    const updateData = {};
    if (bio !== undefined) {
      updateData.bio = bio;
    }
    if (req.file) {
      updateData.profile_pic = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      req.user.id,
      { $set: updateData },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: {
        id: updatedUser.id,
        userName: updatedUser.userName,
        userEmail: updatedUser.userEmail,
        profile_pic: updatedUser.profile_pic,
        bio: updatedUser.bio,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

module.exports = {
  Register,
  Login,
  Logout,
  getMe,
  searchUsers,
  getUserProfile,
  updateProfile,
};
